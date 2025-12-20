import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Check auth status
  useEffect(() => {
    axios.get('/auth/me')
      .then(res => {
        if (res.data.authenticated) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(err => {
        console.error('Auth check failed', err);
        setUser(null);
      })
      .finally(() => setAuthLoading(false));
  }, []);

  if (authLoading) {
    return <div style={{ 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      color: '#94a3b8', 
      background: '#0f172a' 
    }}>Loading app...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" /> : <LandingPage />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard user={user} /> : <Navigate to="/" />} 
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
