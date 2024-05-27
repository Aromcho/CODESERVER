import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
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

    try {
      const response = await axios.post("/api/user", user);
      Swal.fire(
        "¡Buen trabajo!",
        "Usuario registrado con éxito",
        "success"
      ).then(() => {
        window.location.replace("/user/login"); // Redirige al usuario a la página de inicio de sesión
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error al intentar registrarse.",
      });
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
                <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;