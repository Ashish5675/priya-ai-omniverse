import Map "mo:core/Map";
import List "mo:core/List";
import GeneticTypes "../types/genetic";
import GeneticLib "../lib/genetic";

mixin (
  geneticStore : Map.Map<Text, List.List<GeneticTypes.UserPreference>>,
) {
  public shared func updateGeneticPreference(
    userId : Text,
    key    : Text,
    value  : Text,
    weight : Float,
  ) : async () {
    GeneticLib.updatePreference(geneticStore, userId, key, value, weight);
  };

  public query func getGeneticProfile(userId : Text) : async GeneticTypes.GeneticProfile {
    GeneticLib.getGeneticProfile(geneticStore, userId)
  };

  public shared func recordInteraction(
    userId    : Text,
    topicTags : [Text],
  ) : async () {
    GeneticLib.recordInteraction(geneticStore, userId, topicTags);
  };
}
