// MainFooter.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './MainFooter.css';

const MainFooter = () => {
  return (
    <footer className="main-footer">
      <div className="main-footer-inner">
        <div className="main-footer-left">
          <Link to="/privacy-policy" className="footer-link">
            Privacy Policy
          </Link>
          <Link to="/work-with-us" className="footer-link">
            Work with us
          </Link>
        </div>
        <div className="main-footer-right">
         
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

export default MainFooter;
