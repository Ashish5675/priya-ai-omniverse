module {
  public type LegalClause = {
    id : Nat;
    docId : Nat;
    clauseType : Text;
    text : Text;
    startPos : Int;
    endPos : Int;
  };

  public type LegalDocument = {
    id : Nat;
    userId : Principal;
    title : Text;
    content : Text;
    uploadedAt : Int;
    summary : ?Text;
    clauses : [LegalClause];
  };

  public type LegalQuestion = {
    docId : Nat;
    question : Text;
    answer : ?Text;
    timestamp : Int;
  };

  public type LegalExport = {
    docId : Nat;
    format : Text;
    content : Text;
  };
};
