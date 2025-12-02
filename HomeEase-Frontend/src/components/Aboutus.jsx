import { Container, Row, Col, Card } from "react-bootstrap";

import aboutus1 from "../assets/images/aboutus1.png";
import mission from "../assets/images/mission.png";
import vision from "../assets/images/vision.jpg";
import Ajay from "../assets/images/Ajay.jpg";
import Priyanka from "../assets/images/Priyanka.jpg";
import Sofiya from "../assets/images/Sofiya.jpg";

export function Aboutus() {
  const teamMembers = [
    { name: "Priyanka Thange", role: "Software Developer", img: Priyanka },
    { name: "Ajay Patil", role: "Software Developer", img: Ajay },
    { name: "Sofiya Sutar", role: "Software Developer", img: Sofiya },
  ];

  return (
    <Container className="mt-5 mb-5">

      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: "#2E0854" }}>About HomeEase</h2>
        <p className="text-muted fs-5 mt-2">
          Making home services simpler, faster, and more reliable for everyone.
        </p>
      </div>

      {/* Who We Are */}
      <Row className="align-items-center mb-5">
        <Col md={4} className="mb-4 mb-md-0">
          <img
            src={aboutus1}
            alt="About HomeEase"
            className="img-fluid rounded shadow-sm"
          />
        </Col>
        <Col md={6}>
          <h4 className="text-primary fw-semibold">Who We Are</h4>
          <p className="text-muted mt-3">
            HomeEase is your one-stop platform for trusted and verified home services.
            From cleaning, electrical work, plumbing to car repair, pest control, and beauty services — we bring skilled professionals right to your doorstep.
          </p>
          <p className="text-muted">
            We aim to make your life easier by ensuring top-quality service,
            transparent pricing, and on-time delivery — every single time.
          </p>
        </Col>
      </Row>

      {/* Mission & Vision */}
      <Row className="text-center mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="p-4 shadow-sm h-100">
            <Card.Img
              variant="top"
              src={mission}
              style={{ width: "100px", margin: "0 auto 15px" }}
            />
            <Card.Body>
              <Card.Title className="fw-semibold text-primary">Our Mission</Card.Title>
              <Card.Text>
                To simplify access to trusted home services by connecting customers with
                verified professionals, ensuring convenience and satisfaction every time.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-4 shadow-sm h-100">
            <Card.Img
              variant="top"
              src={vision}
              style={{ width: "100px", margin: "0 auto 15px" }}
            />
            <Card.Body>
              <Card.Title className="fw-semibold text-primary">Our Vision</Card.Title>
              <Card.Text>
                To be India’s most reliable and customer-focused home service provider
                where convenience meets trust, quality, and excellence.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Core Values */}
      <div className="text-center py-5 px-3 rounded mb-5" style={{ backgroundColor: "#cfe2ff" }}>
        <h4 className="fw-bold mb-3">Our Core Values</h4>
        <p className="fs-6 mx-auto" style={{ maxWidth: "800px" }}>
          Integrity | Quality | Customer Satisfaction | Trust | Innovation
        </p>
      </div>

      {/* Meet Our Team */}
      <div className="text-center mb-5">
        <h3 className="fw-bold text-primary mb-4">Meet Our Team</h3>
        <Row className="justify-content-center">
          {teamMembers.map((member, idx) => (
            <Col key={idx} xs={12} sm={6} md={4} className="mb-4 d-flex align-items-stretch">
              <Card className="shadow-sm border-0 w-100">
                <Card.Img
                  variant="top"
                  src={member.img}
                  alt={member.name}
                  className="rounded-top"
                  style={{ height: "420px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column justify-content-between text-center">
                  <Card.Title className="fw-semibold text-primary">{member.name}</Card.Title>
                  <Card.Text>{member.role}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

    </Container>
  );
}

