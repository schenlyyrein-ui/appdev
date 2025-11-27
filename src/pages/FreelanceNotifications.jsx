// FreelanceNotifications.jsx
import React, { useState } from 'react';
import MainSidebarFreelance from '../components/MainSidebarFreelance';
import MainNavbar from '../components/MainNavbar';
import './FreelanceNotifications.css';

const FreelanceNotifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'rescheduled',
      title: 'Kenzo P. has rescheduled their booking',
      message: 'Booking has been moved to a new time slot',
      time: '2 hours ago',
      read: false,
      icon: 'fas fa-calendar-exchange',
      color: 'warning'
    },
    {
      id: 2,
      type: 'cancelled',
      title: 'Schenly B. has cancelled their booking',
      message: 'Booking was cancelled by the client',
      time: '5 hours ago',
      read: false,
      icon: 'fas fa-calendar-times',
      color: 'danger'
    },
    {
      id: 3,
      type: 'new_booking',
      title: 'Tomas has booked you from Nov 19 - Dec 1',
      message: 'New booking request received',
      time: '1 day ago',
      read: true,
      icon: 'fas fa-calendar-plus',
      color: 'success'
    },
    {
      id: 4,
      type: 'verification',
      title: 'Your account has been verified',
      message: 'Account verification completed successfully',
      time: '2 days ago',
      read: true,
      icon: 'fas fa-badge-check',
      color: 'info'
    },
    {
      id: 5,
      type: 'system',
      title: 'Weekly performance report',
      message: 'Your weekly analytics report is ready',
      time: '3 days ago',
      read: true,
      icon: 'fas fa-chart-line',
      color: 'primary'
    }
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredNotifications = activeFilter === 'all'
    ? notifications
    : notifications.filter(notif => !notif.read);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const getNotificationColor = (color) => {
    switch (color) {
      case 'primary': return '#667eea';
      case 'success': return '#4ecdc4';
      case 'warning': return '#f093fb';
      case 'danger': return '#fd746c';
      case 'info': return '#764ba2';
      default: return '#667eea';
    }
  };

  return (
    <div className="freelance-notifications">
      <MainNavbar />
      <div className="freelance-notifications-layout">
        <MainSidebarFreelance />
        <div className="freelance-notifications-main-content">
          <div className="freelance-notifications-header">
            <div className="freelance-header-left">
              <h1 className="freelance-notifications-title">
                <i className="fas fa-bell"></i> Notifications
              </h1>
              <div className="freelance-notifications-subtitle">
                Stay updated with your booking activities
              </div>
            </div>
            <div className="freelance-header-right">
              <div className="freelance-unread-badge">
                <span className="freelance-badge-count">{unreadCount}</span>
                Unread Notifications
              </div>
            </div>
          </div>

          <div className="freelance-notifications-actions">
            <div className="freelance-filter-tabs">
              <button
                className={`freelance-filter-tab ${activeFilter === 'all' ? 'freelance-active' : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                <i className="fas fa-layer-group"></i>
                All Notifications
              </button>
              <button
                className={`freelance-filter-tab ${activeFilter === 'unread' ? 'freelance-active' : ''}`}
                onClick={() => handleFilterChange('unread')}
              >
                <i className="fas fa-envelope"></i>
                Unread Only
                {unreadCount > 0 && <span className="freelance-tab-badge">{unreadCount}</span>}
              </button>
            </div>
            <button
              className="freelance-btn-mark-all"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              <i className="fas fa-check-double"></i>
              Mark All as Read
            </button>
          </div>

          <div className="freelance-notifications-container">
            <div className="freelance-notifications-section">
              <div className="freelance-section-header">
                <h3 className="freelance-section-title">
                  <i className="fas fa-bolt"></i>
                  Today
                </h3>
                <div className="freelance-section-line"></div>
              </div>
             
              <div className="freelance-notifications-list">
                {filteredNotifications.filter(notif => notif.time.includes('hour') || notif.time.includes('hours')).map(notification => (
                  <div
                    key={notification.id}
                    className={`freelance-notification-card ${notification.read ? 'freelance-read' : 'freelance-unread'} freelance-${notification.color}`}
                  >
                    <div className="freelance-notification-icon" style={{ backgroundColor: getNotificationColor(notification.color) }}>
                      <i className={notification.icon}></i>
                    </div>
                    <div className="freelance-notification-content">
                      <div className="freelance-notification-header">
                        <h4 className="freelance-notification-title">{notification.title}</h4>
                        {!notification.read && <div className="freelance-unread-dot"></div>}
                      </div>
                      <p className="freelance-notification-message">{notification.message}</p>
                      <div className="freelance-notification-footer">
                        <span className="freelance-notification-time">
                          <i className="fas fa-clock"></i>
                          {notification.time}
                        </span>
                        {!notification.read && (
                          <button
                            className="freelance-btn-mark-read"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <i className="fas fa-check"></i>
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="freelance-notifications-section">
              <div className="freelance-section-header">
                <h3 className="freelance-section-title">
                  <i className="fas fa-calendar-day"></i>
                  Earlier
                </h3>
                <div className="freelance-section-line"></div>
              </div>
             
              <div className="freelance-notifications-list">
                {filteredNotifications.filter(notif => !notif.time.includes('hour') && !notif.time.includes('hours')).map(notification => (
                  <div
                    key={notification.id}
                    className={`freelance-notification-card ${notification.read ? 'freelance-read' : 'freelance-unread'} freelance-${notification.color}`}
                  >
                    <div className="freelance-notification-icon" style={{ backgroundColor: getNotificationColor(notification.color) }}>
                      <i className={notification.icon}></i>
                    </div>
                    <div className="freelance-notification-content">
                      <div className="freelance-notification-header">
                        <h4 className="freelance-notification-title">{notification.title}</h4>
                        {!notification.read && <div className="freelance-unread-dot"></div>}
                      </div>
                      <p className="freelance-notification-message">{notification.message}</p>
                      <div className="freelance-notification-footer">
                        <span className="freelance-notification-time">
                          <i className="fas fa-clock"></i>
                          {notification.time}
                        </span>
                        {!notification.read && (
                          <button
                            className="freelance-btn-mark-read"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <i className="fas fa-check"></i>
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filteredNotifications.length === 0 && (
              <div className="freelance-empty-notifications">
                <div className="freelance-empty-icon">
                  <i className="fas fa-bell-slash"></i>
                </div>
                <h3>No Notifications</h3>
                <p>You're all caught up! New notifications will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelanceNotifications;