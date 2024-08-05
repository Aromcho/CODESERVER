import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const [securityCode, setSecurityCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put('/api/sessions/password', { token: securityCode, newPassword });
      Swal.fire({
        icon: 'success',
        title: 'Contraseña actualizada',
        text: 'Tu contraseña ha sido actualizada exitosamente.',
      });
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error.response.data);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error al actualizar la contraseña.',
      });
    }
  };

  return (
    <Container className="my-5 text-white">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="mt-4 card-custom">
            <Card.Body className="bg-dark-custom">
              <Card.Title className="mb-4 text-white">Actualizar Contraseña</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicSecurityCode">
                  <Form.Label className="text-white">Código de Seguridad</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Código de Seguridad"
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-white">Nueva Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nueva Contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 btn-custom">
                  Actualizar Contraseña
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
