import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Tabs,
  Tab,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../components/MainNavbar"; // Import MainNavbar
import "./LogInPage.css";
import MainFooter from "../components/MainFooter";
import { login, signup } from "../api/auth"; // 👈 NEW

const LoginPage = () => {
  const navigate = useNavigate();

  // ---------- LOGIN STATE ----------
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // ---------- SIGNUP STATE ----------
  const [signupFullname, setSignupFullname] = useState("");
  const [signupIdentifier, setSignupIdentifier] = useState(""); // "Email or Username"
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  // ---------- HANDLERS ----------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const data = await login({
        identifier: loginIdentifier,
        password: loginPassword,
      });

      // Save token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // After successful login, navigate to the Freelance Dashboard
      navigate("/freelance-dashboard");
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");

    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    setSignupLoading(true);

    try {
      const data = await signup({
        fullname: signupFullname,
        email: signupIdentifier,
        password: signupPassword,
      });
  

      // Save token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // After signup, go to profile (same as your old code)
      navigate("/profile");
    } catch (err) {
      setSignupError(err.message);
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <>
      <MainNavbar />

      <div className="login-page">
        <Container className="login-container">
          <Row className="justify-content-center">
            <Col xs={12}>
              <Card className="shadow-lg login-card">
                <Card.Body className="login-card-body">
                  <Tabs
                    defaultActiveKey="login"
                    id="freelancer-auth-tabs"
                    className="mb-4 auth-tabs"
                    justify
                  >
                    {/* LOG IN TAB */}
                    <Tab eventKey="login" title="LOG IN">
                      <Form onSubmit={handleLogin}>
                        <InputGroup className="mb-3 rounded-pill bg-light input-pill">
                          <InputGroup.Text className="bg-transparent border-0">
                            <i className="fa-regular fa-envelope text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Email"
                            className="border-0 bg-transparent"
                            value={loginIdentifier}
                            onChange={(e) =>
                              setLoginIdentifier(e.target.value)
                            }
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
                            value={loginPassword}
                            onChange={(e) =>
                              setLoginPassword(e.target.value)
                            }
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
                    </Tab>

                    {/* SIGN UP TAB */}
                    <Tab eventKey="signup" title="SIGN UP">
                      <Form onSubmit={handleSignup} className="mt-4">
                        {/* Full Name */}
                        <InputGroup className="mb-3 rounded-pill bg-light input-pill">
                          <InputGroup.Text className="bg-transparent border-0">
                            <i className="fa-solid fa-user text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Full Name"
                            className="border-0 bg-transparent"
                            value={signupFullname}
                            onChange={(e) =>
                              setSignupFullname(e.target.value)
                            }
                            required
                          />
                        </InputGroup>

                        {/* Email / Username (we send as username for now) */}
                        <InputGroup className="mb-3 rounded-pill bg-light input-pill">
                          <InputGroup.Text className="bg-transparent border-0">
                            <i className="fa-regular fa-envelope text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Email"
                            className="border-0 bg-transparent"
                            value={signupIdentifier}
                            onChange={(e) =>
                              setSignupIdentifier(e.target.value)
                            }
                            required
                          />
                        </InputGroup>

                        {/* Password */}
                        <InputGroup className="mb-3 rounded-pill bg-light input-pill">
                          <InputGroup.Text className="bg-transparent border-0">
                            <i className="fa-solid fa-lock text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            className="border-0 bg-transparent"
                            value={signupPassword}
                            onChange={(e) =>
                              setSignupPassword(e.target.value)
                            }
                            required
                          />
                        </InputGroup>

                        {/* Confirm Password */}
                        <InputGroup className="mb-3 rounded-pill bg-light input-pill">
                          <InputGroup.Text className="bg-transparent border-0">
                            <i className="fa-solid fa-lock text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            className="border-0 bg-transparent"
                            value={signupConfirmPassword}
                            onChange={(e) =>
                              setSignupConfirmPassword(e.target.value)
                            }
                            required
                          />
                        </InputGroup>

                        {signupError && (
                          <div className="text-center mb-2">
                            <span className="text-danger">{signupError}</span>
                          </div>
                        )}

                        <Button
                          type="submit"
                          variant="info"
                          className="w-100 rounded-pill py-2 mb-3 signup-btn"
                          disabled={signupLoading}
                        >
                          {signupLoading ? "Creating account..." : "SIGN UP"}
                        </Button>

                        <div className="d-flex align-items-center justify-content-center gap-2 signup-social-row">
                          <span className="text-muted">or</span>
                          <Button
                            variant="outline-dark"
                            className="rounded-pill d-flex align-items-center justify-content-center social-btn"
                            type="button"
                          >
                            <span>Sign up with Facebook</span>
                            <span className="ms-2">
                              <i className="fa-brands fa-facebook-f fb-icon" />
                            </span>
                          </Button>
                        </div>
                      </Form>
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <MainFooter />
    </>
  );
};

export default LoginPage;
