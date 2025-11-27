// src/components/AdminFooter.jsx
import React from 'react';
import './AdminFooter.css'; // Ensure the correct path to the CSS file

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="admin-footer-inner">
        {/* LEFT — Text: "© Schedify" */}
        <div className="admin-footer-left">
          <span>© Schedify</span>
        </div>

        {/* RIGHT — Social Media Icons */}
        <div className="admin-footer-right">
          <div className="footer-icons">
            <a href="https://www.facebook.com" className="footer-icon">
              <i className="fa-brands fa-facebook-f" />
            </a>
            <a href="https://twitter.com" className="footer-icon">
              <i className="fa-brands fa-x-twitter" />
            </a>
            <a href="https://www.linkedin.com" className="footer-icon">
              <i className="fa-brands fa-linkedin-in" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
