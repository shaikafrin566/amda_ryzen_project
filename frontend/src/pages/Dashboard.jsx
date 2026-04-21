import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { Flame, Droplets, Apple, ArrowRight, Award, Trophy, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const data = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 70 },
  { name: 'Wed', score: 68 },
  { name: 'Thu', score: 80 },
  { name: 'Fri', score: 85 },
  { name: 'Sat', score: 90 },
  { name: 'Sun', score: 95 },
];

const Dashboard = () => {
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/ai/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile: {}, context: {} })
    })
      .then(res => res.json())
      .then(data => setRecommendation(data))
      .catch(console.error);
  }, []);

  return (
    <div className="dashboard animate-fade-in">
      <header className="dashboard-header">
        <div>
          <h1>Welcome back, Alex</h1>
          <p>Here is your daily health summary.</p>
        </div>
        <div className="health-score">
          <span className="score-value">85</span>
          <span className="score-label">Health Score</span>
        </div>
      </header>

      <div className="dashboard-grid">
        <GlassCard className="stat-card">
          <div className="stat-icon flame"><Flame size={24} /></div>
          <div className="stat-info">
            <h3>7 Day Streak</h3>
            <p>You're on fire! Keep logging meals.</p>
          </div>
        </GlassCard>

        <GlassCard className="stat-card">
          <div className="stat-icon water"><Droplets size={24} /></div>
          <div className="stat-info">
            <h3>1.5L / 2L</h3>
            <p>Water Intake. Stay hydrated!</p>
          </div>
        </GlassCard>

        <GlassCard className="stat-card">
          <div className="stat-icon apple"><Apple size={24} /></div>
          <div className="stat-info">
            <h3>1,200 / 2,000</h3>
            <p>Calories Consumed today.</p>
          </div>
        </GlassCard>
      </div>

      <div className="dashboard-main-sections">
        <div className="left-column">
          <GlassCard className="chart-section" style={{ marginBottom: '24px' }}>
            <h2>Weekly Progress</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <XAxis dataKey="name" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                  <Line type="monotone" dataKey="score" stroke="var(--accent-cyan)" strokeWidth={4} dot={{ r: 5, fill: 'var(--bg-primary)' }} activeDot={{ r: 8, fill: 'var(--accent-purple)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="gamification-section">
            <h2>Achievements & Badges</h2>
            <div className="badges-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '16px' }}>
              <Badge icon={Flame} title="7-Day Streak" description="Logged meals for 7 consecutive days." unlocked={true} />
              <Badge icon={Droplets} title="Hydro Homie" description="Hit water goal 5 days in a row." unlocked={true} />
              <Badge icon={Target} title="Calorie King" description="Stayed under calorie limit." unlocked={false} />
              <Badge icon={Trophy} title="Sugar Free" description="0 junk food logged this week." unlocked={false} />
            </div>
          </GlassCard>
        </div>

        <div className="right-column">
          <GlassCard className="recommendation-section">
            <h2>AI Recommendation</h2>
            {recommendation ? (
              <div className="rec-content">
                <h3>{recommendation.recommendation}</h3>
                <p>{recommendation.reason}</p>
                <div className="rec-details">
                  <span className="badge">{recommendation.calories} kcal</span>
                </div>
                <Button>Log this meal <ArrowRight size={16} style={{ marginLeft: 8 }} /></Button>
              </div>
            ) : (
              <p>Loading your personalized recommendation...</p>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
