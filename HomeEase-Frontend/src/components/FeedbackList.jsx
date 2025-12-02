
import { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert } from "react-bootstrap";

export function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeedbacks = () => {
      const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
      setFeedbacks(storedFeedbacks);
      setLoading(false);
    };

    loadFeedbacks();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading feedback...</p>
      </div>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4 text-primary">Customer Feedback 💬</h2>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark text-center">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map((fb, index) => (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td>{fb.name}</td>
                <td>{fb.email}</td>
                <td>{fb.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No feedback available yet.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

