import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import './AdminVerification.css';
import MainNavbar from "../components/MainNavbar";
import AdminSidebar from "../components/AdminSidebar";

const AdminVerification = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      fullName: 'Bryce Bautista',
      stellarService: 'UI/UX Designer',
      dateOfSubmission: '2024-02-10',
      status: 'pending',
      documents: ['id_card.pdf', 'portfolio.pdf', 'resume.pdf']
    },
    {
      id: 2,
      fullName: 'Tomas Nisay',
      stellarService: 'Content Creator',
      dateOfSubmission: '2024-05-11',
      status: 'pending',
      documents: ['id_card.pdf', 'portfolio.pdf']
    },
    {
      id: 3,
      fullName: 'Kai Alquian',
      stellarService: 'Data Analyst',
      dateOfSubmission: '2024-02-10',
      status: 'pending',
      documents: ['id_card.pdf', 'resume.pdf', 'certifications.pdf']
    },
    {
      id: 4,
      fullName: 'Thea Jones',
      stellarService: 'Graphic Designer',
      dateOfSubmission: '2024-01-11',
      status: 'pending',
      documents: ['id_card.pdf', 'portfolio.pdf']
    },
    {
      id: 5,
      fullName: 'Krizhata Ibi',
      stellarService: 'Project Manager',
      dateOfSubmission: '2024-07-10',
      status: 'pending',
      documents: ['id_card.pdf', 'resume.pdf']
    },
    {
      id: 6,
      fullName: 'Carlos Daniela',
      stellarService: 'Voice Editor',
      dateOfSubmission: '2024-04-11',
      status: 'pending',
      documents: ['id_card.pdf', 'portfolio.pdf', 'samples.pdf']
    },
    {
      id: 7,
      fullName: 'Robert Smith',
      stellarService: 'Digital Marketer',
      dateOfSubmission: '2024-06-11',
      status: 'pending',
      documents: ['id_card.pdf', 'certifications.pdf']
    }
  ]);

  const handleAccept = (applicationId) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: 'accepted' } : app
    ));
  };

  const handleReject = (applicationId) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: 'rejected' } : app
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');

  return (
    <>
      <MainNavbar />
      <div className="admin-verification-page">
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
                      <h2 className="admin-section-title">Freelancer Verification</h2>
                      <p className="admin-section-subtitle">Review and verify freelancer applications</p>
                    </div>
                    <div className="admin-header-actions">
                      <div className="verification-stats">
                        <Badge bg="warning" className="pending-count">
                          {pendingApplications.length} Pending
                        </Badge>
                      </div>
                      <button className="admin-action-btn">
                        <i className="fa-solid fa-download" />
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
              <Row className="verification-stats-row">
                <Col md={3}>
                  <Card className="verification-stat-card primary">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon">
                        <i className="fa-solid fa-users" />
                      </div>
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
                      <div className="stat-icon">
                        <i className="fa-solid fa-clock" />
                      </div>
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
                      <div className="stat-icon">
                        <i className="fa-solid fa-check" />
                      </div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">
                          {applications.filter(app => app.status === 'accepted').length}
                        </div>
                        <div className="admin-stat-label">Approved</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="verification-stat-card danger">
                    <Card.Body className="stat-card-body">
                      <div className="stat-icon">
                        <i className="fa-solid fa-times" />
                      </div>
                      <div className="admin-stat-content">
                        <div className="admin-stat-value">
                          {applications.filter(app => app.status === 'rejected').length}
                        </div>
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
                        <div className="admin-card-title">
                          Pending Applications ({pendingApplications.length})
                        </div>
                        <div className="filter-options">
                          <select className="form-select filter-select">
                            <option>Sort by: Newest First</option>
                            <option>Sort by: Oldest First</option>
                            <option>Sort by: Name A-Z</option>
                          </select>
                        </div>
                      </div>

                      <div className="applications-list">
                        {pendingApplications.map((application) => (
                          <div key={application.id} className="application-item">
                            <div className="application-main-info">
                              <div className="application-avatar">
                                <span>
                                  {application.fullName.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="application-details">
                                <div className="applicant-name">{application.fullName}</div>
                                <div className="stellar-service">
                                  <i className="fa-solid fa-briefcase" />
                                  <span>{application.stellarService}</span>
                                </div>
                                <div className="submission-date">
                                  <i className="fa-regular fa-calendar" />
                                  <span>Submitted: {formatDate(application.dateOfSubmission)}</span>
                                </div>
                                <div className="application-documents">
                                  <i className="fa-solid fa-file" />
                                  <span>{application.documents.length} documents attached</span>
                                </div>
                              </div>
                            </div>

                            <div className="application-actions">
                              <Button 
                                variant="success" 
                                className="accept-btn"
                                onClick={() => handleAccept(application.id)}
                              >
                                <i className="fa-solid fa-check" />
                                Accept
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                className="reject-btn"
                                onClick={() => handleReject(application.id)}
                              >
                                <i className="fa-solid fa-times" />
                                Reject
                              </Button>
                              <Button 
                                variant="outline-primary" 
                                className="view-btn"
                              >
                                <i className="fa-regular fa-eye" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}

                        {pendingApplications.length === 0 && (
                          <div className="no-applications">
                            <i className="fa-solid fa-clipboard-check" />
                            <div className="no-applications-text">
                              No pending applications to review
                            </div>
                            <p className="no-applications-subtext">
                              All applications have been processed.
                            </p>
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* RECENTLY PROCESSED */}
              <Row className="verification-processed-row">
                <Col xs={12}>
                  <Card className="processed-card">
                    <Card.Body className="processed-card-body">
                      <div className="admin-card-title">Recently Processed</div>
                      <div className="processed-list">
                        {applications
                          .filter(app => app.status !== 'pending')
                          .slice(0, 3)
                          .map((application) => (
                            <div key={application.id} className="processed-item">
                              <div className="processed-avatar">
                                <span>
                                  {application.fullName.split(' ').map(n => n[0]).join('')}
                                </span>
                                <div className={`status-indicator ${application.status}`}>
                                  <i className={`fa-solid ${
                                    application.status === 'accepted' ? 'fa-check' : 'fa-times'
                                  }`} />
                                </div>
                              </div>
                              <div className="processed-details">
                                <div className="processed-name">{application.fullName}</div>
                                <div className="processed-service">{application.stellarService}</div>
                                <div className="processed-date">
                                  {formatDate(application.dateOfSubmission)}
                                </div>
                              </div>
                              <div className={`processed-status ${application.status}`}>
                                {application.status === 'accepted' ? 'Approved' : 'Rejected'}
                              </div>
                            </div>
                          ))}
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

export default AdminVerification;