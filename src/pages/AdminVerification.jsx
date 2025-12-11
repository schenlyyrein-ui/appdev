// src/pages/AdminVerification.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap'; // 👈 Added Modal
import axios from 'axios';
import './AdminVerification.css';
import MainNavbar from "../components/MainNavbar";
import AdminSidebar from "../components/AdminSidebar";

const AdminVerification = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. NEW: State for the Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/verifications', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const mappedData = response.data.map(app => ({
        id: app.id,
        fullName: app.full_name,
        email: app.email, // Added email for the modal
        stellarService: app.skills_services || 'N/A',
        dateOfSubmission: app.created_at,
        status: app.status,
        documents: app.resume_file_path ? [app.resume_file_path] : [] 
      }));

      setApplications(mappedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setLoading(false);
    }
  };

  const handleAccept = async (applicationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/freelancer/${applicationId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status: 'approved' } : app
      ));
      setShowModal(false); // Close modal if open
      alert("Freelancer approved successfully!");
    } catch (error) {
      console.error("Error approving freelancer:", error);
      alert("Failed to approve.");
    }
  };

  const handleReject = async (applicationId) => {
    if (!window.confirm("Are you sure you want to reject this application?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/admin/freelancer/${applicationId}/verify`, 
        { status: 'rejected' }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status: 'rejected' } : app
      ));
      setShowModal(false); // Close modal if open
    } catch (error) {
      console.error("Error rejecting freelancer:", error);
      alert("Failed to reject.");
    }
  };

  // 2. NEW: Function to open the modal
  const handleViewDetails = (application) => {
    setSelectedApp(application);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedCount = applications.filter(app => app.status === 'approved' || app.status === 'accepted').length;
  const rejectedCount = applications.filter(app => app.status === 'rejected').length;

  return (
    <>
      <MainNavbar />
      <div className="admin-verification-page">
        <Container fluid>
          <Row>
            <AdminSidebar />
            <Col xs={12} md={9} className="admin-main">
              {/* HEADER (Unchanged) */}
              <Row className="admin-header-row">
                <Col xs={12}>
                  <div className="admin-header">
                    <div>
                      <h2 className="admin-section-title">Freelancer Verification</h2>
                      <p className="admin-section-subtitle">Review and verify freelancer applications</p>
                    </div>
                    <div className="admin-header-actions">
                      <div className="verification-stats">
                        <Badge bg="warning" className="pending-count">{pendingApplications.length} Pending</Badge>
                      </div>
                      <div className="admin-user-avatar"><span>AJ</span></div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* STATS (Unchanged) */}
              <Row className="verification-stats-row">
                 {/* ... (Keep your stats cards code exactly as is) ... */}
                 <Col md={3}>
                  <Card className="verification-stat-card primary">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon"><i className="fa-solid fa-users" /></div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">{applications.length}</div>
                        <div className="admin-stat-label">Total Applications</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="verification-stat-card warning">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon"><i className="fa-solid fa-clock" /></div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">{pendingApplications.length}</div>
                        <div className="admin-stat-label">Pending Review</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="verification-stat-card success">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon"><i className="fa-solid fa-check" /></div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">{approvedCount}</div>
                        <div className="admin-stat-label">Approved</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="verification-stat-card danger">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon"><i className="fa-solid fa-times" /></div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">{rejectedCount}</div>
                        <div className="admin-stat-label">Rejected</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* APPLICATIONS LIST */}
              <Row className="verification-applications-row">
                <Col xs={12}>
                  <Card className="applications-card">
                    <Card.Body className="applications-card-body">
                      <div className="card-header-with-action">
                        <div className="admin-card-title">Pending Applications ({pendingApplications.length})</div>
                      </div>

                      <div className="applications-list">
                        {loading ? (<div className="text-center p-4">Loading applications...</div>) : 
                         pendingApplications.map((application) => (
                          <div key={application.id} className="application-item">
                            <div className="application-main-info">
                              <div className="application-avatar">
                                <span>{application.fullName ? application.fullName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : '??'}</span>
                              </div>
                              <div className="application-details">
                                <div className="applicant-name">{application.fullName}</div>
                                <div className="stellar-service">
                                  <i className="fa-solid fa-briefcase" /> <span>{application.stellarService}</span>
                                </div>
                                <div className="submission-date">
                                  <i className="fa-regular fa-calendar" /> <span>Submitted: {formatDate(application.dateOfSubmission)}</span>
                                </div>
                              </div>
                            </div>

                            <div className="application-actions">
                              <Button variant="success" className="accept-btn" onClick={() => handleAccept(application.id)}>
                                <i className="fa-solid fa-check" /> Accept
                              </Button>
                              <Button variant="outline-danger" className="reject-btn" onClick={() => handleReject(application.id)}>
                                <i className="fa-solid fa-times" /> Reject
                              </Button>
                              {/* 3. ATTACHED ONCLICK HERE 👇 */}
                              <Button variant="outline-primary" className="view-btn" onClick={() => handleViewDetails(application)}>
                                <i className="fa-regular fa-eye" /> View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                        {!loading && pendingApplications.length === 0 && (
                          <div className="no-applications"><div className="no-applications-text">No pending applications to review</div></div>
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

      {/* 4. NEW: DETAILS MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApp && (
            <div className="verification-modal-content">
              <div className="d-flex align-items-center mb-4">
                <div className="application-avatar me-3" style={{width: '60px', height: '60px', fontSize: '1.5rem'}}>
                   <span>{selectedApp.fullName ? selectedApp.fullName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : '??'}</span>
                </div>
                <div>
                  <h4 className="mb-0">{selectedApp.fullName}</h4>
                  <p className="text-muted mb-0">{selectedApp.email}</p>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <h6>Service Offering</h6>
                  <p className="border p-2 rounded bg-light">{selectedApp.stellarService}</p>
                </div>
                <div className="col-md-6">
                  <h6>Submission Date</h6>
                  <p className="border p-2 rounded bg-light">{formatDate(selectedApp.dateOfSubmission)}</p>
                </div>
              </div>

              <h6>Submitted Documents (Resume)</h6>
              {selectedApp.documents && selectedApp.documents.length > 0 ? (
                <div className="document-preview-area border rounded p-3 bg-light text-center">
                   {/* In a real app, you would serve the file from your backend */}
                   <i className="fa-solid fa-file-pdf fa-3x text-danger mb-2"></i>
                   <p className="mb-2">{selectedApp.documents[0].split('\\').pop()}</p>
                   {/* Assuming your backend serves uploads statically */}
                   <a href={`http://localhost:3000/${selectedApp.documents[0]}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                     Download / View Resume
                   </a>
                </div>
              ) : (
                <p className="text-muted fst-italic">No documents uploaded.</p>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          {selectedApp && selectedApp.status === 'pending' && (
            <>
              <Button variant="danger" onClick={() => handleReject(selectedApp.id)}>Reject</Button>
              <Button variant="success" onClick={() => handleAccept(selectedApp.id)}>Approve</Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminVerification;