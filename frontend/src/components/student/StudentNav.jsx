import React from 'react'
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StudentNav = ({ toggleSidebar, isSidebarOpen }) => {
    const navigate = useNavigate();
    // const { unreadCount } = useNotification(); // Get unread count from context
  
    return (
      <div className="navbar">
        {/* LEFT SIDE */}
        <div className="navbar-left">
          <div
            className={`hamburger-icon ${isSidebarOpen ? 'open' : ''}`}
            onClick={toggleSidebar}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="student-panel-heading">StudentPanel</div>
        </div>
  
        {/* RIGHT SIDE */}
        <div className="navbar-right">
          {/* Notification Icon with Badge */}
          <div className="notification-icon-wrapper" onClick={() => navigate('/notifications')}>
            <FaBell className="notification-icon" />
            {/* {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )} */}
          </div>
          {/* Profile Icon */}
          <div className="profile-icon" onClick={() => navigate('/profile')}>
            <FaUserCircle />
          </div>
        </div>
      </div>
    );
}

export default StudentNav