import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './LocationSection.css';

const LocationSection = () => {
  return (
    <Container className=" location-section">
      <h2 className="text-center mb-4">Nuestra Ubicación</h2>
      <Row className="location-row mb-3">
      <Col md={7} className="location-map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.462872009808!2d-58.43866762486943!3d-34.61774145823793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca46cf171971%3A0xfbf60609e4d370ce!2sDolores%20Pidr%C3%A9!5e0!3m2!1ses-419!2sar!4v1722099882077!5m2!1ses-419!2sar" 
            width="600" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        </Col>
        <Col md={5} className="location-text p-4 rounded">
          <h3>Visítanos en Nuestra Tienda</h3>
          <p >Galería París, local 67, Av. Rivadavia 4975/77, local 67, 1424 Buenos Aires</p>
          
          <Button variant="outline-light" size="lg" className="mt-3">
            Obtener Direcciones
          </Button>
        </Col>
        
      </Row>
    </Container>
  );
};

export default LocationSection;
