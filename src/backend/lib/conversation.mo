import Types "../types";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func addMessage(
    messages : List.List<Types.Message>,
    nextId : Nat,
    role : Text,
    content : Text
  ) : Types.Message {
    let msg : Types.Message = {
      id = nextId;
      role = role;
      content = content;
      timestamp = Time.now();
    };
    messages.add(msg);
    msg;
  };

  public func getHistory(messages : List.List<Types.Message>) : [Types.Message] {
    let arr = messages.toArray();
    arr;
  };

  public func clearHistory(messages : List.List<Types.Message>) {
    messages.clear();
  };
};
