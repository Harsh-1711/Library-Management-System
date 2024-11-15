import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Dashboard.css';

export const Sidebar = ({ setActivePage }) => { 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/Dashboard">Dashboard</Link>
        </li>
        <li className="dropdown-header" onClick={toggleDropdown}>
          <span className="dropdown-toggle">
            <span>Books</span>
            <span className={`dropdown-icon ${dropdownOpen ? 'open' : ''}`}>
              {dropdownOpen ? '▲' : '▼'}
            </span>
          </span>
        </li>
        {dropdownOpen && (
          <ul className="dropdown">
            <li>
              <Link to="/AddBook" onClick={() => setActivePage('AddBook')}>Add New Book</Link>
            </li>
            <li>
              <Link to="/ManageBook" onClick={() => setActivePage('ManageBook')}>Manage Books</Link>
            </li>
          </ul>
        )}
        <li><Link to="/members" onClick={() => setActivePage('Members')}>Members</Link></li>
        <li><Link to="/reports" onClick={() => setActivePage('Reports')}>Reports</Link></li>
        <li><Link to="/settings" onClick={() => setActivePage('Settings')}>Settings</Link></li>
        <li><Link to="/logout" onClick={() => setActivePage('Logout')}>Logout</Link></li>
      </ul>
    </div>
  );
};
