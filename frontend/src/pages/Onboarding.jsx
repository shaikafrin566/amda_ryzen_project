import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import Button from '../components/Button';
import { Activity, ChevronRight, ChevronLeft } from 'lucide-react';
import './Onboarding.css';

const STEPS = [
  {
    title: "Tell us about yourself",
    subtitle: "This helps us personalize your nutrition plan.",
    fields: [
      { name: 'age', label: 'Age', type: 'number', placeholder: '25' },
      { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
      { name: 'height', label: 'Height (cm)', type: 'number', placeholder: '170' },
      { name: 'weight', label: 'Weight (kg)', type: 'number', placeholder: '65' },
    ]
  },
  {
    title: "Your diet & health goals",
    subtitle: "We'll tailor AI recommendations to your lifestyle.",
    fields: [
      { name: 'dietPreference', label: 'Diet Preference', type: 'select', options: ['No Restriction', 'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Gluten-Free'] },
      { name: 'fitnessGoal', label: 'Fitness Goal', type: 'select', options: ['Fat Loss', 'Muscle Gain', 'Healthy Lifestyle', 'Maintain Weight'] },
      { name: 'budget', label: 'Daily Food Budget', type: 'select', options: ['Low (under ₹200)', 'Medium (₹200-₹500)', 'High (₹500+)'] },
    ]
  },
  {
    title: "Any allergies or restrictions?",
    subtitle: "NutriVibe AI will never suggest foods that harm you.",
    fields: [
      { name: 'allergies', label: 'Allergies (comma-separated)', type: 'text', placeholder: 'e.g. peanuts, dairy, gluten' },
    ]
  }
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { token, login, user } = useAuth();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const currentStep = STEPS[step];

  const handleChange = (e) => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const allergiesArray = formData.allergies 
        ? formData.allergies.split(',').map(a => a.trim()).filter(Boolean)
        : [];
      
      const res = await fetch('http://localhost:5000/api/user/onboarding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, allergies: allergiesArray }),
      });
      const updatedUser = await res.json();
      if (res.ok) {
        login(token, { ...user, profileComplete: true, ...updatedUser });
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="onboarding-page">
      <div className="animated-background">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <div className="onboarding-wrapper">
        <div className="onboarding-logo">
          <Activity size={32} color="var(--accent-cyan)" />
          <span>NutriVibe AI</span>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="step-counter">Step {step + 1} of {STEPS.length}</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <GlassCard className="onboarding-card">
              <h1>{currentStep.title}</h1>
              <p className="onboarding-subtitle">{currentStep.subtitle}</p>

              <div className="onboarding-fields">
                {currentStep.fields.map(field => (
                  field.type === 'select' ? (
                    <div key={field.name} className="input-group">
                      <label className="input-label">{field.label}</label>
                      <select
                        name={field.name}
                        className="input-field"
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                      >
                        <option value="">Select...</option>
                        {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ) : (
                    <Input
                      key={field.name}
                      label={field.label}
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                    />
                  )
                ))}
              </div>

              <div className="onboarding-actions">
                {step > 0 && (
                  <Button variant="secondary" onClick={() => setStep(s => s - 1)}>
                    <ChevronLeft size={18} /> Back
                  </Button>
                )}
                <Button className="next-btn" onClick={handleNext} disabled={loading}>
                  {loading ? 'Saving...' : step < STEPS.length - 1 ? 'Continue' : 'Finish Setup'}
                  {!loading && <ChevronRight size={18} />}
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
