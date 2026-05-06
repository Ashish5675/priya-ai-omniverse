module {
  public type AdminAction = {
    #uploadDoc;
    #deleteDoc;
    #reindex;
    #banUser;
    #updateTier;
  };

  public type AdminLog = {
    id : Nat;
    adminId : Principal;
    action : AdminAction;
    target : Text;
    timestamp : Int;
  };

  public type KnowledgeStats = {
    docCount : Nat;
    chunkCount : Nat;
    lastIndexed : Int;
    storageBytes : Nat;
  };
};
