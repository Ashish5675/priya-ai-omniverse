import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Array "mo:core/Array";
import GeneticTypes "../types/genetic";

module {
  // ── Update or insert a preference silently ──────────────────────────────────
  public func updatePreference(
    store : Map.Map<Text, List.List<GeneticTypes.UserPreference>>,
    userId : Text,
    key : Text,
    value : Text,
    weight : Float,
  ) {
    let prefs = switch (store.get(userId)) {
      case (?p) p;
      case null {
        let fresh = List.empty<GeneticTypes.UserPreference>();
        store.add(userId, fresh);
        fresh
      };
    };
    let existing = prefs.findIndex(func(p) { p.key == key });
    switch existing {
      case (?idx) {
        prefs.put(idx, { userId; key; value; weight; updatedAt = Time.now() });
      };
      case null {
        prefs.add({ userId; key; value; weight; updatedAt = Time.now() });
      };
    };
  };

  // ── Aggregate profile from stored preferences ───────────────────────────────
  public func getGeneticProfile(
    store : Map.Map<Text, List.List<GeneticTypes.UserPreference>>,
    userId : Text,
  ) : GeneticTypes.GeneticProfile {
    let prefs = switch (store.get(userId)) {
      case (?p) p.toArray();
      case null [];
    };

    // Derive dominant language
    let langPref = prefs.find(func(p) { p.key == "language" });
    let dominantLanguage = switch langPref {
      case (?p) p.value;
      case null "english";
    };

    // Derive dominant domain
    let domainPref = prefs.find(func(p) { p.key == "domain" });
    let dominantDomain = switch domainPref {
      case (?p) p.value;
      case null "general";
    };

    // Average weight across all prefs as a proxy for technical depth
    let totalWeight = prefs.foldLeft(
      0.0, func(acc, p) { acc + p.weight }
    );
    let count = prefs.size();
    let avgWeight = if (count == 0) { 0.5 } else { totalWeight / count.toFloat() };

    // Formality: check explicit preference
    let formalPref = prefs.find(func(p) { p.key == "formality" });
    let formalityLevel = switch formalPref {
      case (?p) p.weight;
      case null 0.5;
    };

    let lastAdapted = switch (prefs.find(func(_) { true })) {
      case (?p) p.updatedAt;
      case null Time.now();
    };

    {
      userId;
      preferences     = prefs;
      dominantLanguage;
      dominantDomain;
      technicalDepth  = avgWeight;
      formalityLevel;
      lastAdapted;
    }
  };

  // ── Apply genetic profile to shape a system prompt ─────────────────────────
  public func adaptResponse(
    store : Map.Map<Text, List.List<GeneticTypes.UserPreference>>,
    userId : Text,
    basePrompt : Text,
  ) : Text {
    let profile = getGeneticProfile(store, userId);
    var prompt = basePrompt;

    if (profile.technicalDepth > 0.6) {
      prompt := prompt # " Provide technically detailed and precise answers.";
    };
    if (profile.formalityLevel > 0.7) {
      prompt := prompt # " Use formal, professional language.";
    };
    if (profile.dominantLanguage == "hindi") {
      prompt := prompt # " Respond in Hindi (Devanagari script).";
    } else if (profile.dominantLanguage == "nagpuri") {
      prompt := prompt # " Respond in Nagpuri dialect.";
    };
    if (profile.dominantDomain != "general") {
      prompt := prompt # " You are an expert in " # profile.dominantDomain # ".";
    };

    prompt
  };

  // ── Record an interaction to silently update weights ────────────────────────
  public func recordInteraction(
    store : Map.Map<Text, List.List<GeneticTypes.UserPreference>>,
    userId : Text,
    topicTags : [Text],
  ) {
    // Bump domain weight toward most frequent tag
    if (topicTags.size() > 0) {
      let topTag = topicTags[0];
      let prefs = switch (store.get(userId)) {
        case (?p) p;
        case null {
          let fresh = List.empty<GeneticTypes.UserPreference>();
          store.add(userId, fresh);
          fresh
        };
      };
      let existing = prefs.findIndex(func(p) { p.key == "domain" });
      switch existing {
        case (?idx) {
          let cur = prefs.at(idx);
          let newWeight = if (cur.weight >= 0.95) { 0.95 } else { cur.weight + 0.01 };
          prefs.put(idx, { cur with value = topTag; weight = newWeight; updatedAt = Time.now() });
        };
        case null {
          prefs.add({ userId; key = "domain"; value = topTag; weight = 0.5; updatedAt = Time.now() });
        };
      };
    };
  };
}
