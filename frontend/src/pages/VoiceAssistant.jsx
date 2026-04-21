import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { Mic, MicOff, Send, Bot, User } from 'lucide-react';
import './VoiceAssistant.css';

const QUICK_PROMPTS = [
  "What should I eat now?",
  "Healthy snacks under ₹100",
  "Meal plan for weight loss",
  "How much water should I drink?",
  "Best breakfast options",
];

const VoiceAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm your NutriVibe AI voice coach. Ask me anything about nutrition, meals, or healthy snacking! 🥗" }
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const query = text || input.trim();
    if (!query) return;

    setMessages(m => [...m, { role: 'user', text: query }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: 'ai', text: data.reply }]);

      // Text-to-Speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(data.reply);
        utterance.rate = 0.95;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    } catch {
      setMessages(m => [...m, { role: 'ai', text: 'Sorry, I had trouble connecting. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  return (
    <div className="voice-page">
      <header className="page-header">
        <h1>Voice AI Assistant</h1>
        <p>Ask about meals, nutrition, or healthy habits — by voice or text.</p>
      </header>

      <div className="voice-container">
        <GlassCard className="chat-card">
          <div className="chat-messages" ref={chatRef}>
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chat-message ${msg.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="msg-avatar">
                    {msg.role === 'ai' ? <Bot size={18} /> : <User size={18} />}
                  </div>
                  <div className="msg-bubble">{msg.text}</div>
                </motion.div>
              ))}
              {loading && (
                <motion.div className="chat-message ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="msg-avatar"><Bot size={18} /></div>
                  <div className="msg-bubble typing"><span /><span /><span /></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="quick-prompts">
            {QUICK_PROMPTS.map(p => (
              <button key={p} className="quick-prompt-btn" onClick={() => sendMessage(p)}>{p}</button>
            ))}
          </div>

          <div className="chat-input-area">
            <input
              className="chat-input"
              placeholder="Ask me anything about food & health..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button
              className={`voice-btn ${listening ? 'active' : ''}`}
              onClick={toggleVoice}
              title={listening ? 'Stop listening' : 'Start voice input'}
            >
              {listening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button className="send-btn" onClick={() => sendMessage()}>
              <Send size={20} />
            </button>
          </div>
        </GlassCard>

        <div className="voice-features">
          <GlassCard className="feature-info">
            <h3>🎙️ Voice Features</h3>
            <ul>
              <li>Click the mic button to speak</li>
              <li>AI responds with text & voice</li>
              <li>Supports English (India)</li>
              <li>Works on Chrome & Edge</li>
            </ul>
          </GlassCard>
          <GlassCard className="guardrail-card">
            <h3>🛡️ AI Safety Guardrails</h3>
            <p>NutriVibe AI will never suggest starvation diets, extreme calorie cuts, or harmful advice. All responses follow safe nutrition guidelines.</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
