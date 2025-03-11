import React, { useEffect, useState } from "react";
import { BsPersonFill, BsLockFill } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import { loginUser } from "./AuthService";
import AlertMessage from "../common/AlertMessage";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { errorMessage, setErrorMessage, showErrorAlert, setShowErrorAlert } =
    UseMessageAlerts();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /*useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken");
    console.log("Auth Token:", isAuthenticated);
    if (
      isAuthenticated &&
      isAuthenticated !== "null" &&
      isAuthenticated !== "undefined"
    ) {
      console.log("Redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, []);*/
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken");

    //console.log("Auth Token:", isAuthenticated);
    //console.log("Current Path:", location.pathname); // Debugging

    // Only redirect if the user is NOT on the login page
    if (
      isAuthenticated &&
      isAuthenticated !== "null" &&
      isAuthenticated !== "undefined" &&
      location.pathname !== "/login"
    ) {
      console.log("Redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [location.pathname]); // Dependency array includes `location.pathname`

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setErrorMessage("Please enter a valid email and password");
      setShowErrorAlert(true);
      return;
    }
    try {
      const data = await loginUser(credentials.email, credentials.password);
      localStorage.setItem("authToken", data.data.token);
      const decoded = jwtDecode(data.data.token);
      localStorage.setItem("userRoles", JSON.stringify(decoded.roles));
      localStorage.setItem("userId", data.data.id);
      console.log(data.data);
      clearLoginForm();
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage("Please, enter a valid username and paasword");
      setShowErrorAlert(true);
    }
  };

  const clearLoginForm = () => {
    setCredentials({ email: "", password: "" });
    setShowErrorAlert(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col sm={6}>
          <Card>
            {showErrorAlert && (
              <AlertMessage type={"danger"} message={errorMessage} />
            )}
            <Card.Body>
              <Card.Title className="text-center mb-4">Login</Card.Title>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <BsPersonFill /> {/* User icon */}
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="email"
                      value={credentials.email}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <BsLockFill /> {/* Lock icon */}
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                >
                  Login
                </Button>
              </Form>
              <div className="text-center mt-2">
                Don't have an account yet?{" "}
                <Link to={"/register-user"} style={{ textDecoration: "none" }}>
                  Register here
                </Link>
                <div className="mt-2">
                  <Link
                    to={"/password-rest-request"}
                    style={{ textDecoration: "none" }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
