// src/pages/PrivacyPolicyPage.jsx
import React from "react";
import "./PrivacyPolicyPage.css";
import MainNavbar from "../components/MainNavbar";
import MainFooter from '../components/MainFooter';

const PrivacyPolicyPage = () => {
  return (
    <>
    <MainNavbar />
    <div className="policy-page">
      <div className="policy-main">
        <div className="policy-content">
          <h1>Privacy Policy: Your Trust, Our Priority</h1>

          <p>
            We are committed to protecting the privacy of every freelancer and
            client who uses our Freelancer Booking and Schedule Management
            System. To deliver a smooth and reliable booking experience, we
            collect essential information such as account details, service
            preferences, booking history, and basic usage data. This information
            helps us manage appointments, improve system functionality, support
            communication between freelancers and clients, and maintain platform
            security.
          </p>

          <p>
            We do not sell or misuse your data, and we only share information
            with trusted service providers when necessary for system operations,
            security checks, or legal requirements. All collected data is stored
            securely and handled responsibly to prevent unauthorized access or
            misuse. By accessing our platform, you agree to our data practices
            and acknowledge that we work continuously to keep your information
            safe.
          </p>

          <p>
            Your trust, privacy, and security will always remain at the center
            of our service.
          </p>
        </div>
      </div>

   
    </div>
    <MainFooter />
    </>
  );
};

export default PrivacyPolicyPage;
