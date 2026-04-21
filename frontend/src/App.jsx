import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import DailyCheckIn from './pages/DailyCheckIn';
import FoodScanner from './pages/FoodScanner';
import VoiceAssistant from './pages/VoiceAssistant';
import './App.css';

const FULL_SCREEN_ROUTES = ['/', '/login', '/signup', '/onboarding'];

const AppContent = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isFullScreen = FULL_SCREEN_ROUTES.includes(location.pathname);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 48, height: 48, border: '4px solid rgba(0,240,255,0.2)', borderLeftColor: 'var(--accent-cyan)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  return (
    <div className="app-container">
      {!isFullScreen && user && <Sidebar />}
      <main className={isFullScreen ? 'full-screen' : 'app-main'}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/onboarding" />} />
          <Route path="/onboarding" element={user ? <Onboarding /> : <Navigate to="/login" />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/check-in" element={user ? <DailyCheckIn /> : <Navigate to="/login" />} />
          <Route path="/scan" element={user ? <FoodScanner /> : <Navigate to="/login" />} />
          <Route path="/voice" element={user ? <VoiceAssistant /> : <Navigate to="/login" />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
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
