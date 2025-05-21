import React, { useState } from 'react';
import {
  FaTachometerAlt,
  FaUserCheck,
  FaClipboardList,
  FaHistory,
  FaCheck,
  FaTimes,
  FaUserClock,
  FaSignOutAlt,
  FaAngleUp,
  FaAngleDown
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ isSidebarOpen }) => {
  const [showRequests, setShowRequests] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <h2 className="sidebar_text">Faculty Panel</h2>
      <ul style={{ fontSize: '1.1rem' }}>
        <li>
          <Link to="/admin/dashboard">
            <FaTachometerAlt style={{ marginRight: '10px', fontSize: '20px' }} />
            Dashboard
          </Link>
        </li>

        <li onClick={() => setShowRequests(!showRequests)} style={{ cursor: 'pointer' }}>
          <FaClipboardList style={{ marginRight: '10px', fontSize: '20px' }} />
          Requests
          {showRequests ? (
            <FaAngleUp style={{ float: 'right', marginTop: '4px', fontSize: '16px' }} />
          ) : (
            <FaAngleDown style={{ float: 'right', marginTop: '4px', fontSize: '16px' }} />
          )}
          {showRequests && (
            <ul className="dropdown" style={{ fontSize: '1rem' }}>
              <li><Link to="/admin/requests/current">Current Requests</Link></li>
              <li><Link to="/admin/requests/pending">Pending</Link></li>
              <li><Link to="/admin/requests/approved">Approved</Link></li>
              <li><Link to="/admin/requests/rejected">Rejected</Link></li>
            </ul>
          )}
        </li>

        <li onClick={() => setShowHistory(!showHistory)} style={{ cursor: 'pointer' }}>
          <FaHistory style={{ marginRight: '10px', fontSize: '20px' }} />
          History
          {showHistory ? (
            <FaAngleUp style={{ float: 'right', marginTop: '4px', fontSize: '16px' }} />
          ) : (
            <FaAngleDown style={{ float: 'right', marginTop: '4px', fontSize: '16px' }} />
          )}
          {showHistory && (
            <ul className="dropdown" style={{ fontSize: '1rem' }}>
              <li><Link to="/admin/history/violations">Violation History</Link></li>
              <li><Link to="/admin/history/students">Student History</Link></li>
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

export default AdminSidebar;
