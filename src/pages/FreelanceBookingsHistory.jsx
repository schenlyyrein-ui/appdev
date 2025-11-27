// FreelanceBookingsHistory.jsx
import React, { useState } from 'react';
import MainSidebarFreelance from '../components/MainSidebarFreelance';
import MainNavbar from '../components/MainNavbar';
import './FreelanceBookingsHistory.css';

const FreelanceBookingsHistory = () => {
  const [activeTab, setActiveTab] = useState('history');

  // Sample history data
  const historyData = [
    {
      id: 1,
      clientName: 'Karl',
      dates: 'From 10/30 to 10/25',
      status: 'completed'
    },
    {
      id: 2,
      clientName: 'Carlos',
      dates: 'From 10/18 to 10/05',
      status: 'completed'
    },
    {
      id: 3,
      clientName: 'Bryce',
      dates: 'From 10/18 to 10/05',
      status: 'cancelled'
    },
    {
      id: 4,
      clientName: 'Tomas',
      dates: 'From 09/15 to 09/04',
      status: 'completed'
    },
    {
      id: 5,
      clientName: 'Kristiana',
      dates: 'From 08/22 to 07/28',
      status: 'cancelled'
    },
    {
      id: 6,
      clientName: 'Jodell',
      dates: 'From 08/18 to 12/21',
      status: 'completed'
    },
    {
      id: 7,
      clientName: 'Kenzo',
      dates: 'From 08/10 to 08/16',
      status: 'completed'
    }
  ];

  const stats = {
    total: 12,
    completed: 8,
    cancelled: 2,
    pending: 2
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status completed';
      case 'cancelled':
        return 'status cancelled';
      case 'pending':
        return 'status pending';
      default:
        return 'status';
    }
  };

  const getCardClass = (status) => {
    switch (status) {
      case 'completed':
        return 'history-card completed';
      case 'cancelled':
        return 'history-card cancelled';
      case 'pending':
        return 'history-card pending';
      default:
        return 'history-card';
    }
  };

  const handleViewDetails = (bookingId) => {
    alert(`Viewing details for booking #${bookingId}`);
    // Add your view details logic here
  };

  const handleRecreate = (clientName) => {
    alert(`Recreating booking for ${clientName}`);
    // Add your recreate logic here
  };

  return (
    <div className="freelance-bookings-history">
      <MainNavbar />
      <div className="bookings-layout">
        <MainSidebarFreelance />
        <div className="bookings-main-content">
          <div className="bookings-header">
            <h1 className="bookings-title">
              <i className="fas fa-history"></i> Booking History
            </h1>
            <div className="bookings-subtitle">Review your past appointments and schedules</div>
          </div>
          
          <div className="stats-container">
            <div className="stat-card primary">
              <i className="fas fa-calendar-check fa-2x"></i>
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total History</div>
            </div>
            <div className="stat-card success">
              <i className="fas fa-check-circle fa-2x"></i>
              <div className="stat-value">{stats.completed}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card warning">
              <i className="fas fa-clock fa-2x"></i>
              <div className="stat-value">{stats.pending}</div>
              <div className="stat-label">Pending</div>
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
          
          {activeTab === 'history' && (
            <div className="bookings-content">
              <div className="history-grid">
                {historyData.map(booking => (
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
                    <div className="history-progress">
                      <div className="progress-bar">
                        <div className={`progress-fill ${booking.status}`}></div>
                      </div>
                      <div className="progress-label">
                        {booking.status === 'completed' ? '100% Completed' : 
                         booking.status === 'cancelled' ? 'Booking Cancelled' : 'In Progress'}
                      </div>
                    </div>
                    <div className="history-actions">
                      <button 
                        className="btn btn-outline"
                        onClick={() => handleViewDetails(booking.id)}
                      >
                        <i className="fas fa-eye"></i> View Details
                      </button>
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleRecreate(booking.clientName)}
                      >
                        <i className="fas fa-redo"></i> Recreate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'my-bookings' && (
            <div className="bookings-content">
              <div className="empty-state">
                <i className="fas fa-calendar-week"></i>
                <h3>Switch to My Bookings</h3>
                <p>Click on the "My Bookings" tab to view your current and upcoming appointments.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleTabClick('my-bookings')}
                >
                  <i className="fas fa-exchange-alt"></i> Switch to My Bookings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelanceBookingsHistory;