import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import StudentNav from '../components/student/StudentNav';
import "../styles/student/StudentLayout.css"
import StudentSidebar from '../components/student/StudentSidebar';
const StudentLayout = () => {
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
      <StudentNav toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="main-body">
        <StudentSidebar isSidebarOpen={isSidebarOpen} />
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

export default StudentLayout