// src/pages/HowItWorksPage.jsx
import React from "react";
import "./HowItWorksPage.css";
import MainNavbar from "../components/MainNavbar";
import MainFooter from '../components/MainFooter';

const HowItWorksPage = () => {
  return (
<>
    <MainNavbar />
    <div className="how-page">
      <div className="how-main">
        <div className="how-cards">

          <div className="how-card">
            <h2>Create your Profile</h2>
            <p>
              Build your professional profile to showcase your services and set
              your availability. This is your personal hub for client
              acquisition and scheduling.
            </p>
          </div>

          <div className="how-card">
            <h2>Manage your Schedule</h2>
            <p>
              Control your availability, automate reminders, and sync your
              calendar to ensure seamless, timely professional interactions.
            </p>
          </div>

          <div className="how-card">
            <h2>Track your Performance</h2>
            <p>
              Track client engagement, service popularity, and earnings through
              insightful analytics. This hub provides data-driven understanding
              to grow and optimize your professional offerings.
            </p>
          </div>

        </div>
      </div>
    </div>
    <MainFooter />
    </>
  );
};

export default HowItWorksPage;
