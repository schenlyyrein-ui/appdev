import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import './AdminNotification.css';
import MainNavbar from "../components/MainNavbar";
import AdminSidebar from "../components/AdminSidebar";

const AdminNotification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'system',
      title: 'System Backup Completed',
      message: 'Daily system backup was completed successfully at 02:00 AM.',
      timestamp: '2024-11-18 02:00:00',
      read: false,
      priority: 'low'
    },
    {
      id: 2,
      type: 'security',
      title: 'Unusual Login Activity',
      message: 'Multiple failed login attempts detected from IP 192.168.1.105',
      timestamp: '2024-11-18 01:30:00',
      read: false,
      priority: 'high'
    },
    {
      id: 3,
      type: 'user',
      title: 'New User Registration',
      message: 'Bryce Bautista has registered as a freelancer. Verification required.',
      timestamp: '2024-11-17 22:15:00',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'booking',
      title: 'Booking Cancellation',
      message: 'Carlos Gambol cancelled booking #4821. Reason: Schedule conflict.',
      timestamp: '2024-11-17 20:45:00',
      read: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment Processed',
      message: 'Payment of $250.00 for booking #4815 was processed successfully.',
      timestamp: '2024-11-17 18:30:00',
      read: true,
      priority: 'low'
    },
    {
      id: 6,
      type: 'system',
      title: 'Database Maintenance',
      message: 'Scheduled database maintenance will occur tonight at 11:00 PM.',
      timestamp: '2024-11-17 16:00:00',
      read: true,
      priority: 'medium'
    },
    {
      id: 7,
      type: 'verification',
      title: 'Freelancer Application',
      message: 'Tomas Nisay submitted a freelancer application for review.',
      timestamp: '2024-11-17 14:20:00',
      read: true,
      priority: 'high'
    },
    {
      id: 8,
      type: 'security',
      title: 'Password Reset',
      message: 'Kenzo Pagsibigan requested a password reset.',
      timestamp: '2024-11-17 12:15:00',
      read: true,
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter notifications based on current filter and search term
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.type === filter;
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    const icons = {
      system: 'fa-solid fa-server',
      security: 'fa-solid fa-shield-halved',
      user: 'fa-solid fa-user-plus',
      booking: 'fa-solid fa-calendar',
      payment: 'fa-solid fa-credit-card',
      verification: 'fa-solid fa-id-card'
    };
    return icons[type] || 'fa-solid fa-bell';
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { class: 'priority-high', label: 'High' },
      medium: { class: 'priority-medium', label: 'Medium' },
      low: { class: 'priority-low', label: 'Low' }
    };
    
    const config = priorityConfig[priority] || priorityConfig.low;
    return <span className={`priority-badge ${config.class}`}>{config.label}</span>;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <MainNavbar />
      <div className="admin-notification-page">
        <Container fluid>
          <Row>
            {/* LEFT SIDEBAR */}
            <AdminSidebar />

            {/* MAIN CONTENT */}
            <Col xs={12} md={9} className="admin-main">
              {/* HEADER */}
              <Row className="admin-header-row">
                <Col xs={12}>
                  <div className="admin-header">
                    <div>
                      <h2 className="admin-section-title">Notifications</h2>
                      <p className="admin-section-subtitle">Manage and review system notifications</p>
                    </div>
                    <div className="admin-header-actions">
                      <Badge bg="warning" className="unread-count">
                        {unreadCount} Unread
                      </Badge>
                      <button className="admin-action-btn">
                        <i className="fa-solid fa-gear" />
                      </button>
                      <button className="admin-action-btn">
                        <i className="fa-regular fa-bell" />
                      </button>
                      <div className="admin-user-avatar">
                          <span>AJ</span>
                        </div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* QUICK ACTIONS */}
              <Row className="notification-actions-row">
                <Col xs={12}>
                  <Card className="actions-card">
                    <Card.Body className="actions-card-body">
                      <div className="actions-buttons">
                        <Button 
                          variant="primary" 
                          className="action-btn"
                          onClick={markAllAsRead}
                          disabled={unreadCount === 0}
                        >
                          <i className="fa-solid fa-check-double" />
                          Mark All as Read
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          className="action-btn"
                          onClick={clearAllNotifications}
                          disabled={notifications.length === 0}
                        >
                          <i className="fa-solid fa-trash" />
                          Clear All
                        </Button>
                        <Button variant="outline-secondary" className="action-btn">
                          <i className="fa-solid fa-download" />
                          Export
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* FILTERS AND SEARCH */}
              <Row className="notification-filters-row">
                <Col md={6}>
                  <InputGroup className="search-input-group">
                    <InputGroup.Text className="search-icon">
                      <i className="fa-solid fa-magnifying-glass" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <div className="filter-buttons">
                    <Button 
                      variant={filter === 'all' ? 'primary' : 'outline-secondary'}
                      className="filter-btn"
                      onClick={() => setFilter('all')}
                    >
                      All
                    </Button>
                    <Button 
                      variant={filter === 'system' ? 'primary' : 'outline-secondary'}
                      className="filter-btn"
                      onClick={() => setFilter('system')}
                    >
                      System
                    </Button>
                    <Button 
                      variant={filter === 'security' ? 'primary' : 'outline-secondary'}
                      className="filter-btn"
                      onClick={() => setFilter('security')}
                    >
                      Security
                    </Button>
                    <Button 
                      variant={filter === 'user' ? 'primary' : 'outline-secondary'}
                      className="filter-btn"
                      onClick={() => setFilter('user')}
                    >
                      Users
                    </Button>
                  </div>
                </Col>
              </Row>

              {/* NOTIFICATIONS LIST */}
              <Row className="notification-list-row">
                <Col xs={12}>
                  <Card className="notifications-card">
                    <Card.Body className="notifications-card-body">
                      <div className="notifications-header">
                        <div className="notifications-title">
                          Notifications ({filteredNotifications.length})
                        </div>
                        <div className="notifications-sort">
                          <Form.Select size="sm" className="sort-select">
                            <option>Newest First</option>
                            <option>Oldest First</option>
                            <option>Priority</option>
                          </Form.Select>
                        </div>
                      </div>

                      <div className="notifications-list">
                        {filteredNotifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                          >
                            <div className="notification-icon">
                              <i className={getNotificationIcon(notification.type)} />
                            </div>
                            <div className="notification-content">
                              <div className="notification-header">
                                <div className="notification-title">
                                  {notification.title}
                                  {!notification.read && <span className="unread-dot"></span>}
                                </div>
                                <div className="notification-time">
                                  {formatTimestamp(notification.timestamp)}
                                </div>
                              </div>
                              <div className="notification-message">
                                {notification.message}
                              </div>
                              <div className="notification-footer">
                                {getPriorityBadge(notification.priority)}
                                <span className="notification-type">
                                  {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                                </span>
                              </div>
                            </div>
                            <div className="notification-actions">
                              {!notification.read && (
                                <Button 
                                  variant="outline-success" 
                                  size="sm"
                                  className="action-btn-sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <i className="fa-solid fa-check" />
                                </Button>
                              )}
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                className="action-btn-sm"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <i className="fa-solid fa-trash" />
                              </Button>
                            </div>
                          </div>
                        ))}

                        {filteredNotifications.length === 0 && (
                          <div className="no-notifications">
                            <i className="fa-regular fa-bell-slash" />
                            <div className="no-notifications-text">
                              No notifications found
                            </div>
                            <p className="no-notifications-subtext">
                              {searchTerm || filter !== 'all' 
                                ? 'Try adjusting your search or filters' 
                                : 'All caught up! No new notifications.'
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminNotification;