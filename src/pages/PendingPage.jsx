// PendingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PendingPage.css';

const PendingPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="ntif-page-wrapper">
      <div className="ntif-page">
        <div className="ntif-container">
          <div className="ntif-header">
            <div className="ntif-status-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>Pending Approval</h1>
            <p className="ntif-subtitle">Thank you for creating your profile!</p>
          </div>

          <div className="ntif-review-section">
            <div className="ntif-review-card">
              <h2>Your account is currently under review</h2>
              <p className="ntif-review-time">This process usually takes 24-48 hours</p>
              
              <div className="ntif-notification-info">
                <div className="ntif-notification-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p>We're working hard to get you approved as quickly as possible. You will receive an email notification once your profile has been approved and is ready to use.</p>
              </div>
            </div>
          </div>

          <div className="ntif-divider">
            <span>What happens next?</span>
          </div>

          <div className="ntif-process-section">
            <div className="ntif-process-steps">
              <div className="ntif-process-step">
                <div className="ntif-step-checkbox">
                  <div className="ntif-checkbox-circle"></div>
                </div>
                <div className="ntif-step-content">
                  <h3>Our team will review the information you provided</h3>
                  <p>We verify all details to ensure platform security and quality</p>
                </div>
              </div>

              <div className="ntif-process-step">
                <div className="ntif-step-checkbox">
                  <div className="ntif-checkbox-circle"></div>
                </div>
                <div className="ntif-step-content">
                  <h3>We may contact you if you need any additional details</h3>
                  <p>Keep an eye on your email for any follow-up requests</p>
                </div>
              </div>

              <div className="ntif-process-step">
                <div className="ntif-step-checkbox">
                  <div className="ntif-checkbox-circle"></div>
                </div>
                <div className="ntif-step-content">
                  <h3>You'll receive an email notification when your account is approved</h3>
                  <p>Get ready to start your freelancing journey!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ntif-action-section">
            <button onClick={handleBackToHome} className="ntif-home-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Homepage
            </button>
          </div>

          <div className="ntif-support-section">
            <p>Need help? <a href="/contact">Contact our support team</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingPage;