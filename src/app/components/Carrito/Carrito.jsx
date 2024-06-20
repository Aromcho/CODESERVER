import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { CartContext } from "../../context/CartContext.jsx";

const Cart = () => {
  const [show, setShow] = useState(false);
  const { cartItems, borrarProducto, fetchCartItems, getTotalPrice, total, borrarTodo } = useContext(CartContext); // Consumir el CartContext


  const handleShow = () => {
  fetchCartItems();
  setShow(true);
};
  const handleClose = () => setShow(false);

  
  useEffect(() => {
    
    getTotalPrice();
  }, [cartItems, total]);

  return (
    <>
      <Button variant="dark" onClick={handleShow} className="me-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-cart"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>
      </Button>
      <Offcanvas
        className="bg-dark text-white"
        show={show}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {Array.isArray(cartItems) &&
  cartItems.map((item) => (
    <Card className="mb-3" key={item._id}>
  <Row className="no-gutters">
    <Col md={4}>
      <Card.Img
        variant="top"
        src="https://files.cdn.printful.com/o/upload/bfl-image/42/11354_l_t-shirt-Design-Examples-mockup_Art-with-text.png"
      />
    </Col>
    <Col md={8}>
      <Card.Body>
        {item.product_id && (
          <>
            <Card.Title>{item.product_id.title}</Card.Title>
            <Card.Text>Precio: {item.product_id.price}</Card.Text>
          </>
        )}
        <Card.Text>Cantidad: {item.quantity}</Card.Text>
        {/* Añade más detalles del producto aquí */}
      </Card.Body>
    </Col>
    <Col md={12}>
      <Card.Footer className="text-muted d-flex justify-content-end">
        <Button variant="danger" onClick={() => borrarProducto(item._id)}>Eliminar</Button>
      </Card.Footer>
    </Col>
  </Row>
</Card>
  ))}
        </Offcanvas.Body>
        <Offcanvas.Header className="d-flex justify-content-between">
          <Offcanvas.Title>$ {total}</Offcanvas.Title>
          <Button variant="danger" onClick={() => borrarTodo()}>Vaciar carrito</Button>
          <Button  as={Link} to="/checkout" variant="success">Ir a pagar</Button>{' '}
        </Offcanvas.Header>
      </Offcanvas>
    </>
  );
};

export default Cart;