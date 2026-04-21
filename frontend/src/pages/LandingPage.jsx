import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Activity, Zap, Shield, TrendingUp } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="landing-page">
      <div className="animated-background">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <nav className="landing-nav">
        <div className="logo">
          <Activity color="var(--accent-cyan)" size={28} />
          <span>NutriVibe AI</span>
        </div>
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>Login</Button>
      </nav>

      <main className="hero-section">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="hero-badge">
            <Zap size={16} color="var(--accent-purple)" />
            <span>Hackathon Winner 2026</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants}>
            Your Personalized <br/>
            <span className="gradient-text">AI Nutritionist.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="hero-subtitle">
            NutriVibe AI uses contextual intelligence to crush emotional eating, gamify your habits, and build a healthier you. No generic advice. Just pure personalization.
          </motion.p>
          
          <motion.div variants={itemVariants} className="hero-cta">
            <Button className="cta-button" onClick={() => navigate('/dashboard')}>
              Get Started Free
            </Button>
            <Button variant="secondary" onClick={() => navigate('/scan')}>
              Try Food Scan
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="feature-card">
            <Activity className="feature-icon" />
            <h3>Predictive AI</h3>
            <p>Catches emotional eating triggers before they happen.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="feature-card">
            <TrendingUp className="feature-icon" />
            <h3>Gamified Habits</h3>
            <p>Earn streaks, unlock badges, and level up your health.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="feature-card">
            <Shield className="feature-icon" />
            <h3>Safe & Secure</h3>
            <p>Built-in AI guardrails ensuring safe nutritional advice.</p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default LandingPage;
