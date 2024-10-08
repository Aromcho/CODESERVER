import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { GoogleLogin } from 'react-google-login';
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
      role,
      photo,
      age,
      name,
    };

    try {
      const response = await axios.post('/api/sessions/register', user);
      if (response.status === 201) {
        Swal.fire('¡Registrado!', 'Has creado tu cuenta con éxito.', 'success').then(() => {
          window.location.replace('/');
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire('¡Error!', 'El email ya está en uso.', 'error');
      } else {
        Swal.fire('¡Error!', 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.', 'error');
      }
    }
  };

  const responseGoogle = async (response) => {
    const { tokenId } = response;
    try {
      const res = await axios.post('/api/sessions/google/callback', { tokenId });
      if (res.status === 200) {
        Swal.fire('¡Registrado con Google!', 'Has creado tu cuenta con éxito usando Google.', 'success').then(() => {
          window.location.replace('/');
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire('¡Error!', 'Ha ocurrido un error al intentar registrarse con Google.', 'error');
    }
  };

  return (
    <Container className="my-2 text-white">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="card-custom">
            <Card.Body className="bg-dark-custom">
              <Card.Title className="mb-4 text-white">Registrarse</Card.Title>
              <GoogleLogin
                clientId="988198119199-cv4n71shuifrgu9i9s1cf22338497kbf.apps.googleusercontent.com"
                buttonText="Registrarse con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                className="w-100 btn-google mb-3"
              />

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2" controlId="formBasicName">
                  <Form.Label className="text-white">Nombre y Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label className="text-white">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label className="text-white">Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicRole">
                  <Form.Label className="text-white">Rol</Form.Label>
                  <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Selecciona tu rol</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                    <option value="PREM">PREM</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicAge">
                  <Form.Label className="text-white">Edad</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingresa tu edad"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 btn-custom"
                >
                  Registrarse
                </Button>
              </Form>
              <Card.Text className="text-center mt-3 text-white-custom">
                <Link to="/user/login">¿Ya tienes una cuenta? Inicia sesión</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
