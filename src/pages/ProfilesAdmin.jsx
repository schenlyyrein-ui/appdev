import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Table, Form, InputGroup, Button, Modal
} from 'react-bootstrap';
import axios from 'axios'; 
import './ProfilesAdmin.css';
import MainNavbar from "../components/MainNavbar";
import AdminSidebar from "../components/AdminSidebar";


const ProfilesAdmin = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterValues, setFilterValues] = useState({ role: '', status: '' });
  const [activeFilters, setActiveFilters] = useState({ role: '', status: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    name: '', email: '', role: 'Freelancer', password: '', status: 'Active'
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(''); 
  const [showActionModal, setShowActionModal] = useState(false);
  const [editUserData, setEditUserData] = useState({});

useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('/api/admin/users', {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });

        // -----------------------------------------------------------
        // FIX: Map Database columns to Frontend properties
        // -----------------------------------------------------------
        const formattedUsers = response.data.map(user => ({
          id: user.user_id,                  // Map 'user_id' -> 'id'
          name: user.fullname,               // Map 'fullname' -> 'name'
          email: user.email,                 // Matches
          role: user.role,                   // Matches
          status: user.is_active === 1 ? 'Active' : 'Offline', // Map 1/0 -> 'Active'/'Offline'
          joinDate: user.created_at          // Map 'created_at' -> 'joinDate'
        }));

        setUsers(formattedUsers); 
        setLoading(false);

      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
        if (error.response && error.response.status === 401) {
            // Optional: Handle session expiry
            console.log("Session expired");
        }
      }
    };

    fetchUsers();
  }, []);

  // FILTER LOGIC
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.role?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.status?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    const matchesRole = activeFilters.role 
      ? user.role.toLowerCase() === activeFilters.role.toLowerCase() 
      : true; // If no role filter selected, match all

    const matchesStatus = activeFilters.status 
      ? user.status.toLowerCase() === activeFilters.status.toLowerCase() 
      : true; // If no status filter selected, match all

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const displayStatus = status === 'Active' ? 'Active' : 'Offline';
    const statusClass = displayStatus === 'Active' ? 'status-active' : 'status-offline';
    return <span className={`status-badge ${statusClass}`}>{displayStatus}</span>;
  };

  const getRoleBadge = (role) => {
    // Normalize role case just to be safe
    const r = role ? role.toLowerCase() : 'freelancer';
    const roleClass = r === 'admin' ? 'role-admin' : r === 'freelancer' ? 'role-freelancer' : 'role-client';
    // Capitalize first letter for display
    const displayRole = r.charAt(0).toUpperCase() + r.slice(1);
    return <span className={`role-badge ${roleClass}`}>{displayRole}</span>;
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setActionType('view');
    setShowActionModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditUserData({ ...user });
    setActionType('edit');
    setShowActionModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setActionType('delete');
    setShowActionModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUserData({ ...editUserData, [name]: value });
  };

  // Handle Filter Inputs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  // Handle "Apply Filters" (Form Submission)
  const applyFilters = () => {
    setActiveFilters(filterValues); // Save the selected filters as "Active"
    setShowFilterModal(false);      // Close modal
    showNotification('Filters applied successfully!');
  };

  // Reset Filters
  const clearFilters = () => {
    setFilterValues({ role: '', status: '' });
    setActiveFilters({ role: '', status: '' });
    setShowFilterModal(false);
    showNotification('Filters cleared.');
  };

  // ---------------------------------------------------------
  // 2. UPDATE: Update Role (Matches adminController.js updateUserRole)
  // ---------------------------------------------------------
  const handleSaveEdit = async () => {
    try {
      // 1. Get the token
      const token = localStorage.getItem("token"); 

      // 2. Send the request WITH the token in the headers
      await axios.patch(`/api/admin/users/${selectedUser.id}/profile`, {
        fullname: editUserData.name,
        email: editUserData.email,
        role: editUserData.role.toLowerCase()
      }, {
        headers: {
          Authorization: `Bearer ${token}` // <--- THIS WAS MISSING
        }
      });

      // Update UI Locally
      setUsers(users.map(u => 
        u.id === selectedUser.id ? { 
          ...u, 
          name: editUserData.name,
          email: editUserData.email,
          role: editUserData.role 
        } : u
      ));
      
      setShowActionModal(false);
      showNotification('User profile updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response && error.response.status === 409) {
        showNotification('Email is already in use.', 'error');
      } else if (error.response && error.response.status === 401) {
        showNotification('Session expired. Please login again.', 'error');
      } else {
        showNotification('Failed to update user.', 'error');
      }
    }
  };

  // ---------------------------------------------------------
  // 3. DELETE (Soft Delete): Matches adminRoutes.js DELETE method
  // ---------------------------------------------------------
  const confirmDeleteUser = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token

      await axios.delete(`/api/admin/users/${selectedUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Add header
        }
      });
      
      // Update UI (Soft delete -> Offline)
      setUsers(users.map(u => 
        u.id === selectedUser.id ? { ...u, status: 'Offline' } : u
      ));

      setShowActionModal(false);
      showNotification('User deactivated successfully!');
    } catch (error) {
      console.error('Error deactivating user:', error);
      showNotification('Failed to deactivate user.', 'error');
    }
  };

  // Handle adding new user (CONNECTED TO DB)
  const handleAddUser = async () => {
    try {
      console.log('Adding new user:', newUser);

 
      const response = await axios.post('/api/auth/signup', {
        fullname: newUser.name, 
        email: newUser.email,
        password: newUser.password,
        role: newUser.role.toLowerCase() 
      });
      
      const createdUser = {
        id: response.data.user.user_id,
        name: response.data.user.fullname,
        email: response.data.user.email,
        role: response.data.user.role,
        status: 'Active', 
        joinDate: new Date().toISOString() 
      };
      
      setUsers([...users, createdUser]);
      
      setNewUser({
        name: '',
        email: '',
        role: 'Freelancer',
        password: '',
        status: 'Active'
      });
      setShowAddModal(false);
      
      showNotification('New user added to database successfully!');
      
    } catch (error) {
      console.error('Error adding user:', error);
      if (error.response && error.response.status === 409) {
        showNotification('Email is already in use.', 'error');
      } else {
        showNotification('Failed to add user. Please try again.', 'error');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Notification function (Unchanged)
  const showNotification = (message, type = 'success') => {
    const existingNotifications = document.querySelectorAll('.prfle-notification');
    existingNotifications.forEach(notification => {
      if (document.body.contains(notification)) document.body.removeChild(notification);
    });

    const notification = document.createElement('div');
    notification.className = `prfle-notification ${type}`;
    notification.innerHTML = `
      <div class="prfle-notification-content">
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
        <span>${message}</span>
      </div>
      <button class="prfle-notification-close">×</button>
    `;
    document.body.appendChild(notification);
    setTimeout(() => { notification.classList.add('show'); }, 10);
    const closeBtn = notification.querySelector('.prfle-notification-close');
    closeBtn.onclick = () => {
      notification.classList.remove('show');
      setTimeout(() => { if (document.body.contains(notification)) document.body.removeChild(notification); }, 300);
    };
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.classList.remove('show');
        setTimeout(() => { if (document.body.contains(notification)) document.body.removeChild(notification); }, 300);
      }
    }, 4000);
  };

  return (
    <>
      <MainNavbar />
      <div className="profiles-admin-page">
        <Container fluid>
          <Row>
            <AdminSidebar />
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
                      <button className="admin-action-btn"><i className="fa-solid fa-download" /></button>
                      <button className="admin-action-btn"><i className="fa-regular fa-bell" /><span className="notification-dot"></span></button>
                      <div className="admin-user-menu"><div className="admin-user-avatar"><span>AJ</span></div></div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* QUICK STATS */}
              <Row className="profiles-stats-row">
                <Col md={3}>
                  <Card className="profile-stat-card primary">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon"><i className="fa-solid fa-users" /></div>
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
                      <div className="stat-icon"><i className="fa-solid fa-user-check" /></div>
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
                      <div className="stat-icon"><i className="fa-solid fa-id-card" /></div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">{users.filter(u => u.role === 'freelancer' || u.role === 'Freelancer').length}</div>
                        <div className="admin-stat-label">Freelancers</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="profile-stat-card warning">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon"><i className="fa-solid fa-user-clock" /></div>
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
                    <InputGroup.Text className="search-icon"><i className="fa-solid fa-magnifying-glass" /></InputGroup.Text>
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
                    <Button 
                        variant="outline-secondary" 
                        className="filter-btn"
                        onClick={() => setShowFilterModal(true)} // 👈 Add this line
                      >
                        <i className="fa-solid fa-filter" />
                        <span>Filter</span>
                    </Button> 
                    <Button variant="primary" className="add-user-btn" onClick={() => setShowAddModal(true)}>
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
                            {loading ? (
                              <tr><td colSpan="6" className="text-center p-5">Loading users...</td></tr>
                            ) : filteredUsers.map((user) => (
                              <tr key={user.id} className="table-row">
                                <td className="user-name">
                                  <div className="user-avatar">
                                    <span>{user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : '??'}</span>
                                  </div>
                                  <div className="user-info">
                                    <div className="user-display-name">{user.name}</div>
                                  </div>
                                </td>
                                <td className="user-email">{user.email}</td>
                                <td>{getRoleBadge(user.role)}</td>
                                <td>{getStatusBadge(user.status)}</td>
                                <td className="join-date">{user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}</td>
                                <td className="text-center">
                                  <div className="action-buttons">
                                    <button className="action-btn view-btn" onClick={() => handleViewUser(user)}><i className="fa-regular fa-eye" /></button>
                                    <button className="action-btn edit-btn" onClick={() => handleEditUser(user)}><i className="fa-regular fa-pen-to-square" /></button>
                                    <button className="action-btn delete-btn" onClick={() => handleDeleteUser(user)}><i className="fa-regular fa-trash-can" /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                      {!loading && filteredUsers.length === 0 && (
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
                    <div className="pagination-info">Showing {filteredUsers.length} of {users.length} users</div>
                    <div className="pagination-controls">
                      <button className="pagination-btn disabled"><i className="fa-solid fa-chevron-left" /></button>
                      <button className="pagination-btn active">1</button>
                      <button className="pagination-btn">2</button>
                      <button className="pagination-btn">3</button>
                      <button className="pagination-btn"><i className="fa-solid fa-chevron-right" /></button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ADD USER MODAL */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Add New User</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="name" value={newUser.name} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" name="email" value={newUser.email} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={newUser.role} onChange={handleInputChange}>
                <option value="Freelancer">Freelancer</option>
                <option value="Admin">Admin</option>
                <option value="Client">Client</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={newUser.password} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={newUser.status} onChange={handleInputChange}>
                <option value="Active">Active</option>
                <option value="Offline">Offline</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddUser}>Add User</Button>
        </Modal.Footer>
      </Modal>

      {/* ACTION MODAL */}
      <Modal show={showActionModal} onHide={() => setShowActionModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {actionType === 'view' ? 'User Profile' : actionType === 'edit' ? 'Edit User' : 'Delete User'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              {actionType === 'view' && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div className="prfle-user-avatar-large"><span>{selectedUser.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}</span></div>
                  </div>
                  <div>
                    <h5 style={{ textAlign: 'center', color: '#2d3748', marginBottom: '16px' }}>{selectedUser.name}</h5>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Role:</strong> {getRoleBadge(selectedUser.role)}</p>
                    <p><strong>Status:</strong> {getStatusBadge(selectedUser.status)}</p>
                    <p><strong>Join Date:</strong> {selectedUser.joinDate ? new Date(selectedUser.joinDate).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              )}
              
              {actionType === 'edit' && (
                <Form>
                  {/* 1. FULL NAME: Removed 'disabled', added onChange */}
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name" 
                      value={editUserData.name || ''} 
                      onChange={handleEditChange} // 👈 Crucial: allows typing
                      // disabled <--- Removed this
                    />
                  </Form.Group>

                  {/* 2. EMAIL: Removed 'disabled', added onChange */}
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email" 
                      value={editUserData.email || ''} 
                      onChange={handleEditChange} // 👈 Crucial: allows typing
                      // disabled <--- Removed this
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select name="role" value={editUserData.role || ''} onChange={handleEditChange}>
                      <option value="freelancer">Freelancer</option>
                      <option value="admin">Admin</option>
                      <option value="client">Client</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Status (Managed via Delete/Reactivate)</Form.Label>
                    <Form.Control type="text" value={editUserData.status || ''} disabled />
                  </Form.Group>
                </Form>
              )}
              
              {actionType === 'delete' && (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div className="prfle-warning-icon"><i className="fa-solid fa-triangle-exclamation"></i></div>
                  <p>Are you sure you want to deactivate <strong>{selectedUser.name}</strong>?</p>
                  <p className="prfle-text-muted">You can reactivate them later if needed.</p>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowActionModal(false)}>{actionType === 'delete' ? 'Cancel' : 'Close'}</Button>
          {actionType === 'edit' && <Button variant="primary" onClick={handleSaveEdit}>Save Role</Button>}
          {actionType === 'delete' && <Button variant="danger" onClick={confirmDeleteUser}>Deactivate User</Button>}
        </Modal.Footer>
      </Modal>

       {/* 👇 PASTE THIS NEW BLOCK HERE 👇 */}
      {/* 3rd FORM: FILTER MODAL */}
      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Filter by Role</Form.Label>
              <Form.Select 
                name="role" 
                value={filterValues.role} 
                onChange={handleFilterChange}
              >
                <option value="">All Roles</option>
                <option value="freelancer">Freelancer</option>
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Filter by Status</Form.Label>
              <Form.Select 
                name="status" 
                value={filterValues.status} 
                onChange={handleFilterChange}
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Offline">Offline</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={clearFilters}>
            Clear Filters
          </Button>
          <Button variant="primary" onClick={applyFilters}>
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>  
    </>
  );
};

export default ProfilesAdmin;