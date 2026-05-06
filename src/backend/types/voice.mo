module {
  public type Language = {
    #english;
    #hindi;
    #nagpuri;
  };

  public type VoiceSettings = {
    language : Language;
    autoPlay : Bool;
    continuousMode : Bool;
    speed : Float;
    pitch : Float;
  };

  public type VoiceSession = {
    id : Nat;
    userId : Principal;
    language : Language;
    transcription : Text;
    synthesis : Text;
    timestamp : Int;
  };

  public type STTRequest = {
    audioData : Text;
    language : Language;
  };

  public type TTSRequest = {
    text : Text;
    language : Language;
    ssml : Bool;
  };
};
