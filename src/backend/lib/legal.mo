import LegalTypes "../types/legal";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  public type DocMap = Map.Map<Nat, LegalTypes.LegalDocument>;

  // ── Queries ───────────────────────────────────────────────────────────────

  public func getLegalDoc(docs : DocMap, docId : Nat) : ?LegalTypes.LegalDocument {
    docs.get(docId);
  };

  public func listLegalDocs(docs : DocMap, userId : Principal) : [LegalTypes.LegalDocument] {
    let buf = List.empty<LegalTypes.LegalDocument>();
    for ((_, doc) in docs.entries()) {
      if (Principal.equal(doc.userId, userId)) {
        buf.add(doc);
      };
    };
    buf.toArray();
  };

  // ── Mutations ─────────────────────────────────────────────────────────────

  public func uploadLegalDoc(
    docs : DocMap,
    nextId : { var value : Nat },
    userId : Principal,
    title : Text,
    content : Text,
  ) : Nat {
    let id = nextId.value;
    let doc : LegalTypes.LegalDocument = {
      id;
      userId;
      title;
      content;
      uploadedAt = Time.now();
      summary = null;
      clauses = [];
    };
    docs.add(id, doc);
    nextId.value += 1;
    id;
  };

  public func deleteLegalDoc(docs : DocMap, docId : Nat) : Bool {
    switch (docs.get(docId)) {
      case null false;
      case (?_) {
        docs.remove(docId);
        true;
      };
    };
  };

  // ── AI analysis (demo implementations) ───────────────────────────────────

  /// Generate a demo summary from the document's title and content size.
  public func summarizeDoc(docs : DocMap, docId : Nat) : Text {
    switch (docs.get(docId)) {
      case null "Document not found.";
      case (?doc) {
        let preview = doc.content.size();
        let summary =
          "Summary of \"" # doc.title # "\": " #
          "This document contains approximately " # debug_show(preview) #
          " characters. Key themes include contractual obligations, rights, " #
          "and responsibilities of the involved parties. Review individual " #
          "clauses for specific terms and conditions.";
        // Persist summary back into doc
        docs.add(docId, { doc with summary = ?summary });
        summary;
      };
    };
  };

  /// Extract demo clauses by keyword scanning.
  public func extractClauses(docs : DocMap, docId : Nat) : [LegalTypes.LegalClause] {
    switch (docs.get(docId)) {
      case null [];
      case (?doc) {
        let keywords : [(Text, Text)] = [
          ("payment", "PAYMENT"),
          ("terminat", "TERMINATION"),
          ("liabilit", "LIABILITY"),
          ("confidential", "CONFIDENTIALITY"),
          ("indemnit", "INDEMNITY"),
        ];
        let buf = List.empty<LegalTypes.LegalClause>();
        var clauseId : Nat = 0;
        for ((_kw, clauseType) in keywords.vals()) {
          // Demo: always add a simulated clause for each keyword type
          let clause : LegalTypes.LegalClause = {
            id = clauseId;
            docId;
            clauseType;
            text = "Simulated " # clauseType # " clause extracted from \"" # doc.title # "\". " #
              "In a production system, this would contain the exact extracted text.";
            startPos = clauseId * 100;
            endPos = clauseId * 100 + 80;
          };
          buf.add(clause);
          clauseId += 1;
        };
        let clauses = buf.toArray();
        // Persist clauses back
        docs.add(docId, { doc with clauses });
        clauses;
      };
    };
  };

  /// Answer a question about a document using demo RAG simulation.
  public func answerQuestion(docs : DocMap, docId : Nat, question : Text) : Text {
    switch (docs.get(docId)) {
      case null "Document not found.";
      case (?doc) {
        "Based on \"" # doc.title # "\", regarding your question: \"" # question # "\" — " #
        "In a production deployment, Priya AI would retrieve the most relevant " #
        "passages from this document and generate a precise answer using the LLM. " #
        "Demo mode: the document has " # debug_show(doc.content.size()) # " characters " #
        "and " # debug_show(doc.clauses.size()) # " extracted clauses.";
      };
    };
  };

  /// Export document summary in the requested format.
  public func exportSummary(docs : DocMap, docId : Nat, format : Text) : LegalTypes.LegalExport {
    switch (docs.get(docId)) {
      case null {
        { docId; format; content = "Document not found." };
      };
      case (?doc) {
        let summary = switch (doc.summary) {
          case (?s) s;
          case null summarizeDoc(docs, docId);
        };
        let content = switch (format) {
          case "markdown" {
            "# " # doc.title # "\n\n" # summary # "\n\n## Clauses\n" #
            clausesToText(doc.clauses);
          };
          case "html" {
            "<h1>" # doc.title # "</h1><p>" # summary # "</p><ul>" #
            clausesToHtml(doc.clauses) # "</ul>";
          };
          case _ { doc.title # "\n\n" # summary };
        };
        { docId; format; content };
      };
    };
  };

  // ── Helpers ───────────────────────────────────────────────────────────────

  func clausesToText(clauses : [LegalTypes.LegalClause]) : Text {
    var out = "";
    for (c in clauses.vals()) {
      out := out # "- [" # c.clauseType # "] " # c.text # "\n";
    };
    out;
  };

  func clausesToHtml(clauses : [LegalTypes.LegalClause]) : Text {
    var out = "";
    for (c in clauses.vals()) {
      out := out # "<li><strong>" # c.clauseType # "</strong>: " # c.text # "</li>";
    };
    out;
  };
};
