// src/pages/WorkWithUsPage.jsx
import React from "react";
import "./WorkWithUsPage.css";
import MainNavbar from '../components/MainNavbar'; // Import the MainNavbar
import MainFooter from '../components/MainFooter';

const WorkWithUsPage = () => {
  return (
    <>
    <MainNavbar />
    <div className="work-page">
      <div className="work-main">
        <div className="work-content">
          <h1>Work with Us: Partner in Every Booking</h1>

          <p>
            We’re building a smarter way for freelancers and clients to connect,
            schedule, and grow together. Our platform is designed to reduce
            admin stress, simplify bookings, and give professionals more time
            to focus on what they do best. Whether you’re a freelancer looking
            for more opportunities or a partner organization aiming to support
            your community, there’s a place for you here.
          </p>

          <p>
            By working with us, you’ll have access to tools that help streamline
            scheduling, track performance, and deliver a more professional
            client experience. We value collaboration, transparency, and
            continuous improvement—and we’re always open to new ideas that make
            freelancing easier and more rewarding.
          </p>

          <div className="work-sections">
            <div className="work-column">
              <h2>For Freelancers</h2>
              <ul>
                <li>Showcase your services and expertise in a dedicated profile.</li>
                <li>Receive and manage bookings in one organized schedule.</li>
                <li>Use performance insights to grow your client base.</li>
              </ul>
            </div>

            <div className="work-column">
              <h2>For Partners</h2>
              <ul>
                <li>Offer our scheduling system as a benefit to your community.</li>
                <li>Collaborate on programs, events, or promotions.</li>
                <li>Help shape features that support your industry’s needs.</li>
              </ul>
            </div>
          </div>

          <p className="work-contact-text">
            Interested in collaborating or learning more about how we can work
            together? Reach out to us through our <strong>Contact</strong> page,
            and let’s start the conversation.
          </p>
        </div>
      </div>
      {/* no footer here – global MainFooter will handle it */}
    </div>
    <MainFooter />
    </>
  );
};

export default WorkWithUsPage;
