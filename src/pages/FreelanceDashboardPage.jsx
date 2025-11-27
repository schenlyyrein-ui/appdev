// src/pages/FreelanceDashboardPage.jsx
import React from "react";
import MainSidebarFreelance from "../components/MainSidebarFreelance";
import "./FreelanceDashboardPage.css";
import MainNavbar from "../components/MainNavbar";

const FreelanceDashboardPage = () => {
  return (
    <>
      <MainNavbar />
      <div className="freelance-dashboard-page">
        <MainSidebarFreelance />
        
        <div className="freelance-dashboard-content">
          {/* Header */}
          <div className="freelance-dashboard-header">
            <h1>Freelance Dashboard</h1>
            <p className="freelance-user-role"></p>
          </div>

          {/* Top Stats Row */}
          <div className="freelance-stats-grid">
            <div className="freelance-stat-card freelance-earnings-card">
              <div className="freelance-stat-header">
                <h3>Total Earnings</h3>
              </div>
              <div className="freelance-stat-main">
                <p className="freelance-stat-value">₱12,530</p>
              </div>
            </div>

            <div className="freelance-stat-card freelance-bookings-card">
              <h3>Active Bookings</h3>
              <p className="freelance-stat-value">6</p>
              <div className="freelance-booking-details">
                <span>Upcoming: 2</span>
                <span>Notifications: 3</span>
              </div>
            </div>

            <div className="freelance-stat-card freelance-requests-card">
              <h3>Requests</h3>
              <div className="freelance-request-list">
                <div className="freelance-request-item">
                  <p>Booking Request from Jojo - Jan 4, 3PM</p>
                  <button className="freelance-view-btn">View</button>
                </div>
                <div className="freelance-request-item">
                  <p>Booking Request from Tomas - Jan 10, 3PM</p>
                  <button className="freelance-view-btn">View</button>
                </div>
                <div className="freelance-request-item">
                  <p>Booking Request from Kenzo - Jan 8, 3PM</p>
                  <button className="freelance-view-btn">View</button>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Content Row */}
          <div className="freelance-content-grid">
            {/* Recent Reviews */}
            <div className="freelance-content-card freelance-reviews-card">
              <h3>Recent Reviews</h3>
              <div className="freelance-reviews-list">
                <div className="freelance-review-item">
                  <div className="freelance-stars">⭐⭐⭐⭐⭐</div>
                  <p>3 days ago</p>
                </div>
                <div className="freelance-review-item">
                  <div className="freelance-stars">⭐⭐⭐⭐⭐</div>
                  <p>5 days ago</p>
                </div>
                <div className="freelance-review-item">
                  <div className="freelance-stars">⭐⭐⭐⭐</div>
                  <p>1 week ago</p>
                </div>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="freelance-content-card freelance-schedule-card">
              <h3>Today's Schedule</h3>
              <div className="freelance-schedule-list">
                <div className="freelance-schedule-item">
                  <span className="freelance-time">10:00 AM</span>
                  <span className="freelance-event">Client meeting</span>
                </div>
                <div className="freelance-schedule-item">
                  <span className="freelance-time">2:30 PM</span>
                  <span className="freelance-event">Consultation</span>
                </div>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="freelance-content-card freelance-activity-card">
              <h3>Activity Summary</h3>
              <div className="freelance-activity-stats">
                <div className="freelance-activity-item">
                  <span className="freelance-label">Bookings This Week</span>
                  <span className="freelance-value">1</span>
                </div>
                <div className="freelance-activity-item">
                  <span className="freelance-label">Cancelled</span>
                  <span className="freelance-value">1</span>
                </div>
                <div className="freelance-activity-item">
                  <span className="freelance-label">Rescheduled</span>
                  <span className="freelance-value">2</span>
                </div>
              </div>
            </div>

            {/* Bookings Summary */}
            <div className="freelance-content-card freelance-summary-card">
              <h3>Bookings Summary</h3>
              <div className="freelance-chart-placeholder">
                <div className="freelance-chart-bars">
                  <div className="freelance-bar" style={{height: '60%'}}></div>
                  <div className="freelance-bar" style={{height: '80%'}}></div>
                  <div className="freelance-bar" style={{height: '40%'}}></div>
                  <div className="freelance-bar" style={{height: '90%'}}></div>
                  <div className="freelance-bar" style={{height: '70%'}}></div>
                </div>
                <div className="freelance-chart-labels">
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreelanceDashboardPage;