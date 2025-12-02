import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Spinner } from "react-bootstrap";
import { getRole, getUserId } from "../services/RoleService";

export const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = getRole();      // "ADMIN" or "USER"
  const userId = getUserId();  // Logged-in user

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      let url = "";

      if (role === "ADMIN") {
        url = "http://localhost:8080/admin/payments";
      } else {
        url = `http://localhost:8080/users/${userId}/payments`;
      }

      const response = await axios.get(url);
      setPayments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">{role === "ADMIN" ? "All Payments" : "My Payments"}</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Payment ID</th>

            {/* Show username column only for admin */}
            {role === "ADMIN" && <th>User ID</th>}

            <th>Service</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Payment Date</th>
           
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>

              {/* Admin sees user name */}
              {role === "ADMIN" && <td>{payment.user?.userId}</td>}

              <td>{payment.service?.name}</td>
              <td>{payment.amount}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.paymentDate}</td>
           
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PaymentList;
