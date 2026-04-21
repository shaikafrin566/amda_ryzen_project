import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import Button from '../components/Button';
import { Activity } from 'lucide-react';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      login(data.token, data.user);
      navigate('/onboarding');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="animated-background">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="auth-wrapper"
      >
        <div className="auth-logo">
          <Activity size={36} color="var(--accent-cyan)" />
          <span>NutriVibe AI</span>
        </div>

        <GlassCard className="auth-card">
          <h1>Create Account</h1>
          <p className="auth-subtitle">Your AI nutrition journey starts here</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <Input label="Full Name" id="name" name="name" type="text" placeholder="Alex Johnson" value={form.name} onChange={handleChange} required />
            <Input label="Email" id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            <Input label="Password" id="password" name="password" type="password" placeholder="Min 6 characters" value={form.password} onChange={handleChange} required />
            {error && <p className="auth-error">{error}</p>}
            <Button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Get Started Free'}
            </Button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Signup;
