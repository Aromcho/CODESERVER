import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/sessions/password', { email });
      Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        text: 'Revisa tu correo para restablecer la contraseña.',
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error al enviar el correo.',
      });
    }
  };

  return (
    <Container className="my-5 text-white">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="mt-4 card-custom">
            <Card.Body className="bg-dark-custom">
              <Card.Title className="mb-4 text-white">Recuperar Contraseña</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-white">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Introduce tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 btn-custom">
                  Enviar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
