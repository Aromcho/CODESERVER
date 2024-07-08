import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Bell, GraphUp, Basket, Gear } from 'react-bootstrap-icons';

function HomeCards() {
  return (
    <Row>
      <Col xs={12} sm={6} md={3}>
        <Card bg="primary" text="white" className="mb-3 text-center">
          <Card.Body>
            <Bell size={50}/> {/* Icono de Notificaciones */}
            <Card.Title>Notificaciones</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} sm={6} md={3}>
        <Card bg="primary" text="white" className="mb-3 text-center">
          <Card.Body>
            <Basket size={50}/> {/* Icono de Productos más vendidos */}
            <Card.Title>más vendidos</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} sm={6} md={3}>
        <Card bg="primary" text="white" className="mb-3 text-center">
          <Card.Body>
            <GraphUp size={50}/> {/* Icono de Analítica */}
            <Card.Title>Analítica</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} sm={6} md={3}>
        <Card bg="primary" text="white" className="mb-3 text-center">
          <Card.Body>
            <Gear size={50}/> {/* Icono de Configuración */}
            <Card.Title>Configuración</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default HomeCards;