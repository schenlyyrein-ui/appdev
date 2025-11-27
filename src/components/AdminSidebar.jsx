import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: 'overview', icon: 'fa-solid fa-gauge-high', label: 'Overview', path: '/admin' },
    { key: 'profiles', icon: 'fa-regular fa-user', label: 'Profiles', path: '/admin/profiles' },
    { key: 'verification', icon: 'fa-solid fa-id-card', label: 'Freelancer Verification', path: '/admin/verification', badge: 37 },
    { key: 'logs', icon: 'fa-solid fa-file-lines', label: 'System Logs', path: '/admin/logs' },
    { key: 'notifications', icon: 'fa-regular fa-bell', label: 'Notifications', path: '/admin/notifications', badge: 8 },
    { key: 'settings', icon: 'fa-solid fa-gear', label: 'Settings', path: '/admin/settings' }
  ];

  const getActiveMenu = () => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find(item => item.path === currentPath);
    return activeItem ? activeItem.key : 'overview';
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
    navigate('/admin-login');
  };

  return (
    <div className="admin-sidebar d-none d-md-flex flex-column">
      <div className="admin-sidebar-header">
        <div className="admin-avatar-circle">
          <span className="admin-avatar-initials">AJ</span>
        </div>
        <div className="admin-avatar-text">
          <div className="admin-avatar-name">Adrian Julian</div>
          <div className="admin-avatar-role">Administrator</div>
        </div>
      </div>

      <nav className="admin-sidebar-menu">
        {menuItems.map((item) => (
          <button 
            key={item.key}
            className={`admin-menu-item ${getActiveMenu() === item.key ? 'active' : ''}`}
            onClick={() => handleMenuClick(item.path)}
          >
            <i className={item.icon} />
            <span>{item.label}</span>
            {item.badge && (
              <span className="menu-badge">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <button className="admin-logout-btn" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;