// src/pages/ContactPage.jsx
import React from "react";
import "./ContactPage.css";
import logoImg from "../assets/logo.png"; // your contact illustration
import MainNavbar from "../components/MainNavbar";
import MainFooter from '../components/MainFooter';
const ContactPage = () => {
  return (
    <>
    <MainNavbar />
    <div className="contact-page">
      <div className="contact-main">
        {/* Heading */}
        <h1 className="contact-title">Contact Us: We’re Here to Help</h1>

        {/* Main 2-column layout */}
        <div className="contact-content">

          {/* LEFT — Illustration */}
          <div className="contact-left">
            <img
              src={logoImg}
              alt="Schedify illustration"
              className="contact-image"
            />
          </div>

          {/* RIGHT — Form + Info */}
          <div className="contact-right">
            <div className="contact-form-card">

              {/* Form section */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="contact-field">
                  <label>Your Name</label>
                  <input type="text" placeholder="Full Name" />
                </div>

                <div className="contact-field">
                  <label>Your Email</label>
                  <input type="email" placeholder="Your Email" />
                </div>

                <div className="contact-field">
                  <label>Your Message</label>
                  <textarea rows="4" placeholder="Your Message" />
                </div>

                <div className="contact-button-row">
                  <button type="submit" className="contact-submit-btn">
                    Contact Us
                  </button>
                </div>
              </form>

              {/* Info section */}
              <div className="contact-side-info">
                <div className="contact-info-block">
                  <h3>Contact</h3>
                  <p>schedify@gmail.com</p>
                  <p>09064926646</p>
                </div>

                <div className="contact-info-block">
                  <h3>Based in</h3>
                  <p>
                    España Blvd, Sampaloc, Manila
                    <br />
                    1008, Philippines
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <MainFooter />
    </>
  );
};

export default ContactPage;
