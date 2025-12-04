// FreelanceBookingsPage.jsx
import React, { useState } from 'react';
import MainSidebarFreelance from '../components/MainSidebarFreelance';
import MainNavbar from '../components/MainNavbar';
import './FreelanceBookingsPage.css';

const FreelanceBookingsPage = () => {
  const [activeTab, setActiveTab] = useState('my-bookings');

  // Sample booking data
  const bookingsData = [
    {
      id: 1,
      clientName: 'Karl',
      dates: 'From 11/21 to 11/25',
      status: 'accepted'
    },
    {
      id: 2,
      clientName: 'Karl',
      dates: 'From 10/30 to 12/05',
      status: 'cancelled'
    },
    {
      id: 3,
      clientName: 'Karl',
      dates: 'From 12/8 to 12/15',
      status: 'accepted'
    },
    {
      id: 4,
      clientName: 'Karl',
      dates: 'From 12/16 to 12/20',
      status: 'rescheduled'
    },
    {
      id: 5,
      clientName: 'Karl',
      dates: 'From 12/22 to 12/24',
      status: 'accepted'
    },
    {
      id: 6,
      clientName: 'Pat',
      dates: 'From 12/26 to 12/29',
      status: 'rescheduled'
    }
  ];

  const stats = {
    total: 12,
    accepted: 8,
    rescheduled: 2,
    cancelled: 2
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'accepted':
        return 'status accepted';
      case 'cancelled':
        return 'status cancelled';
      case 'rescheduled':
        return 'status rescheduled';
      default:
        return 'status';
    }
  };

  const getCardClass = (status) => {
    switch (status) {
      case 'accepted':
        return 'booking-card accepted';
      case 'cancelled':
        return 'booking-card cancelled';
      case 'rescheduled':
        return 'booking-card rescheduled';
      default:
        return 'booking-card';
    }
  };

  const handleReschedule = (bookingId) => {
    alert(`Rescheduling booking #${bookingId}`);
    // Add your reschedule logic here
  };

  const handleMessage = (clientName) => {
    alert(`Messaging ${clientName}`);
    // Add your messaging logic here
  };

  const handleRebook = (bookingId) => {
    alert(`Rebooking cancelled booking #${bookingId}`);
    // Add your rebook logic here
  };

  return (
    <div className="freelance-bookings-page">
      <MainNavbar />
      <div className="bookings-layout">
        <MainSidebarFreelance />
        <div className="bookings-main-content">
          <div className="bookings-header">
            <h1 className="bookings-title">
              <i className="fas fa-calendar-alt"></i> My Bookings
            </h1>
            <div className="bookings-subtitle">Manage your appointments and schedules</div>
          </div>
          
          <div className="stats-container">
            <div className="stat-card primary">
              <i className="fas fa-calendar-check fa-2x"></i>
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Bookings</div>
            </div>
            <div className="stat-card success">
              <i className="fas fa-check-circle fa-2x"></i>
              <div className="stat-value">{stats.accepted}</div>
              <div className="stat-label">Accepted</div>
            </div>
            <div className="stat-card warning">
              <i className="fas fa-exchange-alt fa-2x"></i>
              <div className="stat-value">{stats.rescheduled}</div>
              <div className="stat-label">Rescheduled</div>
            </div>
            <div className="stat-card danger">
              <i className="fas fa-times-circle fa-2x"></i>
              <div className="stat-value">{stats.cancelled}</div>
              <div className="stat-label">Cancelled</div>
            </div>
          </div>
          
          <div className="bookings-tabs">
            <button 
              className={`bookings-tab ${activeTab === 'my-bookings' ? 'active' : ''}`}
              onClick={() => handleTabClick('my-bookings')}
            >
              <i className="fas fa-calendar-week"></i>
              My Bookings
            </button>
            <button 
              className={`bookings-tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => handleTabClick('history')}
            >
              <i className="fas fa-history"></i>
              History
            </button>
          </div>
          
          {activeTab === 'my-bookings' && (
            <div className="bookings-content">
              <div className="bookings-grid">
                {bookingsData.map(booking => (
                  <div key={booking.id} className={getCardClass(booking.status)}>
                    <div className="booking-header">
                      <h3 className="client-name">
                        <i className="fas fa-user"></i> {booking.clientName}
                      </h3>
                      <div className="booking-badge">
                        <span className={getStatusClass(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="booking-dates">
                      <i className="fas fa-calendar"></i> {booking.dates}
                    </div>
                    <div className="booking-progress">
                      <div className="progress-bar">
                        <div className={`progress-fill ${booking.status}`}></div>
                      </div>
                    </div>
                    <div className="booking-actions">
                      {booking.status === 'cancelled' ? (
                        <button 
                          className="btn btn-rebook"
                          onClick={() => handleRebook(booking.id)}
                        >
                          <i className="fas fa-redo"></i> Rebook
                        </button>
                      ) : (
                        <button 
                          className="btn btn-outline"
                          onClick={() => handleReschedule(booking.id)}
                        >
                          <i className="fas fa-edit"></i> Reschedule
                        </button>
                      )}
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleMessage(booking.clientName)}
                      >
                        <i className="fas fa-comment"></i> Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="bookings-content">
              <div className="empty-state">
                <i className="fas fa-history"></i>
                <h3>No History Available</h3>
                <p>Your booking history will appear here once you have completed bookings.</p>
                <button className="btn btn-primary">
                  <i className="fas fa-plus"></i> Create New Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelanceBookingsPage;