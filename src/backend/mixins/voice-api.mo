import VoiceTypes "../types/voice";
import VoiceLib   "../lib/voice";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

mixin (
  voiceSettings  : Map.Map<Principal, VoiceTypes.VoiceSettings>,
  voiceSessions  : Map.Map<Nat, VoiceTypes.VoiceSession>,
  nextSessionId  : { var value : Nat }
) {
  // ── Get voice settings for the caller ────────────────────────────────────────
  public shared query ({ caller }) func getVoiceSettings() : async VoiceTypes.VoiceSettings {
    VoiceLib.getVoiceSettings(voiceSettings, caller);
  };

  // ── Save voice settings for the caller ───────────────────────────────────────
  public shared ({ caller }) func saveVoiceSettings(settings : VoiceTypes.VoiceSettings) : async Bool {
    VoiceLib.saveVoiceSettings(voiceSettings, caller, settings);
  };

  // ── Log a voice session ───────────────────────────────────────────────────────
  public shared ({ caller }) func logVoiceSession(
    language      : Text,
    transcription : Text,
    synthesis     : Text
  ) : async Nat {
    let lang = VoiceLib.parseLanguage(language);
    VoiceLib.logVoiceSession(voiceSessions, nextSessionId, caller, lang, transcription, synthesis);
  };

  // ── Get voice sessions for the caller ────────────────────────────────────────
  public shared query ({ caller }) func getVoiceSessions() : async [VoiceTypes.VoiceSession] {
    VoiceLib.getVoiceSessions(voiceSessions, caller);
  };

  // ── Translate text to a target language ──────────────────────────────────────
  // In demo mode: wraps text with language label.
  // Production: delegates to LLM http-outcall translation.
  public shared ({ caller = _ }) func translateForLanguage(
    text     : Text,
    language : Text
  ) : async Text {
    let lang = VoiceLib.parseLanguage(language);
    VoiceLib.translateResponse(text, lang);
  };
};
