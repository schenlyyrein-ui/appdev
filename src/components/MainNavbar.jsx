import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import siteLogo from '../assets/logo.png';

const MainNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container fluid className="px-4">
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center"
          style={{ marginLeft: "0" }}
        >
          <img
            src={siteLogo}
            alt="Freelance Finder logo"
            className="me-2"
            style={{ height: '80px', width: 'auto' }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">

            <Nav.Link as={Link} to="/about">About Us</Nav.Link>

            {/* ✅ FIXED ROUTE */}
            <Nav.Link as={Link} to="/how-it-works">
              How it Works
            </Nav.Link>

            {/* ✅ FIXED ROUTE */}
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>

            <Button
              as={Link}
              to="/"
              variant="outline-dark"
              className="ms-3 rounded-pill px-4"
            >
              Home
            </Button>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
