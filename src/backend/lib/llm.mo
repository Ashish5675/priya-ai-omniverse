import Types "../types";
import Text "mo:core/Text";

module {
  let defaultPersonality = "friendly";
  let defaultGlowColor = "#00d9ff";
  let defaultApiKey = "";

  public func defaultSettings() : Types.Settings {
    {
      personality = defaultPersonality;
      glowColor = defaultGlowColor;
      apiKey = defaultApiKey;
    };
  };

  public func systemPrompt(personality : Text) : Text {
    if (personality == "professional") {
      "You are Aria, a sophisticated and precise AI assistant";
    } else if (personality == "mysterious") {
      "You are Aria, an enigmatic AI with deep knowledge";
    } else {
      "You are Aria, a warm and enthusiastic AI assistant";
    };
  };

  public func buildRequestBody(
    messages : [Types.ChatMessage],
    personality : Text
  ) : Text {
    let sysPrompt = systemPrompt(personality);

    // Build messages JSON array
    var msgsJson = "[{\"role\":\"system\",\"content\":\"" # escapeJson(sysPrompt) # "\"}";
    for (m in messages.vals()) {
      msgsJson := msgsJson # ",{\"role\":\"" # escapeJson(m.role) # "\",\"content\":\"" # escapeJson(m.content) # "\"}";
    };
    msgsJson := msgsJson # "]";

    "{\"model\":\"gpt-3.5-turbo\",\"max_tokens\":500,\"messages\":" # msgsJson # "}";
  };

  // Escape special JSON characters in a string value
  public func escapeJson(s : Text) : Text {
    var result = "";
    for (c in s.chars()) {
      if (c == '\"') {
        result := result # "\\\"";
      } else if (c == '\\') {
        result := result # "\\\\";
      } else if (c == '\n') {
        result := result # "\\n";
      } else if (c == '\r') {
        result := result # "\\r";
      } else if (c == '\t') {
        result := result # "\\t";
      } else {
        result := result # Text.fromChar(c);
      };
    };
    result;
  };

  // Parse "choices[0].message.content" from OpenAI JSON response
  // Strategy: find the first "content":" occurrence after "choices" and extract the value
  public func parseContent(json : Text) : ?Text {
    let choicesMarker = "\"choices\"";
    let contentMarker = "\"content\":\"";

    // Find choices section
    if (not json.contains(#text choicesMarker)) {
      return null;
    };

    // Find content key after choices
    let parts = json.split(#text choicesMarker);
    var afterChoices = "";
    var first = true;
    for (part in parts) {
      if (first) {
        first := false;
      } else {
        afterChoices := afterChoices # part;
      };
    };

    if (afterChoices == "") {
      return null;
    };

    // Find content value
    let contentParts = afterChoices.split(#text contentMarker);
    var afterContent = "";
    var secondPart = false;
    for (part in contentParts) {
      if (not secondPart) {
        secondPart := true;
      } else if (afterContent == "") {
        afterContent := part;
      };
    };

    if (afterContent == "") {
      return null;
    };

    // Extract until closing quote (unescaped)
    var value = "";
    var prevBackslash = false;
    var done = false;
    for (c in afterContent.chars()) {
      if (done) {
        // skip rest
      } else if (prevBackslash) {
        if (c == 'n') {
          value := value # "\n";
        } else if (c == 't') {
          value := value # "\t";
        } else if (c == 'r') {
          value := value # "\r";
        } else {
          value := value # Text.fromChar(c);
        };
        prevBackslash := false;
      } else if (c == '\\') {
        prevBackslash := true;
      } else if (c == '\"') {
        done := true;
      } else {
        value := value # Text.fromChar(c);
      };
    };

    if (done) { ?value } else { null };
  };
};
