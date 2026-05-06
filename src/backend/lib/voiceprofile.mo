import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Array "mo:core/Array";
import VoiceProfileTypes "../types/voiceprofile";

module {
  // ── Cosine similarity between two equal-length MFCC vectors ────────────────
  func cosineSimilarity(a : [Float], b : [Float]) : Float {
    if (a.size() == 0 or a.size() != b.size()) { return 0.0 };
    var dot : Float = 0.0;
    var normA : Float = 0.0;
    var normB : Float = 0.0;
    var i = 0;
    while (i < a.size()) {
      dot   := dot   + a[i] * b[i];
      normA := normA + a[i] * a[i];
      normB := normB + b[i] * b[i];
      i += 1;
    };
    let denom = Float.sqrt(normA) * Float.sqrt(normB);
    if (denom == 0.0) { 0.0 } else { dot / denom }
  };

  // ── Enroll a new voice profile ──────────────────────────────────────────────
  public func enrollVoiceProfile(
    store : Map.Map<Text, List.List<VoiceProfileTypes.VoiceProfile>>,
    idCounter : { var value : Nat },
    userId : Text,
    name : Text,
    relationship : Text,
    mfccFeatures : [Float],
  ) : VoiceProfileTypes.VoiceProfile {
    idCounter.value += 1;
    let profile : VoiceProfileTypes.VoiceProfile = {
      id              = idCounter.value.toText();
      userId;
      name;
      relationship;
      mfccFeatures;
      enrolledPhrases = 1;
      enrolledAt      = Time.now();
    };
    let profiles = switch (store.get(userId)) {
      case (?p) p;
      case null {
        let fresh = List.empty<VoiceProfileTypes.VoiceProfile>();
        store.add(userId, fresh);
        fresh
      };
    };
    profiles.add(profile);
    profile
  };

  // ── Match input MFCC against all enrolled profiles ──────────────────────────
  public func matchVoiceProfile(
    store : Map.Map<Text, List.List<VoiceProfileTypes.VoiceProfile>>,
    userId : Text,
    inputMfcc : [Float],
  ) : ?VoiceProfileTypes.VoiceMatch {
    let profiles = switch (store.get(userId)) {
      case (?p) p;
      case null { return null };
    };
    if (profiles.isEmpty()) { return null };

    var bestId : Text = "";
    var bestName : Text = "";
    var bestScore : Float = -1.0;

    profiles.forEach(func(prof) {
      let score = cosineSimilarity(inputMfcc, prof.mfccFeatures);
      if (score > bestScore) {
        bestScore := score;
        bestId    := prof.id;
        bestName  := prof.name;
      };
    });

    if (bestScore < 0.0) { null } else {
      ?{ profileId = bestId; name = bestName; confidence = bestScore }
    }
  };

  // ── List all profiles for a user ────────────────────────────────────────────
  public func listVoiceProfiles(
    store : Map.Map<Text, List.List<VoiceProfileTypes.VoiceProfile>>,
    userId : Text,
  ) : [VoiceProfileTypes.VoiceProfile] {
    switch (store.get(userId)) {
      case (?p) p.toArray();
      case null [];
    }
  };

  // ── Delete a profile by id ──────────────────────────────────────────────────
  public func deleteVoiceProfile(
    store : Map.Map<Text, List.List<VoiceProfileTypes.VoiceProfile>>,
    userId : Text,
    profileId : Text,
  ) : Bool {
    switch (store.get(userId)) {
      case null false;
      case (?profiles) {
        let before = profiles.size();
        let filtered = profiles.filter(func(p) { p.id != profileId });
        profiles.clear();
        profiles.append(filtered);
        profiles.size() < before
      };
    }
  };
}
