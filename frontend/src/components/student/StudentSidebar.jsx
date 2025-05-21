import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaWpforms, FaAngleDown, FaAngleUp, FaSignOutAlt, FaCheckCircle } from 'react-icons/fa';

const StudentSidebar = ({ isSidebarOpen }) => {
  const [showForms, setShowForms] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <ul style={{ fontSize: '1.1rem' }}>
        <li>
          <Link to="/dashboard">
            <FaTachometerAlt style={{ marginRight: '10px', fontSize: '20px' }} />
            Dashboard
          </Link>
        </li>

        <li onClick={() => setShowForms(!showForms)} style={{ cursor: 'pointer' }}>
          <FaWpforms style={{ marginRight: '10px', fontSize: '20px' }} />
          Forms
          {showForms ? (
            <FaAngleUp style={{ float: 'right', marginTop: '4px', fontSize: '16px' }} />
          ) : (
            <FaAngleDown style={{ float: 'right', marginTop: '4px', fontSize: '16px' }} />
          )}
          {showForms && (
            <ul className="dropdown" style={{ fontSize: '1rem' }}>
              <li><Link to="/student/forms/health-issue">Health Issue</Link></li>
              <li><Link to="/student/forms/internship">Internships</Link></li>
              <li><Link to="/student/forms/clubs">Clubs</Link></li>
              <li><Link to="/student/forms/idcard">ID Card</Link></li>
            </ul>
          )}
        </li>

        <li onClick={() => setShowStatus(!showStatus)} style={{ cursor: 'pointer' }}>
          <FaCheckCircle style={{ marginRight: '10px', fontSize: '20px' }} />
          Status
          {showStatus ? (
            <FaAngleUp style={{ float: 'right', marginTop: '4px', fontSize: '16px' }} />
          ) : (
            <FaAngleDown style={{ float: 'right', marginTop: '4px', fontSize: '16px' }} />
          )}
          {showStatus && (
            <ul className="dropdown" style={{ fontSize: '1rem' }}>
              <li><Link to="/student/status/approved">Approved</Link></li>
              <li><Link to="/student/status/rejected">Rejected</Link></li>
              <li><Link to="/student/status/sent">Sent</Link></li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/logout">
            <FaSignOutAlt style={{ marginRight: '10px', fontSize: '20px' }} />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default StudentSidebar