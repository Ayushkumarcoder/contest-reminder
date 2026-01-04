import React from 'react';

const LandingPage = () => {
  const heroStyle = {
    minHeight: 'calc(100vh - 140px)', // Subtract navbar and footer height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
    color: '#fff',
    textAlign: 'center',
    padding: '2rem'
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: 800,
    marginBottom: '1rem',
    background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.02em',
    lineHeight: 1.1
  };

  const descriptionStyle = {
    fontSize: '1.25rem',
    color: '#94a3b8',
    marginBottom: '3rem',
    maxWidth: '600px',
    lineHeight: 1.6
  };

  const buttonStyle = {
    background: '#fff',
    color: '#0f172a',
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: 600,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  };

  return (
    <div style={heroStyle}>
      <h1 style={titleStyle}>
        Never Miss a Contest <br /> Again.
      </h1>
      <p style={descriptionStyle}>
        Sync Codeforces, LeetCode, and CodeChef contests to your Google Calendar. 
        Get Telegram notifications before they start.
      </p>
      
      <a 
        href="/auth/google"
        style={buttonStyle}
        onMouseOver={e => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        }}
        onMouseOut={e => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }}
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="24" height="24" />
        Login with Google
      </a>

      <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem', opacity: 0.5 }}>
        <span>🏆 Codeforces</span>
        <span>🍳 LeetCode</span>
        <span>👨‍🍳 CodeChef</span>
      </div>
    </div>
  );
};

export default LandingPage;
