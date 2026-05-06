module {
  public type VoiceProfile = {
    id : Text;
    userId : Text;
    name : Text;
    relationship : Text;
    mfccFeatures : [Float];
    enrolledPhrases : Nat;
    enrolledAt : Int;
  };

  public type VoiceMatch = {
    profileId : Text;
    name : Text;
    confidence : Float;
  };
}
