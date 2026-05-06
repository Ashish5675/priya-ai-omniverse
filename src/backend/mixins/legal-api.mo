import LegalTypes "../types/legal";
import LegalLib "../lib/legal";
import Map "mo:core/Map";

mixin (
  legalDocs : LegalLib.DocMap,
  nextLegalDocId : { var value : Nat },
) {

  /// Upload a legal document — returns the assigned doc ID
  public shared ({ caller }) func uploadLegalDocument(title : Text, content : Text) : async Nat {
    LegalLib.uploadLegalDoc(legalDocs, nextLegalDocId, caller, title, content);
  };

  /// List the caller's legal documents (query)
  public query ({ caller }) func listLegalDocuments() : async [LegalTypes.LegalDocument] {
    LegalLib.listLegalDocs(legalDocs, caller);
  };

  /// Get a single legal document by ID (query)
  public query func getLegalDocument(docId : Nat) : async ?LegalTypes.LegalDocument {
    LegalLib.getLegalDoc(legalDocs, docId);
  };

  /// Delete a legal document
  public shared func deleteLegalDocument(docId : Nat) : async Bool {
    LegalLib.deleteLegalDoc(legalDocs, docId);
  };

  /// Summarize a legal document (demo AI analysis)
  public shared func summarizeLegalDocument(docId : Nat) : async Text {
    LegalLib.summarizeDoc(legalDocs, docId);
  };

  /// Extract clauses from a legal document (demo AI analysis)
  public shared func extractDocumentClauses(docId : Nat) : async [LegalTypes.LegalClause] {
    LegalLib.extractClauses(legalDocs, docId);
  };

  /// Answer a question about a legal document (demo RAG)
  public shared func askDocumentQuestion(docId : Nat, question : Text) : async Text {
    LegalLib.answerQuestion(legalDocs, docId, question);
  };

  /// Export a document summary in the given format ("markdown" | "html" | "text")
  public query func exportDocumentSummary(docId : Nat, format : Text) : async LegalTypes.LegalExport {
    LegalLib.exportSummary(legalDocs, docId, format);
  };

};
