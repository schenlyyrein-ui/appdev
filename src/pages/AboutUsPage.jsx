// src/pages/AboutUsPage.jsx
import React from "react";
import "./AboutUsPage.css";
import MainNavbar from "../components/MainNavbar";
import MainFooter from '../components/MainFooter';

const AboutUsPage = () => {
  return (
    <>
    <MainNavbar />
    <div className="about-page">
      <div className="about-main">
        <div className="about-cards">
          <div className="about-card">
            <h2>Mission</h2>
            <p>
              To equip freelancers with a simple and powerful platform that
              streamlines bookings, organizes schedules, and enhances their
              professional workflow.
            </p>
          </div>

          <div className="about-card">
            <h2>Vision</h2>
            <p>
              To become the most trusted digital scheduling tool that empowers
              freelancers to manage their time, grow their services, and work
              more efficiently.
            </p>
          </div>

          <div className="about-card">
            <h2>Goal</h2>
            <p>
              To simplify how freelancers handle appointments, reduce booking
              errors, and support them in delivering smooth, reliable, and
              professional client experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
    <MainFooter />
    </>
  );
};

export default AboutUsPage;
