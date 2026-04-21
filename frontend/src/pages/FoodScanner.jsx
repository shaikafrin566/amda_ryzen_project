import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { Camera, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import './FoodScanner.css';

const FoodScanner = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
      scanFood();
    }
  };

  const scanFood = () => {
    setLoading(true);
    setResult(null);
    
    // Mock AI Scan Delay
    setTimeout(() => {
      fetch('http://localhost:5000/api/ai/scan', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          setResult(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 2000);
  };

  return (
    <div className="scanner-page animate-fade-in">
      <header className="page-header">
        <h1>Food Scan AI</h1>
        <p>Snap a photo to instantly analyze nutritional value and get healthier alternatives.</p>
      </header>

      <div className="scanner-container">
        <GlassCard className="upload-section">
          {!image ? (
            <div className="upload-placeholder">
              <Camera size={64} color="var(--text-secondary)" />
              <h3>Upload a Food Image</h3>
              <p>Supports JPG, PNG, HEIC</p>
              <div className="upload-actions">
                <input 
                  type="file" 
                  id="file-upload" 
                  accept="image/*" 
                  onChange={handleUpload} 
                  style={{ display: 'none' }}
                />
                <Button onClick={() => document.getElementById('file-upload').click()}>
                  <Upload size={18} style={{ marginRight: 8 }} /> Choose File
                </Button>
              </div>
            </div>
          ) : (
            <div className="image-preview">
              <img src={image} alt="Food to scan" />
              <Button variant="secondary" onClick={() => { setImage(null); setResult(null); }}>
                Scan Another
              </Button>
            </div>
          )}
        </GlassCard>

        <div className="results-section">
          {loading && (
            <div className="loading-state animate-fade-in">
              <div className="spinner"></div>
              <p>NutriVibe AI is analyzing your food...</p>
            </div>
          )}

          {result && (
            <GlassCard className="scan-result animate-fade-in">
              <div className="result-header">
                <h2>{result.food}</h2>
                <div className={`status-badge ${result.status.toLowerCase()}`}>
                  {result.status === 'Healthy' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  {result.status}
                </div>
              </div>

              <div className="result-details">
                <div className="detail-item">
                  <span className="label">Estimated Calories</span>
                  <span className="value">{result.calories} kcal</span>
                </div>
              </div>

              <div className="alternative-box">
                <h4>Healthier Alternative</h4>
                <p>{result.healthierAlternative}</p>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodScanner;
