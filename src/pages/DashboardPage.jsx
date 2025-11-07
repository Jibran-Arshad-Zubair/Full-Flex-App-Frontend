import React, { useState } from 'react';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import MainContent from '../components/dashboard/MainContent';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
  <Sidebar isOpen={sidebarOpen} />
  {/* Outlet will render nested dashboard routes (index -> MainContent, /about -> AboutPage, etc.) */}
  <Outlet />
    </div>
  );
};

export default Dashboard;