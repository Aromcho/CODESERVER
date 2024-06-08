import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Badge, Button,ButtonGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { CartContext } from "../../context/CartContext.jsx"; // Importar el CartContext

const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { cartItems, addToCart } = useContext(CartContext); // Consumir el CartContext
  
  
  return (
    <Container className="my-5 text-white">
  <Row className="align-items-center">
    <Col md={6}>
      <Image
        src='https://files.cdn.printful.com/o/upload/bfl-image/42/11354_l_t-shirt-Design-Examples-mockup_Art-with-text.png'
        className="img-fluid rounded-3 card-custom"
        alt={product.title}
      />
    </Col>
    <Col md={6}>
      <div className="p-4 bg-dark rounded-3">
        <h1 className="display-5">{product.title}</h1>
        <p className="fst-italic">Categoría: {product.category}</p>
        <p>{product.description}</p>
        <div className="mb-3">
          <Badge style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
            Stock: {product.stock}
          </Badge>
        </div>
        <Row className="d-flex justify-content-between">
          
          <Col >
            <ButtonGroup>
              <Button variant="outline-primary" onClick={() => quantity > 1 ? setQuantity(quantity - 1) : null}>-</Button>
              <span  className="p-2 mx-2 border border-primary">{quantity}</span>
              <Button variant="outline-primary" onClick={() => setQuantity(quantity + 1)}>+</Button>
            </ButtonGroup>
          </Col>
          <Col >
            <Button variant="outline-primary" onClick={() => addToCart(product, quantity)}>Añadir al carrito</Button>
          </Col>
          <Col >
            <h2 className="text-end fw-light">${product.price.toFixed(2)}</h2>
          </Col>
        </Row>
      </div>
    </Col>
  </Row>
  <Button as={Link} to="/products/real" variant="primary" className="mt-3 w-100">Volver a la lista</Button>
</Container>
  )};
export default ItemDetail;