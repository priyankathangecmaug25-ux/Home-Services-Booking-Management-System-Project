 import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { getAllHomeServices } from "../api/api";

export default function HomeServices() {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState({ name: "", category: "" });

  useEffect(() => {
    async function load() {
      try {
        const res = await getAllHomeServices();
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const filtered = services.filter(s => {
    const matchName = !filter.name || s.name.toLowerCase().includes(filter.name.toLowerCase());
    const matchCat = !filter.category || s.category.toLowerCase().includes(filter.category.toLowerCase());
    return matchName && matchCat;
  });

  return (
    <Container>
      <h1 className="text-center mt-4">Home Services</h1>

      {/* FILTERS */}
      <Form className="mb-4">
        <Row className="g-2">
          <Col md={5}>
            <Form.Control 
              placeholder="Search service by name"
              value={filter.name}
              onChange={e => setFilter({ ...filter, name: e.target.value })}
            />
          </Col>
          <Col md={5}>
            <Form.Control 
              placeholder="Category (Cleaning, Plumbing, Painting...)"
              value={filter.category}
              onChange={e => setFilter({ ...filter, category: e.target.value })}
            />
          </Col>
          <Col md={2}>
            <Button className="w-100" variant="primary">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {/* LIST SERVICES */}
      <Row xs={1} md={2} lg={3} className="g-3">
        {filtered.map(service => (
          <Col key={service.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={service.image_url} height="200px" style={{ objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{service.name}</Card.Title>
                <Card.Text>
                  Category: {service.category} <br />
                  {service.description} <br />
                  <b>₹{service.price}</b>
                </Card.Text>
                <Button href={`/book-service/${service.id}`} variant="primary">Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
