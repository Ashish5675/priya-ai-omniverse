import VoiceTypes "../types/voice";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

module {
  // ── Default settings ─────────────────────────────────────────────────────────
  public func defaultVoiceSettings() : VoiceTypes.VoiceSettings {
    {
      language        = #english;
      autoPlay        = true;
      continuousMode  = false;
      speed           = 1.0;
      pitch           = 1.0;
    };
  };

  // ── Get settings for a user (falls back to defaults) ────────────────────────
  public func getVoiceSettings(
    settingsMap : Map.Map<Principal, VoiceTypes.VoiceSettings>,
    userId      : Principal
  ) : VoiceTypes.VoiceSettings {
    switch (settingsMap.get(userId)) {
      case (?s) { s };
      case null { defaultVoiceSettings() };
    };
  };

  // ── Save settings for a user ─────────────────────────────────────────────────
  public func saveVoiceSettings(
    settingsMap : Map.Map<Principal, VoiceTypes.VoiceSettings>,
    userId      : Principal,
    settings    : VoiceTypes.VoiceSettings
  ) : Bool {
    settingsMap.add(userId, settings);
    true;
  };

  // ── Log a voice session ───────────────────────────────────────────────────────
  public func logVoiceSession(
    sessions      : Map.Map<Nat, VoiceTypes.VoiceSession>,
    nextSessionId : { var value : Nat },
    userId        : Principal,
    language      : VoiceTypes.Language,
    transcription : Text,
    synthesis     : Text
  ) : Nat {
    let id = nextSessionId.value;
    nextSessionId.value += 1;
    sessions.add(id, { id; userId; language; transcription; synthesis; timestamp = Time.now() });
    id;
  };

  // ── Get all voice sessions for a user ────────────────────────────────────────
  public func getVoiceSessions(
    sessions : Map.Map<Nat, VoiceTypes.VoiceSession>,
    userId   : Principal
  ) : [VoiceTypes.VoiceSession] {
    let buf = List.empty<VoiceTypes.VoiceSession>();
    for ((_, s) in sessions.entries()) {
      if (Principal.equal(s.userId, userId)) {
        buf.add(s);
      };
    };
    buf.toArray();
  };

  // ── System prompt per language and personality ───────────────────────────────
  public func getSystemPromptForLanguage(
    language    : VoiceTypes.Language,
    personality : Text
  ) : Text {
    switch (language) {
      case (#english) {
        if (personality == "professional") {
          "You are Priya, a sophisticated and precise AI assistant. Respond in clear, professional English.";
        } else if (personality == "mysterious") {
          "You are Priya, an enigmatic AI with deep knowledge. Respond in English with subtle depth.";
        } else {
          "You are Priya, a warm and enthusiastic AI assistant from India. Respond in friendly English.";
        };
      };
      case (#hindi) {
        "आप प्रिया हैं, एक बुद्धिमान और मददगार AI सहायक। हमेशा हिंदी में उत्तर दें। आपका स्वर मित्रवत और सहायक होना चाहिए।";
      };
      case (#nagpuri) {
        "तुम प्रिया हो, एक चालाक अउ मददगार AI सहायक। हमेशा नागपुरी (छत्तीसगढ़ी) में जवाब देव। तुमार बोलचाल आपन-पन से भरा होना चाई।";
      };
    };
  };

  // ── Parse Language from Text tag ─────────────────────────────────────────────
  public func parseLanguage(tag : Text) : VoiceTypes.Language {
    if (tag == "hindi")   { #hindi }
    else if (tag == "nagpuri") { #nagpuri }
    else { #english };
  };

  // ── Language tag as Text ─────────────────────────────────────────────────────
  public func languageToText(lang : VoiceTypes.Language) : Text {
    switch (lang) {
      case (#english) { "english" };
      case (#hindi)   { "hindi"   };
      case (#nagpuri) { "nagpuri" };
    };
  };

  // ── Simple translation stub: wraps the text with a language instruction ──────
  // In production, this would call an LLM translation API.
  public func translateResponse(text : Text, targetLang : VoiceTypes.Language) : Text {
    switch (targetLang) {
      case (#english) { text };
      case (#hindi) {
        "[हिंदी अनुवाद] " # text;
      };
      case (#nagpuri) {
        "[नागपुरी अनुवाद] " # text;
      };
    };
  };

  // ── Aggregate voice metrics ───────────────────────────────────────────────────
  public func voiceMetrics(
    sessions : Map.Map<Nat, VoiceTypes.VoiceSession>
  ) : { totalSessions : Nat; byLanguage : [(VoiceTypes.Language, Nat)] } {
    var englishCount : Nat = 0;
    var hindiCount   : Nat = 0;
    var nagpuriCount : Nat = 0;
    var totalSessions : Nat = 0;

    for ((_, s) in sessions.entries()) {
      totalSessions += 1;
      switch (s.language) {
        case (#english) { englishCount += 1 };
        case (#hindi)   { hindiCount   += 1 };
        case (#nagpuri) { nagpuriCount += 1 };
      };
    };

    {
      totalSessions;
      byLanguage = [
        (#english, englishCount),
        (#hindi,   hindiCount),
        (#nagpuri, nagpuriCount),
      ];
    };
  };
};
