import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Button, Card } from 'react-bootstrap';
import { getServiceByCategory } from '../services/Services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function DisplayCarpentry() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const category = 'Carpentry';

    // Get userId from localStorage or fallback to null
    const userId = localStorage.getItem('userId') || null;

    useEffect(() => {
        fetchServiceDetails();
        // eslint-disable-next-line
    }, []);

    const fetchServiceDetails = async () => {
        try {
            setIsLoading(true);
            const response = await getServiceByCategory(category); // fixed spelling
            const data = Array.isArray(response.data) ? response.data : (response.data.services || []);
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
            toast.error('Failed to load Carpentry services', { theme: 'colored' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="my-4">
            <h2 className="mb-4 text-center">Carpentry Services</h2>
            <p className="mb-5 text-center text-muted" style={{ maxWidth: 600, margin: '0 auto' }}>
                Explore our top-rated Carpentry repair and installation services. Book a professional for all your Carpentry needs.
            </p>

            {isLoading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Row className="g-4 justify-content-center">
                    {services.slice(0, 3).map((service, idx) => (
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
                                            onClick={() => {
                                                if (!userId) {
                                                    toast.warning('Please login to proceed with payment', { theme: 'colored' });
                                                    navigate('/login');
                                                    return;
                                                }
                                                navigate(
                                                    `/payment?service_id=${service.service_id || service.id || service.serviceId}&user_id=${userId}&amount=${service.price}`
                                                );
                                            }}
                                        >
                                            Proceed to Payment
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    {services.length === 0 && (
                        <div className="text-center text-muted">No Carpentry services found.</div>
                    )}
                </Row>
            )}
        </Container>
    );
}

export default DisplayCarpentry;
