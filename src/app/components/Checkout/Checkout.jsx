import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Card, Badge, ListGroup, Item } from "react-bootstrap";
import Swal from "sweetalert2";
import { CartContext } from "../../context/CartContext.jsx";


const Checkout = () => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const { cartItems, getTotalPrice, total } = useContext(CartContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    useEffect(() => {
    
      getTotalPrice();
    }, [cartItems, total]);
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
    
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Card>
          <Card.Body>
  <Card.Title>Resumen de la compra</Card.Title>
  <ListGroup variant="flush">
    {cartItems.map((product) => (
      <ListGroup.Item key={product.id}>
        {product.product_id.title} - <Badge bg="secondary">${product.product_id.price}</Badge>
      </ListGroup.Item>
    ))}
  </ListGroup>
  <p>
    Total: <Badge bg="success">${total}</Badge>
  </p>
  <p>
    Cantidad de productos: <Badge bg="info">{cartItems.length}</Badge>
  </p>
</Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2>Detalles de la compra</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Dirección de envío</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu dirección"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Método de pago</Form.Label>
                  <Form.Control
                    as="select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                  >
                    <option value="">Selecciona un método de pago</option>
                    <option value="credit">Tarjeta de crédito</option>
                    <option value="debit">Tarjeta de débito</option>
                    <option value="cash">Efectivo</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Comprar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
  );
};

export default Checkout;