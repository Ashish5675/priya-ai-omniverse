import Types "../types";
import LlmLib "../lib/llm";
import OutCall "mo:caffeineai-http-outcalls/outcall";

mixin () {
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public func callLLM(
    messages : [Types.ChatMessage],
    apiKey : Text,
    personality : Text
  ) : async Text {
    let fallback = "I am processing your request...";
    if (apiKey == "") {
      return fallback;
    };

    let body = LlmLib.buildRequestBody(messages, personality);
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Authorization"; value = "Bearer " # apiKey },
    ];

    try {
      let response = await OutCall.httpPostRequest(
        "https://api.openai.com/v1/chat/completions",
        headers,
        body,
        transform
      );

      switch (LlmLib.parseContent(response)) {
        case (?content) { content };
        case null { fallback };
      };
    } catch (error) {
      fallback;
    };
  };
};
