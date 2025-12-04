import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MainSidebarFreelance.css';

const MainSidebarFreelance = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: 'dashboard', icon: 'fa-solid fa-gauge-high', label: 'Dashboard', path: '/freelance-dashboard' },
    { key: 'profile', icon: 'fa-regular fa-user', label: 'Profile', path: '/freelance/profile' },
    { key: 'bookings', icon: 'fa-solid fa-calendar-check', label: 'My Bookings', path: '/freelance/bookings' },
    { key: 'history', icon: 'fa-solid fa-clock-rotate-left', label: 'History', path: '/freelance/history' },
    { key: 'notifications', icon: 'fa-regular fa-bell', label: 'Notifications', path: '/freelance/notifications' }
  ];

  const getActiveMenu = () => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find(item => item.path === currentPath);
    return activeItem ? activeItem.key : 'dashboard';
  };

  const handleMenuClick = (item) => {
    navigate(item.path);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    
    // Clear user data from localStorage/sessionStorage if needed
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userData');
    
    // Redirect to login page or homepage
    navigate('/');
  };

  return (
    <div className="freelance-sidebar">
      <div className="freelance-sidebar-header">
        <div className="freelance-avatar-circle">
          <span className="freelance-avatar-initials">AJ</span>
        </div>
        <div className="freelance-avatar-text">
          <div className="freelance-avatar-name">Adrian Julian</div>
          <div className="freelance-avatar-role">Web Designer</div>
        </div>
      </div>

      <nav className="freelance-sidebar-menu">
        {menuItems.map((item) => (
          <button 
            key={item.key}
            className={`freelance-menu-item ${getActiveMenu() === item.key ? 'active' : ''}`}
            onClick={() => handleMenuClick(item)}
          >
            <i className={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="freelance-logout-section">
        <button 
          className="freelance-logout-btn"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-arrow-right-from-bracket" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default MainSidebarFreelance;