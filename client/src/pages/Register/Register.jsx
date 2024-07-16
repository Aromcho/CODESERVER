import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importa withRouter en lugar de useHistory
import "./Register.css";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => { // Añade props como argumento
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");

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
    // crear el usuario
    
    try {
      const response = await axios.post("/api/sessions/register", user);
      if (response.status === 200) {
        Swal.fire("¡Registrado!", "Has creado tu cuenta con éxito.", "success").then(() => {
          window.location.replace('/');
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire("¡Error!", "El email ya está en uso.", "error");
      } else {
        // Manejo de otros errores o códigos de estado no esperados
        Swal.fire("¡Error!", "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.", "error");
      }
    }
  };


  return (
    <Container className="my-2 text-white">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="card-custom">
            <Card.Body className="bg-dark-custom">
              <Card.Title className="mb-4 text-white">Registrarse</Card.Title>
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
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="dev">Dev</option>
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
