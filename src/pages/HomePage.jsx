// src/pages/HomePage.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePage.css';
import MainNavbar from '../components/MainNavbar';
import MainFooter from '../components/MainFooter';
/* HERO IMAGE */
import heroImg from '../assets/homepagelogo.png';

const HomePage = () => {
  return (
    <>
      <MainNavbar />
      <div className="hmpage-container">
        <h1 className="hmpage-title">
          BUILD YOUR PROFILE AND GET DISCOVERED
        </h1>

        <img
          src={heroImg}
          alt="Freelancers"
          className="hmpage-hero-img"
        />

        <div className="hmpage-button-row">
          <Button
            as={Link}
            to="/login"
            className="hmpage-btn-pill hmpage-btn-primary-pill"
          >
            Freelance
          </Button>

          <Button
            as={Link}
            to="/admin-login"
            className="hmpage-btn-pill hmpage-btn-secondary-pill"
          >
            Admin
          </Button>
        </div>
             
        <MainFooter />
      </div>
    </>
  );
};

export default HomePage;