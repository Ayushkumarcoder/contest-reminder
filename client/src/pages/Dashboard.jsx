import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContestCard from '../components/ContestCard';

function Dashboard({ user }) {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [telegramStatus, setTelegramStatus] = useState({ connected: false, loading: true });

  const fetchContests = async () => {
    try {
      const response = await axios.get('/api/contests/upcoming');
      setContests(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch contests');
      setLoading(false);
    }
  };

  const checkTelegramStatus = async () => {
    try {
      const res = await axios.get('/api/telegram/status');
      setTelegramStatus({ connected: res.data.connected, loading: false });
    } catch (err) {
      console.error('Failed to check telegram status', err);
      setTelegramStatus({ connected: false, loading: false });
    }
  };

  useEffect(() => {
    fetchContests();
    checkTelegramStatus();
  }, []);

  const handleWatchAll = async () => {
    try {
      await axios.put('/api/contests/watch-all');
      fetchContests();
    } catch (err) {
      console.error(err);
      alert('Failed to subscribe to all');
    }
  };

  const handleToggle = (id, newStatus) => {
    setContests(prev => prev.map(c => c.id === id ? { ...c, isWatched: newStatus } : c));
  };

  const handleSyncToggle = async (id, shouldSync) => {
    // Optimistic Update
    setContests(prev => prev.map(c => c.id === id ? { ...c, isSynced: shouldSync } : c));

    try {
      if (shouldSync) {
        await axios.post(`/calendar/sync/${id}`);
      } else {
        await axios.delete(`/calendar/sync/${id}`);
      }
    } catch (err) {
      console.error('Sync toggle failed', err);
      alert('Failed to update calendar sync');
      // Revert optimism
      setContests(prev => prev.map(c => c.id === id ? { ...c, isSynced: !shouldSync } : c));
    }
  };

  const handleCalendarSync = async () => {
    setSyncing(true);
    try {
      const res = await axios.post('/calendar/sync');
      alert(`Sync Complete! ${res.data.results.filter(r => r.status === 'success').length} events added.`);
      fetchContests(); // Refresh to show synced status
    } catch (err) {
      console.error(err);
      alert('Sync failed. Please try again.');
    } finally {
      setSyncing(false);
    }
  };

  const handleConnectTelegram = async () => {
    try {
      const res = await axios.get('/api/telegram/link');
      window.open(res.data.link, '_blank');
    } catch (err) {
      console.error('Failed to get telegram link', err);
      alert('Could not generate Telegram link.');
    }
  };
  
  const buttonStyle = (bg, color) => ({
    background: bg,
    // border: 1px solid ${bg} - Removed duplicate
    color: color,
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.2s',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  });

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 700, 
          letterSpacing: '-0.05em', 
          marginBottom: '0.5rem',
          background: 'linear-gradient(to right, #fff, #94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Dashboard
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Welcome back, {user?.name || 'User'}
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          
          <button 
            onClick={handleWatchAll}
            style={buttonStyle('rgba(255, 255, 255, 0.1)', '#fff')}
          >
            🔔 Subscribe All
          </button>
          
          <button
            onClick={handleCalendarSync}
            disabled={syncing}
            style={buttonStyle('rgba(59, 130, 246, 0.2)', '#60a5fa')}
          >
            {syncing ? 'Syncing...' : '📅 Sync All'}
          </button>

          <button
            onClick={handleConnectTelegram}
            disabled={telegramStatus.connected}
            style={buttonStyle(
              telegramStatus.connected ? 'rgba(34, 197, 94, 0.2)' : 'rgba(56, 189, 248, 0.2)', 
              telegramStatus.connected ? '#4ade80' : '#38bdf8'
            )}
          >
            {telegramStatus.connected ? '✅ Telegram Linked' : '✈️ Connect Telegram'}
          </button>
              
          <a
            href="/auth/logout"
            style={{
              ...buttonStyle('rgba(239, 68, 68, 0.2)', '#f87171'),
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            🚪 Logout
          </a>

        </div>
      </header>

      <main>
        {loading && <div style={{ textAlign: 'center', color: '#94a3b8' }}>Loading contests...</div>}
        {error && <div style={{ textAlign: 'center', color: '#ef4444' }}>{error}</div>}
        
        {!loading && !error && contests.length === 0 && (
          <div style={{ textAlign: 'center', color: '#94a3b8' }}>No upcoming contests found.</div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0rem' }}>
          {contests.map(contest => (
            <ContestCard 
              key={contest.id} 
              contest={contest} 
              onToggle={handleToggle} 
              onSyncToggle={handleSyncToggle}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
