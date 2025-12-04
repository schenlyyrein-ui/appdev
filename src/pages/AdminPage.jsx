import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './AdminPage.css';
import MainNavbar from "../components/MainNavbar";
import AdminSidebar from "../components/AdminSidebar";

const AdminPage = () => {
  return (
    <>
      <MainNavbar />
      <div className="admin-page">
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
                    <h2 className="admin-section-title">Administrator Dashboard</h2>
                    <div className="admin-header-actions">
                      <button className="admin-action-btn">
                        <i className="fa-solid fa-magnifying-glass" />
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

              {/* TOP ROW: STATS */}
              <Row className="admin-stats-row">
                <Col md={8}>
                  <Row className="g-2">
                    <Col md={4}>
                      <Card className="admin-stat-card primary">
                        <Card.Body className="stat-card-body">
                          <div className="stat-icon">
                            <i className="fa-solid fa-users" />
                          </div>
                          <div className="admin-stat-content">
                            <div className="admin-stat-value">1,807</div>
                            <div className="admin-stat-label">Total Users</div>
                            <div className="admin-stat-trend positive">
                              <i className="fa-solid fa-arrow-up" />
                              <span>12% from last month</span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="admin-stat-card secondary">
                        <Card.Body className="stat-card-body">
                          <div className="stat-icon">
                            <i className="fa-solid fa-calendar-check" />
                          </div>
                          <div className="admin-stat-content">
                            <div className="admin-stat-value">7,245</div>
                            <div className="admin-stat-label">Active Bookings</div>
                            <div className="admin-stat-trend positive">
                              <i className="fa-solid fa-arrow-up" />
                              <span>18% today</span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="admin-stat-card warning">
                        <Card.Body className="stat-card-body">
                          <div className="stat-icon">
                            <i className="fa-solid fa-user-clock" />
                          </div>
                          <div className="admin-stat-content">
                            <div className="admin-stat-value">37</div>
                            <div className="admin-stat-label">Pending Verifications</div>
                            <div className="admin-stat-trend negative">
                              <i className="fa-solid fa-arrow-up" />
                              <span>3 new today</span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Col>

                <Col md={4}>
                  <Card className="admin-chart-card">
                    <Card.Body className="chart-card-body">
                      <div className="admin-chart-header">
                        <span>User Growth (Last 30 Days)</span>
                      </div>
                      <div className="admin-chart-container">
                        <div className="chart-bars">
                          {[65, 80, 60, 75, 90, 85, 95, 70, 85, 78, 82, 88].map((height, index) => (
                            <div key={index} className="chart-bar" style={{ height: `${height}%` }} />
                          ))}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* MIDDLE ROW: NOTIFICATIONS & TICKETS */}
              <Row className="admin-middle-row">
                <Col md={8}>
                  <Card className="admin-notification-card">
                    <Card.Body className="notification-card-body">
                      <div className="card-header-with-action">
                        <div className="admin-card-title">System Notifications</div>
                        <button className="view-all-btn">View All</button>
                      </div>
                      <div className="admin-notification-list">
                        <div className="admin-notification-item urgent">
                          <div className="admin-notification-icon">
                            <i className="fa-solid fa-chart-line" />
                          </div>
                          <div className="admin-notification-content">
                            <div className="admin-notification-text">
                              High activity detected: Booking Volume +18% today
                            </div>
                            <div className="admin-notification-time">10 minutes ago</div>
                          </div>
                        </div>
                        <div className="admin-notification-item warning">
                          <div className="admin-notification-icon">
                            <i className="fa-solid fa-shield-halved" />
                          </div>
                          <div className="admin-notification-content">
                            <div className="admin-notification-text">
                              2 admin login attempts detected
                            </div>
                            <div className="admin-notification-time">1 hour ago</div>
                          </div>
                        </div>
                        <div className="admin-notification-item info">
                          <div className="admin-notification-icon">
                            <i className="fa-solid fa-database" />
                          </div>
                          <div className="admin-notification-content">
                            <div className="admin-notification-text">
                              System backup completed successfully
                            </div>
                            <div className="admin-notification-time">2 hours ago</div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="admin-tickets-card">
                    <Card.Body className="tickets-card-body">
                      <div className="card-header-with-action">
                        <div className="admin-card-title">Support Tickets</div>
                        <button className="view-all-btn">View All</button>
                      </div>
                      <div className="admin-tickets-list">
                        <div className="admin-ticket-item">
                          <div className="ticket-avatar">
                            <span>SB</span>
                          </div>
                          <div className="ticket-content">
                            <div className="ticket-text">Schenly B. submitted a ticket</div>
                            <div className="ticket-time">Pending • 15 min ago</div>
                          </div>
                        </div>
                        <div className="admin-ticket-item">
                          <div className="ticket-avatar">
                            <span>KP</span>
                          </div>
                          <div className="ticket-content">
                            <div className="ticket-text">Kenzo P. submitted a ticket</div>
                            <div className="ticket-time">In Progress • 1 hour ago</div>
                          </div>
                        </div>
                        <div className="admin-ticket-item">
                          <div className="ticket-avatar">
                            <span>TM</span>
                          </div>
                          <div className="ticket-content">
                            <div className="ticket-text">Thomas M. needs account approval</div>
                            <div className="ticket-time">New • 2 hours ago</div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* BOTTOM ROW: ACTIVITY & ACTIONS */}
              <Row className="admin-bottom-row">
                <Col md={8}>
                  <Card className="admin-activity-card">
                    <Card.Body className="activity-card-body">
                      <div className="card-header-with-action">
                        <div className="admin-card-title">Recent Activity Feed</div>
                        <button className="view-all-btn">View All</button>
                      </div>
                      <div className="admin-activity-list">
                        <div className="admin-activity-item">
                          <div className="admin-activity-icon cancel">
                            <i className="fa-solid fa-xmark" />
                          </div>
                          <div className="admin-activity-content">
                            <div className="admin-activity-text">
                              Carlos Gambol cancelled a booking
                            </div>
                            <div className="admin-activity-time">5 minutes ago</div>
                          </div>
                        </div>
                        <div className="admin-activity-item">
                          <div className="admin-activity-icon success">
                            <i className="fa-solid fa-user-plus" />
                          </div>
                          <div className="admin-activity-content">
                            <div className="admin-activity-text">
                              5 new freelancer applications received
                            </div>
                            <div className="admin-activity-time">1 hour ago</div>
                          </div>
                        </div>
                        <div className="admin-activity-item">
                          <div className="admin-activity-icon info">
                            <i className="fa-solid fa-file-invoice-dollar" />
                          </div>
                          <div className="admin-activity-content">
                            <div className="admin-activity-text">
                              Monthly revenue report generated
                            </div>
                            <div className="admin-activity-time">3 hours ago</div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="admin-actions-card">
                    <Card.Body className="actions-card-body">
                      <div className="admin-card-title">Quick Actions</div>
                      <div className="admin-actions-list">
                        <button className="admin-quick-action">
                          <i className="fa-solid fa-user-check" />
                          <span>Verify Users</span>
                        </button>
                        <button className="admin-quick-action">
                          <i className="fa-solid fa-chart-bar" />
                          <span>Generate Report</span>
                        </button>
                        <button className="admin-quick-action">
                          <i className="fa-solid fa-download" />
                          <span>Export Data</span>
                        </button>
                        <button className="admin-quick-action">
                          <i className="fa-solid fa-gear" />
                          <span>Settings</span>
                        </button>
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

export default AdminPage;