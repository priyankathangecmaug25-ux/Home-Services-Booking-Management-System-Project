// import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { getServiceByCatagory } from '../services/Services';
// import { Container, Row, Col, Spinner } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// function DisplayCleaning() {
//     const navigate = useNavigate();
//     const [services, setServices] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const category = 'Cleaning';

//     useEffect(() => {
//         fetchServiceDetails();
//         // eslint-disable-next-line
//     }, []);

//     const fetchServiceDetails = async () => {
//         try {
//             setIsLoading(true);
//             const response = await getServiceByCatagory(category);
//             // Accept array or object with .services
//             const data = Array.isArray(response.data) ? response.data : (response.data.services || []);
//             setServices(data);
//         } catch (error) {
//             console.error('Error fetching services:', error);
//             toast.error('Failed to load gardening services', { theme: 'colored' });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <Container className="my-4">
//             <h2 className="mb-4 text-center">Cleaning Services</h2>
//             <p className="mb-5 text-center text-muted" style={{ maxWidth: 600, margin: '0 auto' }}>
//                 Explore our top-rated Cleaning services. Book a professional for all your Cleaning maintenance.
//             </p>
//             {isLoading ? (
//                 <div className="text-center my-5">
//                     <Spinner animation="border" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                     </Spinner>
//                 </div>
//             ) : (
//                 <Row className="g-4 justify-content-center">
//                     {services.map((service, idx) => (
//                         <Col key={service.service_id || service.id || idx} md={4} sm={6} xs={12}>
//                             <Card style={{ width: '100%', minHeight: 100, boxShadow: '0 2px 8px #eee' }}>
                                
//                                 <Card.Body>
//                                     <Card.Title>{service.name}</Card.Title>
//                                     <Card.Text style={{ minHeight: 50 }}>
//                                         {service.description?.slice(0, 100)}{service.description && service.description.length > 100 ? '...' : ''}
//                                     </Card.Text>
//                                     <div className="d-flex justify-content-between align-items-center mt-3">
//                                         <span className="fw-bold text-primary">₹{service.price}</span>
//                                         <Button
//                                             variant="primary"
//                                             onClick={() => navigate(`/payment?service_id=${service.service_id || service.id||service.serviceId}&amount=${service.price}`)}
//                                         >
//                                             Proceed to Payment
//                                         </Button>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     ))}
//                     {services.length === 0 && (
//                         <div className="text-center text-muted">No gardening services found.</div>
//                     )}
//                 </Row>
//             )}
//         </Container>
//     );
// }

// export default DisplayCleaning;


import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getServiceByCategory } from '../services/Services';

function DisplayCleaning() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const category = 'Cleaning';

    useEffect(() => {
        fetchServiceDetails();
        // eslint-disable-next-line
    }, []);

    const fetchServiceDetails = async () => {
        try {
            setIsLoading(true);
            const response = await getServiceByCategory(category);
            const data = Array.isArray(response.data) ? response.data : (response.data.services || []);
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
            toast.error('Failed to load cleaning services', { theme: 'colored' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="my-4">
            <h2 className="mb-4 text-center">Cleaning Services</h2>
            <p className="mb-5 text-center text-muted" style={{ maxWidth: 600, margin: '0 auto' }}>
                Explore our top-rated cleaning services. Book a professional for all your cleaning maintenance.
            </p>
            {isLoading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Row className="g-4 justify-content-center">
                    {services.map((service, idx) => (
                        <Col key={service.service_id || service.id || idx} md={4} sm={6} xs={12}>
                            <Card style={{ width: '100%', minHeight: 100, boxShadow: '0 2px 8px #eee' }}>
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
                    ))}
                    {services.length === 0 && (
                        <div className="text-center text-muted">No cleaning services found.</div>
                    )}
                </Row>
            )}
        </Container>
    );
}

export default DisplayCleaning;

