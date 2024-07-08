import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const Item = ({ product, addToCart }) => {
  const quantity = 1;
  return ( <Card className="h-100 text-black shadow">
    <div className="card-image-wrapper">
      <Button
        onClick={() => {
          addToCart(product, quantity);
        }}
        className="add-to-cart-button btn-dark"
      >
        +
      </Button>
      <Card.Img
        src="https://files.cdn.printful.com/o/upload/bfl-image/42/11354_l_t-shirt-Design-Examples-mockup_Art-with-text.png"
        alt={product.title}
      />
    </div>
    <Link
      className="text-decoration-none text-black"
      to={`/products/${product._id}`}
    >
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>Categoría: {product.category}</Card.Text>
        <Card.Text>Precio: ${product.price}</Card.Text>
      </Card.Body>
    </Link>
    <Link to={`/products/${product._id}`} className="btn btn-dark mt-2  ">
      Ver detalles
    </Link>
  </Card>)
  
      };

export default Item;
