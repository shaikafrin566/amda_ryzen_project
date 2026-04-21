import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Activity } from 'lucide-react';
import './App.css';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DailyCheckIn from './pages/DailyCheckIn';
import FoodScanner from './pages/FoodScanner';

// Create a component to conditionally render the navbar
const AppContent = () => {
  const location = useLocation();
  const showNav = location.pathname !== '/';

  return (
    <div className="app-container">
      <main className="main-content">
        {showNav && (
          <header className="app-header animate-fade-in">
            <div className="logo">
              <Activity color="var(--accent-cyan)" size={32} />
              NutriVibe AI
            </div>
            <nav className="nav-links">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/check-in" className="nav-link">Check-In</Link>
              <Link to="/scan" className="nav-link">Scanner</Link>
            </nav>
          </header>
        )}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/check-in" element={<DailyCheckIn />} />
          <Route path="/scan" element={<FoodScanner />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
