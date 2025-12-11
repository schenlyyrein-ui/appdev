// src/pages/LogInPageAdmin.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LogInPageAdmin.css";
import MainNavbar from "../components/MainNavbar";
import AdminFooter from "../components/AdminFooter";
import { login } from "../api/auth"; // 👈 'signup' import removed

const LogInPageAdmin = () => {
  const navigate = useNavigate();

  // ---------- LOGIN STATE ----------
  const [adminIdentifier, setAdminIdentifier] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // ---------- HANDLER ----------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const data = await login({
        identifier: adminIdentifier,
        password: adminPassword,
      });

      // 1. Save token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 2. Security Check: Admin Role
      const isAdminUser =
        (data.user.role && data.user.role.toLowerCase() === "admin") ||
        data.user.username?.toLowerCase() === "admin";

      if (!isAdminUser) {
        setLoginError("Unauthorized — this login page is for admins only.");
        return;
      }

      // 3. Navigate
      navigate("/admin");
    } catch (err) {
      setLoginError(err.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <>
      <MainNavbar />

      <div className="admin-login-page">
        <Container className="admin-login-container">
          <Row className="justify-content-center">
            {/* Kept xs={12} so it maintains the full width (length) defined in CSS */}
            <Col xs={12}>
              <Card className="shadow-lg admin-login-card">
                <Card.Body className="admin-login-card-body">
                  
                  {/* Centered Login Header (Replaces the Tab) */}
                  <div className="text-center mb-4">
                    <h5 
                      className="d-inline-block px-4 py-2" 
                      style={{ 
                        color: '#ffffff', 
                        backgroundColor: '#268aa5', 
                        borderRadius: '999px',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        letterSpacing: '0.5px'
                      }}
                    >
                      LOG IN
                    </h5>
                  </div>

                  <Form onSubmit={handleLogin}>
                    <InputGroup className="mb-3 rounded-pill bg-light input-pill">
                      <InputGroup.Text className="bg-transparent border-0">
                        <i className="fa-regular fa-envelope text-muted" />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Admin Email"
                        className="border-0 bg-transparent"
                        value={adminIdentifier}
                        onChange={(e) => setAdminIdentifier(e.target.value)}
                        required
                      />
                    </InputGroup>

                    <InputGroup className="mb-2 rounded-pill bg-light input-pill">
                      <InputGroup.Text className="bg-transparent border-0">
                        <i className="fa-solid fa-lock text-muted" />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        className="border-0 bg-transparent"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                      />
                    </InputGroup>

                    {loginError && (
                      <div className="text-center mb-2">
                        <span className="text-danger">{loginError}</span>
                      </div>
                    )}

                    <div className="text-center mb-3">
                      <a href="#" className="forgot-link">
                        Forgot password?
                      </a>
                    </div>

                    <Button
                      type="submit"
                      variant="info"
                      className="w-100 rounded-pill py-2 mb-3 login-btn"
                      disabled={loginLoading}
                    >
                      {loginLoading ? "Logging in..." : "LOG IN"}
                    </Button>

                    <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap social-row">
                      <Button
                        variant="outline-dark"
                        className="flex-grow-1 rounded-pill d-flex align-items-center justify-content-center social-btn"
                        type="button"
                      >
                        <i className="fa-brands fa-google me-2" />
                        Log in with Google
                      </Button>

                      <span className="or-span text-muted">or</span>

                      <Button
                        variant="outline-dark"
                        className="flex-grow-1 rounded-pill d-flex align-items-center justify-content-center social-btn"
                        type="button"
                      >
                        <i className="fa-brands fa-facebook-f me-2 fb-icon" />
                        Log in with Facebook
                      </Button>
                    </div>
                  </Form>
                  
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <AdminFooter />
    </>
  );
};

export default LogInPageAdmin;