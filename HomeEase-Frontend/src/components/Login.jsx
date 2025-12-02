import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { storeRole, storeUserId } from "../services/RoleService";
import { login } from "../services/UserService";
import { loginAdmin } from "../services/AdminService";
import { storeToken } from "../services/TokenService";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters long";

    if (!formData.role) newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before logging in!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    try {
      // Select API based on role
      const apiCall = formData.role === "admin" ? loginAdmin(formData) : login(formData);
      const response = await apiCall;

      if (response.status === 200) {
        const user = response.data;

        if (!user || !user.role) {
          toast.error("Invalid user data received from server");
          return;
        }

        const normalizedRole = user.role.toUpperCase();
             // ---- TOKEN EXTRACTION (supports ANY backend naming) ----
            const token =
                user.token ||
                user.jwtToken ||
                user.accessToken ||
                user.jwt ||
                null;

            if (!token) {
                toast.error("Token missing from backend response!");
                console.error("NO TOKEN RECEIVED:", user);
                return;
            }  
             // Store JWT
        localStorage.setItem("token", user.token);

        // Store in localStorage and RoleService
        localStorage.setItem("user", JSON.stringify(user));
        storeUserId(user.userId);
        storeRole(normalizedRole);

        toast.success("Login Successful!", {
          position: "top-right",
          theme: "colored",
        });

        // Notify Navbar
        window.dispatchEvent(new Event("authChange"));

        // Redirect
        setTimeout(() => {
          if (normalizedRole === "ADMIN") navigate("/add-services");
          else navigate("/service-dashboard");
        }, 1200);
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error("Invalid credentials!", {
        position: "top-right",
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Row className="w-100">
        <Col md={{ span: 4, offset: 4 }}>
          <Card className="shadow-lg rounded-4 border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-3">
                <Alert variant="primary" className="fw-bold">Login</Alert>
              </div>

              <Form onSubmit={handleSubmit}>
                {/* Email */}
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                {/* Role */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Login As</Form.Label>
                  <div>
                    <Form.Check inline label="User" type="radio" name="role" value="user"
                      checked={formData.role === "user"} onChange={handleChange} isInvalid={!!errors.role} />
                    <Form.Check inline label="Admin" type="radio" name="role" value="admin"
                      checked={formData.role === "admin"} onChange={handleChange} isInvalid={!!errors.role} />
                  </div>
                  {errors.role && <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>{errors.role}</div>}
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" className="fw-semibold">Login</Button>
                </div>
              </Form>

              <div className="text-center mt-3">
                <small className="text-muted">Don’t have an account? <a href="/register">Register</a></small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
