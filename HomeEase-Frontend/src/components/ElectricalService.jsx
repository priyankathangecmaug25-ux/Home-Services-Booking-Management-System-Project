import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getServiceByCategory } from '../services/Services';

function DisplayElectronics() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const category = 'Electrical';

    const fetchServiceDetails = async () => {
        try {
            setIsLoading(true);
            const response = await getServiceByCategory(category);

            // Accept array or object with .services
            const data = Array.isArray(response.data) 
                ? response.data 
                : (response.data?.services || []);

            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);

            if (error.response) {
                // Backend responded with a status
                if (error.response.status === 401 || error.response.status === 403) {
                    toast.error("Unauthorized. Please login.", { theme: 'colored' });
                    navigate("/login");
                } else {
                    toast.error(error.response.data?.message || 'Failed to load electronics services', { theme: 'colored' });
                }
            } else {
                // Network or CORS issues
                toast.error("Network error. Cannot reach server.", { theme: 'colored' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchServiceDetails();
        // eslint-disable-next-line
    }, []);

    return (
        <Container className="my-4">
            <h2 className="mb-4 text-center">Electronics Services</h2>
            <p className="mb-5 text-center text-muted" style={{ maxWidth: 600, margin: '0 auto' }}>
                Explore our top-rated electronics repair and installation services. Book a professional for all your electrical needs, from appliance repair to wiring and more.
            </p>

            {isLoading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Row className="g-4 justify-content-center">
                    {services.length > 0 ? services.slice(0, 3).map((service, idx) => (
                        <Col key={service.service_id || service.id || idx} md={4} sm={6} xs={12}>
                            <Card style={{ width: '100%', minHeight: 120, boxShadow: '0 2px 8px #eee' }}>
                                <Card.Body>
                                    <Card.Title>{service.name}</Card.Title>
                                    <Card.Text style={{ minHeight: 50 }}>
                                        {service.description?.slice(0, 100)}
                                        {service.description && service.description.length > 100 ? '...' : ''}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span className="fw-bold text-primary">₹{service.price}</span>
                                        <Button 
                                            variant="primary" 
                                            onClick={() => navigate(`/payment?service_id=${service.service_id || service.id || service.serviceId}&amount=${service.price}`)}
                                        >
                                            Proceed to Payment
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )) : (
                        <div className="text-center text-muted">No electronics services found.</div>
                    )}
                </Row>
            )}
        </Container>
    );
}

export default DisplayElectronics;
