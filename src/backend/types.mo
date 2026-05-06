module {
  public type Message = {
    id : Nat;
    role : Text;
    content : Text;
    timestamp : Int;
  };

  public type Settings = {
    personality : Text;
    glowColor : Text;
    apiKey : Text;
  };

  public type ChatMessage = {
    role : Text;
    content : Text;
  };
};
