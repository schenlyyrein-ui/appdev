import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import './AdminLogs.css';
import MainNavbar from "../components/MainNavbar";
import AdminSidebar from "../components/AdminSidebar";

const AdminLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');

  const systemLogs = [
    {
      id: 1,
      timestamp: '2024-11-18 03:53:00',
      event: 'Login Success',
      user: 'Tomas N.',
      role: 'Admin',
      description: 'Logged into dashboard',
      status: 'success',
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      timestamp: '2024-11-17 22:24:00',
      event: 'Login Failed',
      user: 'Kenzo P.',
      role: 'Customer',
      description: 'Incorrect Password',
      status: 'warning',
      ipAddress: '192.168.1.105'
    },
    {
      id: 3,
      timestamp: '2024-11-17 13:10:00',
      event: 'Verification Approved',
      user: 'Maria D.',
      role: 'Admin',
      description: 'Approved freelancer application',
      status: 'success',
      ipAddress: '192.168.1.100'
    },
    {
      id: 4,
      timestamp: '2024-11-17 09:35:00',
      event: 'Booking Cancel',
      user: 'Schenly B.',
      role: 'Customer',
      description: 'Booking #4821 cancelled',
      status: 'info',
      ipAddress: '192.168.1.110'
    },
    {
      id: 5,
      timestamp: '2024-11-17 06:23:00',
      event: 'System Backup',
      user: 'System',
      role: 'Auto',
      description: 'Backup created successfully',
      status: 'success',
      ipAddress: 'System'
    },
    {
      id: 6,
      timestamp: '2024-11-16 18:45:00',
      event: 'User Created',
      user: 'Bryce B.',
      role: 'Freelancer',
      description: 'New user account created',
      status: 'success',
      ipAddress: '192.168.1.115'
    },
    {
      id: 7,
      timestamp: '2024-11-16 14:20:00',
      event: 'Payment Processed',
      user: 'System',
      role: 'Auto',
      description: 'Payment #5842 processed successfully',
      status: 'success',
      ipAddress: 'System'
    },
    {
      id: 8,
      timestamp: '2024-11-16 11:15:00',
      event: 'Security Alert',
      user: 'System',
      role: 'Auto',
      description: 'Multiple failed login attempts detected',
      status: 'danger',
      ipAddress: '192.168.1.120'
    }
  ];

  const filteredLogs = systemLogs.filter(log =>
    log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.role.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(log =>
    dateFilter ? log.timestamp.includes(dateFilter) : true
  ).filter(log =>
    userFilter ? log.user.toLowerCase().includes(userFilter.toLowerCase()) : true
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      success: { class: 'status-success', label: 'OK' },
      warning: { class: 'status-warning', label: 'Warning' },
      danger: { class: 'status-danger', label: 'Alert' },
      info: { class: 'status-info', label: 'Recorded' }
    };
    
    const config = statusConfig[status] || statusConfig.info;
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  const getRoleBadge = (role) => {
    const roleClass = role === 'Admin' ? 'role-admin' : 
                     role === 'Customer' ? 'role-customer' : 
                     role === 'Freelancer' ? 'role-freelancer' : 'role-auto';
    return <span className={`role-badge ${roleClass}`}>{role}</span>;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateFilter('');
    setUserFilter('');
  };

  return (
    <>
      <MainNavbar />
      <div className="admin-logs-page">
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
                      <h2 className="admin-section-title">System Logs</h2>
                      <p className="admin-section-subtitle">Monitor system activities and events</p>
                    </div>
                    <div className="admin-header-actions">
                      <button className="admin-action-btn">
                        <i className="fa-solid fa-download" />
                      </button>
                      <button className="admin-action-btn">
                        <i className="fa-solid fa-rotate" />
                      </button>
                      <button className="admin-action-btn">
                        <i className="fa-regular fa-bell" />
                        <span className="notification-dot"></span>
                      </button>
                      <div className="admin-user-avatar">
                          <span>AJ</span>
                        </div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* QUICK STATS */}
              <Row className="logs-stats-row">
                <Col md={3}>
                  <Card className="logs-stat-card primary">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon">
                        <i className="fa-solid fa-list" />
                      </div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">{systemLogs.length}</div>
                        <div className="admin-stat-label">Total Logs</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="logs-stat-card success">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon">
                        <i className="fa-solid fa-check" />
                      </div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">
                          {systemLogs.filter(log => log.status === 'success').length}
                        </div>
                        <div className="admin-stat-label">Successful</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="logs-stat-card warning">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon">
                        <i className="fa-solid fa-exclamation" />
                      </div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">
                          {systemLogs.filter(log => log.status === 'warning').length}
                        </div>
                        <div className="admin-stat-label">Warnings</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="logs-stat-card danger">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon">
                        <i className="fa-solid fa-triangle-exclamation" />
                      </div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">
                          {systemLogs.filter(log => log.status === 'danger').length}
                        </div>
                        <div className="admin-stat-label">Alerts</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* SEARCH AND FILTERS */}
              <Row className="logs-controls-row">
                <Col md={4}>
                  <InputGroup className="search-input-group">
                    <InputGroup.Text className="search-icon">
                      <i className="fa-solid fa-magnifying-glass" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </InputGroup>
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="date"
                    placeholder="Filter by Date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="filter-input"
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="text"
                    placeholder="Filter by User"
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="filter-input"
                  />
                </Col>
                <Col md={2} className="text-end">
                  <Button 
                    variant="outline-secondary" 
                    className="clear-filters-btn"
                    onClick={clearFilters}
                  >
                    <i className="fa-solid fa-times" />
                    Clear Filters
                  </Button>
                </Col>
              </Row>

              {/* LOGS TABLE */}
              <Row className="logs-table-row">
                <Col xs={12}>
                  <Card className="logs-table-card">
                    <Card.Body className="table-card-body">
                      <div className="table-responsive">
                        <Table hover className="logs-table">
                          <thead>
                            <tr>
                              <th className="table-header">Timestamp</th>
                              <th className="table-header">Event</th>
                              <th className="table-header">User</th>
                              <th className="table-header">Role</th>
                              <th className="table-header">Description</th>
                              <th className="table-header">Status</th>
                              <th className="table-header">IP Address</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredLogs.map((log) => (
                              <tr key={log.id} className="table-row">
                                <td className="log-timestamp">
                                  {formatTimestamp(log.timestamp)}
                                </td>
                                <td className="log-event">
                                  <div className="event-info">
                                    <i className={`fa-solid ${
                                      log.event.includes('Login') ? 'fa-right-to-bracket' :
                                      log.event.includes('Verification') ? 'fa-id-card' :
                                      log.event.includes('Booking') ? 'fa-calendar' :
                                      log.event.includes('Backup') ? 'fa-database' :
                                      log.event.includes('User') ? 'fa-user-plus' :
                                      log.event.includes('Payment') ? 'fa-credit-card' :
                                      'fa-bell'
                                    }`} />
                                    <span>{log.event}</span>
                                  </div>
                                </td>
                                <td className="log-user">{log.user}</td>
                                <td>{getRoleBadge(log.role)}</td>
                                <td className="log-description">{log.description}</td>
                                <td>{getStatusBadge(log.status)}</td>
                                <td className="log-ip">
                                  <Badge bg="outline-secondary" className="ip-badge">
                                    {log.ipAddress}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                      
                      {filteredLogs.length === 0 && (
                        <div className="no-results">
                          <i className="fa-solid fa-clipboard-list" />
                          <div className="no-results-text">No logs found matching your search</div>
                          <Button 
                            variant="outline-primary" 
                            className="mt-3"
                            onClick={clearFilters}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* PAGINATION */}
              <Row className="logs-pagination-row">
                <Col xs={12}>
                  <div className="pagination-container">
                    <div className="pagination-info">
                      Showing {filteredLogs.length} of {systemLogs.length} logs
                    </div>
                    <div className="pagination-controls">
                      <button className="pagination-btn disabled">
                        <i className="fa-solid fa-chevron-left" />
                      </button>
                      <button className="pagination-btn active">1</button>
                      <button className="pagination-btn">2</button>
                      <button className="pagination-btn">3</button>
                      <button className="pagination-btn">
                        <i className="fa-solid fa-chevron-right" />
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminLogs;