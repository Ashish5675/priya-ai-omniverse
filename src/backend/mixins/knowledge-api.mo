import KnowledgeTypes "../types/knowledge";
import KnowledgeLib   "../lib/knowledge";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

mixin (
  knowledgeDocs : Map.Map<Nat, KnowledgeTypes.KnowledgeDocument>,
  nextDocId     : { var value : Nat }
) {
  // ── Upload a document ─────────────────────────────────────────────────────────
  public shared ({ caller }) func uploadDocument(
    title   : Text,
    docType : Text,
    content : Text
  ) : async Nat {
    let dt : KnowledgeTypes.DocumentType = parseDocType(docType);
    let docId = KnowledgeLib.addDocument(knowledgeDocs, nextDocId, caller, title, dt, content);
    // Auto-index synchronously (demo mode — no async HTTP needed)
    ignore KnowledgeLib.indexDocument(knowledgeDocs, docId);
    docId;
  };

  // ── List documents for the caller ────────────────────────────────────────────
  public shared query ({ caller }) func listDocuments() : async [KnowledgeTypes.KnowledgeDocument] {
    KnowledgeLib.getDocuments(knowledgeDocs, caller);
  };

  // ── Delete a document ─────────────────────────────────────────────────────────
  public shared ({ caller = _ }) func deleteDocument(docId : Nat) : async Bool {
    KnowledgeLib.deleteDocument(knowledgeDocs, docId);
  };

  // ── Search the knowledge base ────────────────────────────────────────────────
  public shared ({ caller }) func searchKnowledge(
    searchQuery : Text,
    topK  : Nat
  ) : async [KnowledgeTypes.KnowledgeResult] {
    let kq : KnowledgeTypes.KnowledgeQuery = { searchText = searchQuery; topK; userId = caller };
    KnowledgeLib.searchKnowledge(knowledgeDocs, kq);
  };

  // ── Stats ────────────────────────────────────────────────────────────────────
  public query func getKnowledgeStats() : async KnowledgeLib.KnowledgeStats {
    KnowledgeLib.getKnowledgeStats(knowledgeDocs);
  };

  // ── Helpers ──────────────────────────────────────────────────────────────────
  func parseDocType(tag : Text) : KnowledgeTypes.DocumentType {
    if (tag == "pdf")  { #pdf  }
    else if (tag == "docx") { #docx }
    else if (tag == "url")  { #url  }
    else { #txt };
  };
};
