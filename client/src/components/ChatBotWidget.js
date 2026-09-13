import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import botIcon from "../assets/img/bot.png";
import userIcon from "../assets/img/user.png";
import "./ChatBotWidget.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "";

const INITIAL_MESSAGE = {
  from: "bot",
  text: "Bonjour 👋 ! Je suis l'assistant AI de ce portfolio. Posez-moi une question.",
};

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/chat`, { message: trimmed });
      setMessages((prev) => [...prev, { from: "bot", text: res.data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Désolé, une erreur est survenue. Veuillez réessayer." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-widget">
      <button
        className="chatbot-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fermer le chatbot" : "Ouvrir le chatbot"}
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="chatbot-panel">
          <div className="chatbot-header">Assistant AI</div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.from}`}>
                <img
                  src={msg.from === "bot" ? botIcon : userIcon}
                  alt=""
                  className="chatbot-avatar"
                />
                <span className="chatbot-bubble">{msg.text}</span>
              </div>
            ))}
            {loading && (
              <div className="chatbot-message bot">
                <img src={botIcon} alt="" className="chatbot-avatar" />
                <span className="chatbot-bubble chatbot-typing">...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input-row" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre question..."
              aria-label="Votre message"
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Envoyer">
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
