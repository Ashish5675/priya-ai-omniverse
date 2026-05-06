import "./index-Khuvrpqq.js";
const LANG_CODES = {
  english: "en-US",
  hindi: "hi-IN",
  nagpuri: "hi-IN"
};
let activeRecognition = null;
function startSpeechRecognition(language, onResult, onEnd) {
  if (activeRecognition) {
    activeRecognition.stop();
    activeRecognition = null;
  }
  const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognitionCtor) {
    console.warn("Speech recognition not supported in this browser");
    return () => {
    };
  }
  const recognition = new SpeechRecognitionCtor();
  recognition.lang = LANG_CODES[language];
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.onresult = (event) => {
    for (let i = 0; i < event.results.length; i++) {
      const result = event.results[i];
      const transcript = result[0].transcript;
      onResult(transcript, result.isFinal);
    }
  };
  recognition.onerror = () => {
    activeRecognition = null;
    onEnd == null ? void 0 : onEnd();
  };
  recognition.onend = () => {
    activeRecognition = null;
    onEnd == null ? void 0 : onEnd();
  };
  recognition.start();
  activeRecognition = recognition;
  return () => {
    recognition.stop();
    activeRecognition = null;
  };
}
function speakText(text, language, settings) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = LANG_CODES[language];
  utterance.rate = 1;
  utterance.pitch = 1;
  const finalText = language === "nagpuri" ? `नागपुरी में, ${text}` : text;
  utterance.text = finalText;
  const voices = window.speechSynthesis.getVoices();
  const langCode = LANG_CODES[language];
  const preferredVoice = voices.find((v) => v.lang === langCode && v.localService) || voices.find((v) => v.lang.startsWith(langCode.split("-")[0])) || voices.find(
    (v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")
  ) || voices.find((v) => v.lang.startsWith("en")) || null;
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  window.speechSynthesis.speak(utterance);
}
function stopSpeaking() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
export {
  LANG_CODES as L,
  startSpeechRecognition as a,
  speakText as b,
  stopSpeaking as s
};
