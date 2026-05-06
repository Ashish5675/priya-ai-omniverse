import KnowledgeTypes "../types/knowledge";
import List "mo:core/List";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";

module {
  // ── KnowledgeStats (returned by getKnowledgeStats) ──────────────────────────
  public type KnowledgeStats = {
    totalDocuments : Nat;
    totalChunks    : Nat;
    indexedDocs    : Nat;
  };

  // ── Chunk text at sentence boundaries or every 512 chars ────────────────────
  public func chunkText(text : Text) : [Text] {
    let chunkSize = 512;
    let chars     = text.toArray();
    let textSize  = chars.size();
    if (textSize <= chunkSize) { return [text] };

    let buf    = List.empty<Text>();
    var offset = 0;

    while (offset < textSize) {
      // Determine the end of this chunk
      let endIdx = if (offset + chunkSize >= textSize) {
        textSize;
      } else {
        // Try to find a sentence boundary within last 80 chars of the window
        var boundary = offset + chunkSize;
        var search   = boundary;
        var found    = false;
        let lowerBound : Int = (offset : Int) + (chunkSize : Int) - 80;
        while ((search : Int) > lowerBound and not found) {
          if (search < textSize) {
            let c = chars[search];
            if (c == '.' or c == '\n' or c == '?') {
              boundary := search + 1;
              found    := true;
            };
          };
          if (not found) { search -= 1 };
        };
        boundary;
      };

      // Slice chars into a text value
      var slice = "";
      var i = offset;
      while (i < endIdx) {
        slice := slice # Text.fromChar(chars[i]);
        i += 1;
      };
      buf.add(slice);
      offset := endIdx;
    };

    buf.toArray();
  };

  // ── Add a document ───────────────────────────────────────────────────────────
  public func addDocument(
    docs      : Map.Map<Nat, KnowledgeTypes.KnowledgeDocument>,
    nextDocId : { var value : Nat },
    userId    : Principal,
    title     : Text,
    docType   : KnowledgeTypes.DocumentType,
    content   : Text
  ) : Nat {
    let id = nextDocId.value;
    nextDocId.value += 1;
    let doc : KnowledgeTypes.KnowledgeDocument = {
      id;
      userId;
      title;
      docType;
      content;
      chunks      = [];
      uploadedAt  = Time.now();
      indexStatus = #pending;
    };
    docs.add(id, doc);
    id;
  };

  // ── Get all documents for a user ─────────────────────────────────────────────
  public func getDocuments(
    docs   : Map.Map<Nat, KnowledgeTypes.KnowledgeDocument>,
    userId : Principal
  ) : [KnowledgeTypes.KnowledgeDocument] {
    let buf = List.empty<KnowledgeTypes.KnowledgeDocument>();
    for ((_, doc) in docs.entries()) {
      if (Principal.equal(doc.userId, userId)) {
        buf.add(doc);
      };
    };
    buf.toArray();
  };

  // ── Delete a document ────────────────────────────────────────────────────────
  public func deleteDocument(
    docs  : Map.Map<Nat, KnowledgeTypes.KnowledgeDocument>,
    docId : Nat
  ) : Bool {
    switch (docs.get(docId)) {
      case null  { false };
      case (?_)  { docs.remove(docId); true };
    };
  };

  // ── Index a document: chunk content and attach mock embeddings ───────────────
  public func indexDocument(
    docs  : Map.Map<Nat, KnowledgeTypes.KnowledgeDocument>,
    docId : Nat
  ) : Bool {
    switch (docs.get(docId)) {
      case null { false };
      case (?doc) {
        let textChunks = chunkText(doc.content);
        var chunkIdx : Nat = 0;
        let chunkList = List.empty<KnowledgeTypes.KnowledgeChunk>();
        for (text in textChunks.vals()) {
          chunkList.add({
            id              = docId * 1000 + chunkIdx;
            docId;
            text;
            chunkIndex      = chunkIdx;
            embeddingVector = mockEmbedding(text);
            similarity      = 0.0;
          });
          chunkIdx += 1;
        };
        let updated : KnowledgeTypes.KnowledgeDocument = {
          doc with
          chunks      = chunkList.toArray();
          indexStatus = #indexed;
        };
        docs.add(docId, updated);
        true;
      };
    };
  };

  // ── Search knowledge base with keyword matching ──────────────────────────────
  public func searchKnowledge(
    docs  : Map.Map<Nat, KnowledgeTypes.KnowledgeDocument>,
    kq : KnowledgeTypes.KnowledgeQuery
  ) : [KnowledgeTypes.KnowledgeResult] {
    let queryLower = kq.searchText.toLower();
    let results    = List.empty<KnowledgeTypes.KnowledgeResult>();

    for ((_, doc) in docs.entries()) {
      if (Principal.equal(doc.userId, kq.userId) and doc.indexStatus == #indexed) {
        for (chunk in doc.chunks.vals()) {
          let score = keywordScore(chunk.text.toLower(), queryLower);
          if (score > 0.0) {
            results.add({
              chunk = { chunk with similarity = score };
              score;
            });
          };
        };
      };
    };

    // Sort by score descending, take topK
    func compareResults(a : KnowledgeTypes.KnowledgeResult, b : KnowledgeTypes.KnowledgeResult) : Order.Order {
      if (a.score > b.score) { #less }
      else if (a.score < b.score) { #greater }
      else { #equal };
    };
    let sorted = results.sort(compareResults);
    sorted.sliceToArray(0, kq.topK);
  };

  // ── Stats ────────────────────────────────────────────────────────────────────
  public func getKnowledgeStats(
    docs : Map.Map<Nat, KnowledgeTypes.KnowledgeDocument>
  ) : KnowledgeStats {
    var totalDocuments = 0;
    var totalChunks    = 0;
    var indexedDocs    = 0;
    for ((_, doc) in docs.entries()) {
      totalDocuments += 1;
      totalChunks    += doc.chunks.size();
      if (doc.indexStatus == #indexed) { indexedDocs += 1 };
    };
    { totalDocuments; totalChunks; indexedDocs };
  };

  // ── Mock embedding: 8-dim vector using simple char hash ─────────────────────
  func mockEmbedding(text : Text) : [Float] {
    var h : Nat = 5381;
    for (c in text.chars()) {
      // Combine hash with char code using djb2 variant
      let code : Nat = switch (c) {
        case ' '  { 32  };
        case 'a'  { 97  };
        case 'e'  { 101 };
        case 'i'  { 105 };
        case 'o'  { 111 };
        case 'u'  { 117 };
        case _    { 65  };
      };
      h := (h * 33 + code) % 1_000_000_007;
    };
    [
      (h % 100).toFloat() / 100.0,
      ((h / 100) % 100).toFloat() / 100.0,
      ((h / 10_000) % 100).toFloat() / 100.0,
      ((h / 1_000_000) % 100).toFloat() / 100.0,
      (h % 50).toFloat() / 50.0,
      (h % 73).toFloat() / 73.0,
      (h % 97).toFloat() / 97.0,
      (h % 31).toFloat() / 31.0,
    ];
  };

  // ── Keyword relevance score: fraction of query words found in text ───────────
  func keywordScore(textLower : Text, queryLower : Text) : Float {
    let words = queryLower.split(#char ' ').toArray();
    if (words.size() == 0) { return 0.0 };
    var hits : Nat = 0;
    for (word in words.vals()) {
      if (word.size() > 0 and textLower.contains(#text word)) {
        hits += 1;
      };
    };
    hits.toFloat() / words.size().toFloat();
  };
};
