// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Dashboard.css';

export const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="menu-icon" onClick={toggleSidebar}>&#9776;</span>
        <span className="navbar-logo">LMS</span>
      </div>
      <div className="navbar-right">
        <span className="icon">🔔</span>
        <div className="profile">
          <img src="../assets/img/logimg.webp" alt="Profile" className="profile-pic" />
          <span className="profile-name">User</span>
        </div>
      </div>
    </div>
  );
};
