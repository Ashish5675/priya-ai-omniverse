import Types "../types";
import ConversationLib "../lib/conversation";
import List "mo:core/List";

mixin (
  messages : List.List<Types.Message>,
  nextMessageId : { var value : Nat }
) {
  public func addMessage(role : Text, content : Text) : async Types.Message {
    let id = nextMessageId.value;
    nextMessageId.value += 1;
    ConversationLib.addMessage(messages, id, role, content);
  };

  public query func getHistory() : async [Types.Message] {
    ConversationLib.getHistory(messages);
  };

  public func clearHistory() : async () {
    ConversationLib.clearHistory(messages);
    nextMessageId.value := 0;
  };
};
