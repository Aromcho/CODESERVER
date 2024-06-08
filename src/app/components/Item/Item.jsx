import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const Item = ({ product, addToCart }) => (
  <Card className="h-100 bg-dark text-white">
    <div className="card-image-wrapper">
      <Button
        onClick={() => {
          addToCart(product);
        }}
        className="add-to-cart-button "
      >
        +
      </Button>
      <Card.Img
        src="https://files.cdn.printful.com/o/upload/bfl-image/42/11354_l_t-shirt-Design-Examples-mockup_Art-with-text.png"
        alt={product.title}
      />
    </div>
    <Link
      className="text-decoration-none text-white"
      to={`/products/${product._id}`}
    >
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>Categoría: {product.category}</Card.Text>
        <Card.Text>Precio: ${product.price}</Card.Text>
      </Card.Body>
    </Link>
    <Link to={`/products/${product._id}`} className="btn btn-primary mt-2">
      Ver detalles
    </Link>
  </Card>
);

export default Item;
