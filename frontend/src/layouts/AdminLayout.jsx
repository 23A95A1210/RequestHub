import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import "../styles/student/StudentLayout.css"
import Adminnav from '../components/admin/Adminnav';
import AdminSidebar from '../components/admin/AdminSidebar';
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Close sidebar when clicking outside (on overlay)
  const handleOverlayClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  // Close sidebar on route change (for better UX on mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-container">
      <Adminnav toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="main-body">
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
        <div
          className={`overlay ${isSidebarOpen ? "visible" : ""}`}
          onClick={handleOverlayClick}
        ></div>
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout