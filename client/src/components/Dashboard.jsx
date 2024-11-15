import React, { useState } from 'react';
import { Navbar } from './Nav';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom'; 
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
          <Sidebar /> 
        </div>

        {/* Main Content */}
        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Analytics />
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
