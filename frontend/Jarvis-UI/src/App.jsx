import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async (voicePrompt = null) => {
    try {
      stopSpeech(); 
      setLoading(true); 
      setResponse("");

      let promptToSend = voicePrompt || text;

      // Prevent event objects from being used
      if (typeof promptToSend !== "string") {
        promptToSend = text;
      }

      if (!promptToSend.trim()) {
        setLoading(false);
        return;
      }

      const res = await axios.post("http://127.0.0.1:8000/ask", {
        prompt: promptToSend,
      });

      setResponse(res.data.response);
      speak(res.data.response);

      setText(""); 
      setLoading(false);
    } catch (error) {
      console.error(error);
      setResponse("VoiceGPT failed to respond.");
      setLoading(false);

    }
  };

  const speak = (message) => {
    if (!message) return;

    window.speechSynthesis.cancel(); // clear any queued speech

    const speech = new SpeechSynthesisUtterance(message);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
  };
  
  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  const startListening = () => {
    stopSpeech();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript;
      setText(speech);
      askAI(speech) //passing speech as argument to askAI
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Voice recognition ended");
    };

    recognition.start();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <div style={{ textAlign: "center", width: "100%" }}>
        <h1>VoiceGPT AI Voice Assistant</h1>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask VoiceGPT..."
          onKeyDown={(e) => {
          if (e.key === "Enter") { 
            askAI();
          }
          }}
        />

        <br />
        <br />

        <button onClick={() => askAI()}>Ask AI</button>

        <button onClick={() => startListening()} style={{ marginLeft: "10px" }}>
          🎤 Speak
        </button>

        <button onClick={()=>stopSpeech()} style={{ marginLeft: "10px" }}>
          ⏹ Stop
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
            width: "100%",
          }}
        >
          {loading && <h3>🤖 VoiceGPT is thinking...</h3>}

          {!loading && response && (
            <div
              style={{
                maxWidth: "700px",
                background: "#f4f4f4",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              {response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
