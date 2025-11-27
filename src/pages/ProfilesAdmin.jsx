import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Form, InputGroup, Button } from 'react-bootstrap';
import './ProfilesAdmin.css';
import MainNavbar from "../components/MainNavbar";
import AdminSidebar from "../components/AdminSidebar";

const ProfilesAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: 1, name: 'Bryce Bautista', role: 'Freelancer', status: 'Active', email: 'bryce.b@example.com', joinDate: '2024-01-15' },
    { id: 2, name: 'Schenly Buenaventura', role: 'Freelancer', status: 'Active', email: 'schenly.b@example.com', joinDate: '2024-01-20' },
    { id: 3, name: 'Carlos Gambol', role: 'Freelancer', status: 'Offline', email: 'carlos.g@example.com', joinDate: '2024-02-01' },
    { id: 4, name: 'Kenzo Pagsibigan', role: 'Freelancer', status: 'Active', email: 'kenzo.p@example.com', joinDate: '2024-01-25' },
    { id: 5, name: 'Tomas Nisay', role: 'Freelancer', status: 'Offline', email: 'tomas.n@example.com', joinDate: '2024-02-05' },
    { id: 6, name: 'Adrian Julian', role: 'Admin', status: 'Active', email: 'adrian.j@example.com', joinDate: '2023-12-01' },
    { id: 7, name: 'Maria Santos', role: 'Client', status: 'Active', email: 'maria.s@example.com', joinDate: '2024-01-30' },
    { id: 8, name: 'John Reyes', role: 'Freelancer', status: 'Active', email: 'john.r@example.com', joinDate: '2024-02-10' }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusClass = status === 'Active' ? 'status-active' : 'status-offline';
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  const getRoleBadge = (role) => {
    const roleClass = role === 'Admin' ? 'role-admin' : role === 'Freelancer' ? 'role-freelancer' : 'role-client';
    return <span className={`role-badge ${roleClass}`}>{role}</span>;
  };

  return (
    <>
      <MainNavbar />
      <div className="profiles-admin-page">
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
                      <h2 className="admin-section-title">User Profiles</h2>
                      <p className="admin-section-subtitle">Manage and monitor all user accounts</p>
                    </div>
                    <div className="admin-header-actions">
                      <button className="admin-action-btn">
                        <i className="fa-solid fa-download" />
                      </button>
                      <button className="admin-action-btn">
                        <i className="fa-regular fa-bell" />
                        <span className="notification-dot"></span>
                      </button>
                      <div className="admin-user-menu">
                        <div className="admin-user-avatar">
                          <span>AJ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* QUICK STATS */}
              <Row className="profiles-stats-row">
                <Col md={3}>
                  <Card className="profile-stat-card primary">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon">
                        <i className="fa-solid fa-users" />
                      </div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">{users.length}</div>
                        <div className="admin-stat-label">Total Users</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="profile-stat-card secondary">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon">
                        <i className="fa-solid fa-user-check" />
                      </div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">{users.filter(u => u.status === 'Active').length}</div>
                        <div className="admin-stat-label">Active Users</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="profile-stat-card success">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon">
                        <i className="fa-solid fa-id-card" />
                      </div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">{users.filter(u => u.role === 'Freelancer').length}</div>
                        <div className="admin-stat-label">Freelancers</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="profile-stat-card warning">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon">
                        <i className="fa-solid fa-user-clock" />
                      </div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">{users.filter(u => u.status === 'Offline').length}</div>
                        <div className="admin-stat-label">Offline Users</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* SEARCH AND FILTERS */}
              <Row className="profiles-controls-row">
                <Col md={6}>
                  <InputGroup className="search-input-group">
                    <InputGroup.Text className="search-icon">
                      <i className="fa-solid fa-magnifying-glass" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search users by name, role, or status..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </InputGroup>
                </Col>
                <Col md={6} className="text-end">
                  <div className="filter-buttons">
                    <Button variant="outline-secondary" className="filter-btn">
                      <i className="fa-solid fa-filter" />
                      <span>Filter</span>
                    </Button>
                    <Button variant="primary" className="add-user-btn">
                      <i className="fa-solid fa-plus" />
                      <span>Add User</span>
                    </Button>
                  </div>
                </Col>
              </Row>

              {/* USERS TABLE */}
              <Row className="profiles-table-row">
                <Col xs={12}>
                  <Card className="profiles-table-card">
                    <Card.Body className="table-card-body">
                      <div className="table-responsive">
                        <Table hover className="profiles-table">
                          <thead>
                            <tr>
                              <th className="table-header">Name</th>
                              <th className="table-header">Email</th>
                              <th className="table-header">Role</th>
                              <th className="table-header">Status</th>
                              <th className="table-header">Join Date</th>
                              <th className="table-header text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredUsers.map((user) => (
                              <tr key={user.id} className="table-row">
                                <td className="user-name">
                                  <div className="user-avatar">
                                    <span>{user.name.split(' ').map(n => n[0]).join('')}</span>
                                  </div>
                                  <div className="user-info">
                                    <div className="user-display-name">{user.name}</div>
                                  </div>
                                </td>
                                <td className="user-email">{user.email}</td>
                                <td>{getRoleBadge(user.role)}</td>
                                <td>{getStatusBadge(user.status)}</td>
                                <td className="join-date">{new Date(user.joinDate).toLocaleDateString()}</td>
                                <td className="text-center">
                                  <div className="action-buttons">
                                    <button className="action-btn view-btn" title="View Profile">
                                      <i className="fa-regular fa-eye" />
                                    </button>
                                    <button className="action-btn edit-btn" title="Edit User">
                                      <i className="fa-regular fa-pen-to-square" />
                                    </button>
                                    <button className="action-btn delete-btn" title="Delete User">
                                      <i className="fa-regular fa-trash-can" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                      
                      {filteredUsers.length === 0 && (
                        <div className="no-results">
                          <i className="fa-solid fa-user-slash" />
                          <div className="no-results-text">No users found matching your search</div>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* PAGINATION */}
              <Row className="profiles-pagination-row">
                <Col xs={12}>
                  <div className="pagination-container">
                    <div className="pagination-info">
                      Showing {filteredUsers.length} of {users.length} users
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

export default ProfilesAdmin;