import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Contest Reminder
        </Link>
        
        <div className="navbar-auth">
          {user ? (
            <a href="/auth/logout" className="navbar-button logout">
              Logout
            </a>
          ) : (
            <a href="/auth/google" className="navbar-button login">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
