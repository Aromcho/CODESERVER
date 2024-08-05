import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Badge, Button, ButtonGroup, Form } from 'react-bootstrap';
import { CartContext } from "../../context/CartContext.jsx";
import './ItemDetail.css';
import Swal from 'sweetalert2';

const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart, isAuthenticated, loginWithRedirect } = useContext(CartContext);
  const [mainImage, setMainImage] = useState(product.photo);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const images = [product.photo, product.photo2, product.photo3, product.photo4].filter(Boolean);

  const handleImageClick = (index) => {
    setMainImage(images[index]);
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setMainImage(images[nextIndex]);
    setCurrentImageIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setMainImage(images[prevIndex]);
    setCurrentImageIndex(prevIndex);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Inicia sesión facil',
        text: 'Necesitas ingresar con google para añadir productos al carrito.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          loginWithRedirect({
            appState: {
              returnTo: window.location.pathname,
              product,
              quantity,
              selectedSize,
              selectedColor,
            },
          });
        }
      });
    } else {
      addToCart(product, quantity, selectedSize, selectedColor);
    }
  };

  return (
    <Container className="my-5 text-dark h-75">
      <Row className="align-items-center">
        <Col md={6}>
          <div className='d-flex flex-column shadow'>
            <div className="position-relative">
              <Image
                src={mainImage}
                className="img-fluid rounded-3 mb-2 card-custom main-image shadow"
                alt={product.title}
              />
              <div className="arrow-left" onClick={handlePrevImage}>
                <i className="bi bi-chevron-left"></i>
              </div>
              <div className="arrow-right" onClick={handleNextImage}>
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  className={`img-thumbnail-small shadow ${mainImage === image ? 'active' : ''}`}
                  alt={product.title}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="p-4 bg-white rounded-3 shadow">
            <h1 className="display-5">{product.title}</h1>
            <p className="fst-italic">Categoría: {product.category}</p>
            <p>{product.description}</p>
            <div className="mb-3">
              <Form.Group>
                <Form.Label className="text-dark">Talles</Form.Label>
                <div className="d-flex flex-wrap">
                  {product.size.map((size, index) => (
                    <Button
                      key={index}
                      variant={selectedSize === size ? "primary" : "outline-primary"}
                      onClick={() => handleSizeClick(size)}
                      className={`m-1 custom-size-btn ${selectedSize === size ? 'selected' : ''}`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label className="text-dark">Colores</Form.Label>
                <div className="d-flex flex-wrap">
                  {product.color.map((color, index) => (
                    <Button
                      key={index}
                      variant={selectedColor === color ? "primary" : "outline-primary"}
                      onClick={() => handleColorClick(color)}
                      className={`m-1 custom-color-btn ${selectedColor === color ? 'selected' : ''}`}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </Form.Group>
            </div>
            <Row className="d-flex justify-content-between align-items-center mt-4">
              <Col>
                <ButtonGroup>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => quantity > 1 ? setQuantity(quantity - 1) : null}
                    className="custom-button"
                  >
                    -
                  </Button>
                  <span className="p-2 mx-2 border border-primary custom-button">{quantity}</span>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => setQuantity(quantity + 1)}
                    className="custom-button"
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Col>
              <Col>
                <Button 
                  variant="outline-primary" 
                  onClick={handleAddToCart} 
                  disabled={!selectedSize || !selectedColor}
                  className="custom-button"
                >
                  Añadir al carrito
                </Button>
              </Col>
              <Col>
                <h2 className="text-end fw-light">${product.price.toFixed(2)}</h2>
              </Col>
            </Row>
            <p className='m-0 pt-1'>Consultar por talle y disponibilidad.</p>
          </div>
        </Col>
      </Row>
      <Button as={Link} to="/products/real" variant="primary" className="mt-3 w-100 custom-button">Volver a la lista</Button>
    </Container>
  );
};

export default ItemDetail;
