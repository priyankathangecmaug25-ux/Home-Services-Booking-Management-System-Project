
import { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

export function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [feedbacks, setFeedbacks] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Load feedbacks from localStorage
  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(storedFeedbacks);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const newFeedback = { ...formData, id: Date.now() };

      const existing = JSON.parse(localStorage.getItem("feedbacks")) || [];
      existing.push(newFeedback);

      localStorage.setItem("feedbacks", JSON.stringify(existing));

      setFeedbacks(existing);
      setFormData({ name: "", email: "", message: "" });

      toast.success("Feedback submitted successfully! 💖", {
        position: "top-right",
        autoClose: 2500,
      });

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      toast.error("Something went wrong! Please try again.", {
        position: "top-right",
        autoClose: 2500,
      });
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to delete all feedback?")) {
      localStorage.removeItem("feedbacks");
      setFeedbacks([]);

      toast.info("All feedback cleared!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <Container className="mt-5 p-4 bg-light rounded shadow" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4 text-primary">We Value Your Feedback 💬</h2>

      {submitted && <Alert variant="success">Thank you for your feedback!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Your Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your feedback..."
            required
          />
        </Form.Group>

        <div className="text-center mb-3">
          <Button variant="primary" type="submit" className="px-4 me-2">
            Submit Feedback
          </Button>

          <Button variant="danger" onClick={handleClear}>
            Clear All
          </Button>
        </div>
      </Form>

      {feedbacks.length > 0 && (
        <div>
          <h3 className="mt-4">All Feedback</h3>
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
                background: "#f9f9f9",
              }}
            >
              <p>
                <strong>{fb.name}</strong> ({fb.email})
              </p>
              <p>{fb.message}</p>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
