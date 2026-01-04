import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Contest Reminder. All rights reserved.
          </p>
          <div className="footer-links">
            <Link to="/privacy-policy" className="footer-link">
              Privacy Policy
            </Link>
            <span className="footer-divider">•</span>
            <Link to="/terms-of-service" className="footer-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
