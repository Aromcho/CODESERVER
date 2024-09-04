import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { CartContext } from "../../context/CartContext.jsx";

const Cart = () => {
  const { cartItems, borrarProducto, fetchCartItems, getTotalPrice, total, userId, borrarTodo } = useContext(CartContext);

  useEffect(() => {
    if (userId) {
      fetchCartItems(userId);
      getTotalPrice(userId);
    }
  }, [userId]);

  if (!cartItems.length) {
    return (
      <Container className="text-center mt-5">
        <h2>Tu carrito está vacío</h2>
        <Link to="/products/real">
          <Button variant="primary">Volver a la tienda</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Carrito de Compras</h2>
      {cartItems.map((item) => (
        <Card className="mb-3" key={item._id} style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <Row className="no-gutters">
            <Col md={4} className="p-3">
              <Card.Img variant="top" src="https://files.cdn.printful.com/o/upload/bfl-image/42/11354_l_t-shirt-Design-Examples-mockup_Art-with-text.png" style={{ borderRadius: "5px" }} />
            </Col>
            <Col md={8} className="d-flex flex-column justify-content-between">
              <Card.Body>
                {item.product_id && (
                  <>
                    <Card.Title style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                      {item.product_id.title}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "1rem", color: "#007bff" }}>
                      Precio: {item.product_id.price}
                    </Card.Text>
                  </>
                )}
                <div className="d-flex justify-content-between align-items-center">
                  <Button variant="outline-danger" onClick={() => borrarProducto(item._id)}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4>Total: ${total}</h4>
        <div>
          <Button variant="danger" onClick={borrarTodo}>
            Vaciar carrito
          </Button>
          <Button as={Link} to="/checkout" variant="success" className="ms-3">
            Ir a pagar
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
