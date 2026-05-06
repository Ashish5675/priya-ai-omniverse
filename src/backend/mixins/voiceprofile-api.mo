import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import VoiceProfileTypes "../types/voiceprofile";
import VoiceProfileLib "../lib/voiceprofile";

mixin (
  vpStore    : Map.Map<Text, List.List<VoiceProfileTypes.VoiceProfile>>,
  vpIdCounter : { var value : Nat },
) {
  public shared func enrollVoiceProfile(
    userId       : Text,
    name         : Text,
    relationship : Text,
    mfccFeatures : [Float],
  ) : async VoiceProfileTypes.VoiceProfile {
    VoiceProfileLib.enrollVoiceProfile(vpStore, vpIdCounter, userId, name, relationship, mfccFeatures)
  };

  public query func matchVoiceProfile(
    userId    : Text,
    inputMfcc : [Float],
  ) : async ?VoiceProfileTypes.VoiceMatch {
    VoiceProfileLib.matchVoiceProfile(vpStore, userId, inputMfcc)
  };

  public query func listVoiceProfiles(userId : Text) : async [VoiceProfileTypes.VoiceProfile] {
    VoiceProfileLib.listVoiceProfiles(vpStore, userId)
  };

  public shared func deleteVoiceProfile(
    userId    : Text,
    profileId : Text,
  ) : async Bool {
    VoiceProfileLib.deleteVoiceProfile(vpStore, userId, profileId)
  };
}
