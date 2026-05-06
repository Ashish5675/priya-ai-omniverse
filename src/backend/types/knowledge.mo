module {
  public type DocumentType = {
    #pdf;
    #docx;
    #txt;
    #url;
  };

  public type IndexStatus = {
    #pending;
    #indexed;
    #failed;
  };

  public type KnowledgeChunk = {
    id : Nat;
    docId : Nat;
    text : Text;
    chunkIndex : Nat;
    embeddingVector : [Float];
    similarity : Float;
  };

  public type KnowledgeDocument = {
    id : Nat;
    userId : Principal;
    title : Text;
    docType : DocumentType;
    content : Text;
    chunks : [KnowledgeChunk];
    uploadedAt : Int;
    indexStatus : IndexStatus;
  };

  public type KnowledgeQuery = {
    searchText : Text;
    topK : Nat;
    userId : Principal;
  };

  public type KnowledgeResult = {
    chunk : KnowledgeChunk;
    score : Float;
  };
};
