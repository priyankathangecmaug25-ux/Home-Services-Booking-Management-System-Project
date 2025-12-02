import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

export function NavigationBar() {
  // Detect login using localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const [role, setRole] = useState(localStorage.getItem("role")?.toUpperCase() || null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      const userExists = !!localStorage.getItem("user");
      const storedRole = localStorage.getItem("role")?.toUpperCase() || null;

      setIsLoggedIn(userExists);
      setRole(storedRole);

      console.log("Navbar updated → Logged in:", userExists, "Role:", storedRole);
    };

    // Run once when navbar mounts
    handleAuthChange();

    // Listen for login/logout events
    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // clear everything
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      style={{ background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)", height: "80px" }}
      variant="dark"
    >
      <Container>
        <Navbar.Brand>
          <img
            src={logo}
            alt="HomeEase Logo"
            style={{ height: "45px", width: "auto", marginRight: "12px", borderRadius: "8px" }}
          />
          HomeEase
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
            {/* Always visible for both logged & unlogged */}
           

            {/* <LinkContainer to="/service-dashboard">
              <Nav.Link>Service Dashboard</Nav.Link>
            </LinkContainer> */}

            {/* If logged in, show role */}
            {isLoggedIn && <Nav.Link>Logged in as: {role}</Nav.Link>}

            {/* ADMIN NAVIGATION */}
            {isLoggedIn && role === "ADMIN" && (
              <>
                <LinkContainer to="/add-services">
                  <Nav.Link>Add Services</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/serviceList">
                  <Nav.Link>Services List</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/payments">
                  <Nav.Link>Payment List</Nav.Link>
                </LinkContainer>

                 <LinkContainer to="/about-us">
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>

                {/* <LinkContainer to="/feedback-list">
                  <Nav.Link>Feedback List</Nav.Link>
                </LinkContainer> */}
              </>
            )}

            {/* USER NAVIGATION */}
            {isLoggedIn && role === "USER" && (
              <>

              <LinkContainer to="/service-dashboard">
              <Nav.Link>Service Dashboard</Nav.Link>
            </LinkContainer>
                {/* <LinkContainer to="/payments">
                  <Nav.Link>Payment List</Nav.Link>
                </LinkContainer> */}

                <LinkContainer to="/feedback">
                  <Nav.Link>Feedback</Nav.Link>
                </LinkContainer>

                
                 <LinkContainer to="/about-us">
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>

              </>
            )}
          </Nav>

          {/* RIGHT SIDE LOGIN / LOGOUT */}
          <Nav className="ms-auto">
            {!isLoggedIn ? (
              <LinkContainer to="/login">
                <button className="btn btn-outline-secondary text-white">Login</button>
              </LinkContainer>
            ) : (
              <button className="btn btn-outline-danger text-white" onClick={handleLogout}>
                Logout
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
