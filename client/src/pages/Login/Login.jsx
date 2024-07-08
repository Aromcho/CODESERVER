import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post('/api/sessions/login', user);

      const statusResponse = await axios.get('/api/sessions/online');
      if (statusResponse.data.role === 'admin') {
        window.location.replace('/admin');
      } else {
        window.location.replace('/');
      }
      console.log(response);

    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrectos.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error al intentar iniciar sesión.',
        });
      }
    }
  };

  const handleGoogleSuccess = async (response) => {
    const { tokenId } = response;
    try {
      const res = await axios.post('/api/sessions/google', { tokenId });
      const statusResponse = await axios.get('/api/sessions/online');
      if (statusResponse.data.role === 'admin') {
        window.location.replace('/admin');
      } else {
        window.location.replace('/');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error al intentar iniciar sesión con Google.',
      });
    }
  };

  const handleGoogleFailure = (response) => {
    console.error(response);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El inicio de sesión con Google ha fallado.',
    });
  };

  return (
    <Container className="my-5 text-white">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="mt-4 card-custom">
            <Card.Body className="bg-dark-custom">
              <Card.Title className="mb-4 text-white">Iniciar sesión</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-white">Email</Form.Label>
                  <Form.Control type="email" placeholder="Introduce tu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-white">Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 btn-custom">
                  Iniciar sesión
                </Button>
              </Form>
              <GoogleLogin
                clientId="TU_CLIENT_ID_DE_GOOGLE"
                buttonText="Iniciar sesión con Google"
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                cookiePolicy={'single_host_origin'}
                className="w-100 mt-3 btn-google"
              />
              <Card.Text className="text-center mt-3 text-white-custom">
                <Link to="/user/register">¿No tienes una cuenta? Regístrate</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
