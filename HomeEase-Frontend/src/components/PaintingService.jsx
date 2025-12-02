
import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getServiceByCategory } from '../services/Services'; // <-- corrected import

function DisplayPainting() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const category = 'Painting';

    useEffect(() => {
        fetchServiceDetails();
        // eslint-disable-next-line
    }, []);

    const fetchServiceDetails = async () => {
        try {
            setIsLoading(true);
            const response = await getServiceByCategory(category); // <-- corrected usage
            const data = Array.isArray(response.data) ? response.data : (response.data?.services || []);
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
            toast.error('Failed to load Painting services', { theme: 'colored' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="my-4">
            <h2 className="mb-4 text-center">Painting Services</h2>
            <p className="mb-5 text-center text-muted" style={{ maxWidth: 600, margin: '0 auto' }}>
                Professional Painting services for your home, factory, or apartment. Our expert painters ensure quality work and customer satisfaction.
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
                        <div className="text-center text-muted">No Painting services found.</div>
                    )}
                </Row>
            )}
        </Container>
    );
}

export default DisplayPainting;
