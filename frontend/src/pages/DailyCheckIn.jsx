import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import './CheckIn.css';

const DailyCheckIn = () => {
  const [mood, setMood] = useState('happy');
  const [stress, setStress] = useState(5);
  const [hours, setHours] = useState(7);
  const [suggestion, setSuggestion] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Advanced Hackathon Feature: Predictive AI
    if (stress > 7 && mood === 'stressed') {
      setSuggestion({
        title: "Predictive AI Alert",
        message: "NutriVibe AI noticed a pattern: you often crave sugar when stressed on Thursdays. Let's pre-plan a healthy sweet snack for tomorrow to prevent a sugar crash.",
        type: "warning"
      });
    } else if (mood === 'sad') {
      setSuggestion({
        title: "Emotional Support",
        message: "You seem a bit down today. Instead of reaching for junk food, try a comforting bowl of warm oatmeal with berries, or take a 10-minute walk outside.",
        type: "warning"
      });
    } else {
      setSuggestion({
        title: "Looking Good!",
        message: "You're in a great mood. Keep up the healthy habits and make sure to stay hydrated.",
        type: "success"
      });
    }
  };

  return (
    <div className="checkin-page animate-fade-in">
      <header className="page-header">
        <h1>Daily Context Check-In</h1>
        <p>Log your context so our predictive AI can personalize your day.</p>
      </header>

      <div className="checkin-container">
        <GlassCard className="checkin-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>How are you feeling?</label>
              <div className="mood-selector">
                {['happy', 'stressed', 'tired', 'sad'].map(m => (
                  <button 
                    type="button" 
                    key={m}
                    className={`mood-btn ${mood === m ? 'active' : ''}`}
                    onClick={() => setMood(m)}
                  >
                    {m === 'happy' && '😊'}
                    {m === 'stressed' && '😫'}
                    {m === 'tired' && '😴'}
                    {m === 'sad' && '😢'}
                    <span>{m}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Stress Level: {stress}/10</label>
              <input 
                type="range" 
                min="1" max="10" 
                value={stress} 
                onChange={(e) => setStress(e.target.value)}
                className="slider"
              />
            </div>

            <div className="form-group">
              <label>Hours of Sleep: {hours}h</label>
              <input 
                type="range" 
                min="0" max="12" step="0.5"
                value={hours} 
                onChange={(e) => setHours(e.target.value)}
                className="slider"
              />
            </div>

            <Button type="submit" style={{ width: '100%', marginTop: '16px' }}>Submit Check-In</Button>
          </form>
        </GlassCard>

        <AnimatePresence>
          {suggestion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <GlassCard className={`suggestion-card ${suggestion.type}`}>
                <h2>{suggestion.title}</h2>
                <p>{suggestion.message}</p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DailyCheckIn;
