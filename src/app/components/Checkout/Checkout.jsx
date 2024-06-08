import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";

const Checkout = ({ cartItems }) => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de la compra

    try {
      // Simula una petición de compra exitosa
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Swal.fire(
        '¡Compra realizada!',
        'Tu compra se ha realizado con éxito.',
        'success'
      );
    } catch (error) {
      console.error('Hubo un error al realizar la compra', error);
    
      Swal.fire(
        'Error',
        'Hubo un problema al realizar tu compra.',
        'error'
      );
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Información de envío</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="address">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>

                <Card.Title>Método de pago</Card.Title>
                <Form.Group controlId="paymentMethod">
                  <Form.Check
                    type="radio"
                    label="Tarjeta de crédito/débito"
                    id="CreditCard"
                    name="paymentMethod"
                    value="CreditCard"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="PayPal"
                    id="PayPal"
                    name="paymentMethod"
                    value="PayPal"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Finalizar compra
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Resumen del pedido</Card.Title>
              {Array.isArray(cartItems) &&
                cartItems.map((item) => (
                  <Card className="mb-3" key={item._id}>
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <Card.Text>${item.price}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              <h3>
                Total: ${cartItems ? cartItems.reduce((acc, item) => acc + item.price, 0) : 0}
              </h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;