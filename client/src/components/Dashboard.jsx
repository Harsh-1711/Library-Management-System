import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom'; // Outlet will render the nested route components
import '../assets/css/Dashboard.css';
import Analytics from './Analytics';


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="dashboard-container">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? '' : 'closed'}`}>
          <Sidebar /> {/* Sidebar should contain links for navigation */}
        </div>

        {/* Main Content */}
        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Analytics />
          <Outlet /> {/* This will render the active route component */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
