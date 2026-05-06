import Types "../types";

mixin (settings : { var value : Types.Settings }) {
  public func saveSettings(personality : Text, glowColor : Text, apiKey : Text) : async () {
    settings.value := { personality; glowColor; apiKey };
  };

  public query func getSettings() : async Types.Settings {
    settings.value;
  };
};
