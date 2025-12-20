import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { differenceInMinutes } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { enUS } from 'date-fns/locale';

const ContestCard = ({ contest, onToggle, onSyncToggle }) => {
  const [timeUntil, setTimeUntil] = useState('');
  const [loading, setLoading] = useState(false);

  const platformClass = contest.platform.toLowerCase().replace(/\s+/g, '');
  
  // Platform colors for inline style if needed, or use class names
  const accentColor = {
    codeforces: '#e11d48',
    codechef: '#8b5cf6',
    leetcode: '#fbbf24'
  }[platformClass] || '#fff';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const startTime = new Date(contest.startTime);
      const diff = startTime - now;
      
      if (diff < 0) {
        setTimeUntil('Started');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) setTimeUntil(`in ${days}d ${hours}h`);
      else if (hours > 0) setTimeUntil(`in ${hours}h ${minutes}m`);
      else setTimeUntil(`in ${minutes}m`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [contest.startTime]);

  const startTimeDate = new Date(contest.startTime);
  const formattedDate = new Intl.DateTimeFormat('default', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(startTimeDate);
  const istTime = formatInTimeZone(startTimeDate, 'Asia/Kolkata', 'h:mm a', { locale: enUS });

  const formatDuration = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m > 0 ? m + 'm' : ''}`;
  };

  const handleToggle = async () => {
    setLoading(true);
    try {
      const newStatus = !contest.isWatched;
      await axios.put(`/api/contests/${contest.id}/watch`, { isWatched: newStatus });
      onToggle(contest.id, newStatus);
    } catch (error) {
      console.error('Error toggling watch:', error);
      alert('Failed to update reminder settings');
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(12px)',
    border: contest.isWatched ? `1px solid ${accentColor}` : '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: contest.isWatched ? `0 0 15px -5px ${accentColor}` : 'none',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'default'
  };

  const indicatorStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '4px',
    backgroundColor: accentColor
  };

  return (
    <div style={cardStyle} className="contest-card">
      <div style={indicatorStyle}></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: '0.5rem', color: accentColor }}>
          {contest.platform}
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.3 }}>
          {contest.name}
        </div>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#94a3b8' }}>
          <div>📅 {formattedDate}</div>
          <div>⏳ {formatDuration(contest.durationMin)}</div>
          {contest.isRated && <div>⭐ Rated</div>}
        </div>
      </div>
      <div style={{ marginLeft: '1.5rem', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.05)', 
          padding: '0.4rem 0.8rem', 
          borderRadius: '8px', 
          fontSize: '0.875rem', 
          fontWeight: 500,
          marginBottom: '0.5rem'
        }}>
          {timeUntil}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <button 
            onClick={() => onToggle(contest.id, !contest.isWatched)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.2rem',
              opacity: contest.isWatched ? 1 : 0.5,
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#d1d5db'
            }}
            title="Toggle Reminder Notification"
          >
            {contest.isWatched ? '🔔' : '🔕'}
          </button>

          <button
            onClick={() => onSyncToggle(contest.id, !contest.isSynced)}
            style={{
              background: contest.isSynced ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${contest.isSynced ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
              color: contest.isSynced ? '#60a5fa' : '#9ca3af',
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            title={contest.isSynced ? 'Remove from Google Calendar' : 'Add to Google Calendar'}
          >
            {contest.isSynced ? '📅 Synced' : 'Add to Calendar'}
          </button>

          <a 
            href={contest.url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: '#f8fafc', fontSize: '0.875rem', fontWeight: 500, opacity: 0.7, transition: 'opacity 0.2s' }}
            onMouseOver={(e) => e.target.style.opacity = 1}
            onMouseOut={(e) => e.target.style.opacity = 0.7}
          >
            Open &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
