
import { useState, useEffect } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { postPayment, getServiceById } from "../services/Services";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [amountFromUrl, setAmountFromUrl] = useState(false);
const loggedInUserId = JSON.parse(localStorage.getItem("user"))?.userId;
  const [formData, setFormData] = useState({
    service_id: "",
    amount: "",
    payment_method: "",
    payment_date: new Date().toISOString().split("T")[0],
   //user_id:  JSON.parse(localStorage.getItem("user"))?.id,
  //user_id: getUserId(),
    payment_status: "pending",
  });

  // ---------------------- HANDLE INPUT ----------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 

  // ---------------------- LOAD DATA FROM URL ----------------------
  useEffect(() => {
    const fetchServiceDetails = async () => {
      const params = new URLSearchParams(location.search);
      const serviceId = params.get("service_id");
      const amountParam = params.get("amount");
      
      // Set service_id from query param
      if (serviceId) {
        setFormData((prev) => ({
          ...prev,
          service_id: serviceId,
           user_id: loggedInUserId
        }));
      }

      // If amount comes from URL → use it
      if (amountParam) {
        const parsed = parseFloat(amountParam);
        if (!isNaN(parsed) && parsed > 0) {
          setFormData((prev) => ({
            ...prev,
            amount: parsed,
          }));
          setAmountFromUrl(true);
          return;
        }
      }

      // If no amount in URL → fetch service price from backend
      if (serviceId && !amountParam) {
        try {
          const response = await getServiceById(serviceId);

          if (response?.data?.price) {
            const priceValue = parseFloat(response.data.price);
            if (!isNaN(priceValue) && priceValue > 0) {
              setFormData((prev) => ({
                ...prev,
                amount: priceValue,
              }));
              setAmountFromUrl(true);
            }
          }
        } catch (error) {
          console.error("Failed to fetch service:", error);
          toast.error("Error loading service details");
        }
      }
    };

    fetchServiceDetails();
  }, [location]);

  // ---------------------- SUBMIT PAYMENT ----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(formData.amount);

    if (!parsedAmount || parsedAmount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

   
const payload = {
  service: { serviceId: formData.service_id },

  amount: parsedAmount,
  paymentMethod: formData.payment_method,
  paymentDate: formData.payment_date,
  user: { userId: formData.user_id }
};


    try {
      setIsLoading(true);
      const response = await postPayment(payload);

      if (response?.status >= 200 && response?.status < 300) {
        toast.success("Payment successful!");
        navigate("/service-dashboard");
      } else {
        toast.error("Payment failed. Try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="my-4">
      <Card>
        <Card.Header as="h4" className="text-center">Payment Details</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>

            {/* SERVICE ID */}
            <Form.Group className="mb-3">
              <Form.Label>Service ID</Form.Label>
              <Form.Control
                type="text"
                name="service_id"
                value={formData.service_id}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                name="user_id"
                value={formData.user_id}
                readOnly // user_id is controlled from localStorage
                required
              />
            </Form.Group>

            {/* AMOUNT */}
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                readOnly={amountFromUrl}
                onChange={handleInputChange}
                style={{ backgroundColor: amountFromUrl ? "#f8f9fa" : undefined }}
                required
              />
            </Form.Group>

            {/* PAYMENT METHOD */}
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleInputChange}
                required
              >
                <option value="">Select payment method</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="upi">UPI</option>
                <option value="net_banking">Net Banking</option>
              </Form.Select>
            </Form.Group>

            {/* PAYMENT DATE */}
            <Form.Group className="mb-3">
              <Form.Label>Payment Date</Form.Label>
              <Form.Control
                type="date"
                name="payment_date"
                value={formData.payment_date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* SUBMIT BUTTON */}
            <div className="text-center">
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Process Payment"}
              </Button>
            </div>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Payment;




