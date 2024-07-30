import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post('/api/sessions/login', user);
      if (response.data.statusCode === 200) {
        const statusResponse = await axios.get('/api/sessions/online');
        if (statusResponse.data.role === 'admin') {
          window.location.replace('/admin');
        } else {
          window.location.replace('/');
        }
      } else {
        setAlertMessage(response.data.message);
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="my-5 text-white">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="mt-4 card-custom">
            <Card.Body className="bg-dark-custom">
              <Card.Title className="mb-4 text-white">Iniciar sesión</Card.Title>
              
              {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                  {alertMessage}
                </Alert>
              )}

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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-white">Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit" className="w-100 btn-custom">
                  Iniciar sesión
                </Button>
              </Form>
              <Card.Text className="text-center mt-3 text-white-custom">
                <Link to="/user/register">¿No tienes una cuenta? Regístrate</Link>
                <br />
                <Link to="/user/forgot-password">¿Olvidaste tu contraseña?</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
