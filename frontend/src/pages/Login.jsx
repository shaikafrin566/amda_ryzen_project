import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import Button from '../components/Button';
import { Activity } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      login(data.token, data.user);
      navigate(data.user.profileComplete ? '/dashboard' : '/onboarding');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
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
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Log in to your AI nutritionist</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <Input label="Email" id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            <Input label="Password" id="password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
            {error && <p className="auth-error">{error}</p>}
            <Button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </GlassCard>

        <p className="auth-demo-hint">Demo: use any email & password to create account first.</p>
      </motion.div>
    </div>
  );
};

export default Login;
