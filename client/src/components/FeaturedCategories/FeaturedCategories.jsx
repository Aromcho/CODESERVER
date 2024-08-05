// FeaturedCategories.jsx

import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext.jsx';
import HorizontalProductList from '../HorizontalProductList/HorizontalProductList.jsx'; // Corrected import path
import './FeaturedCategories.css';

const FeaturedCategories = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <Container className="mt-5 d-flex align-items-center justify-content-center flex-column">
      <h3 className="banner display-3 text-dark text-center pb-5">Más de 50 años de trayectoria en Caballito</h3>

      <Row className="category-row mb-3">
        <Col md={7} className="category-img">
          <img
            src="https://www.italiano-al-caffe.com/wp-content/uploads/2023/05/outfit-para-viajar-a-italia1.jpeg"
            alt="Primavera | Verano"
          />
        </Col>
        <Col md={5} className="category-text p-4 rounded">
          <h3>Primavera | Verano</h3>
          <p>Explora las últimas tendencias primavera | verano.</p>
        </Col>
      </Row>
      <HorizontalProductList  category="Blusas" addToCart={addToCart} /> {/* Horizontal scroll list for "Blusas" */}

      <Row className="category-reverse category-row mb-3">
        <Col md={5} className="category-text-2 p-4 rounded">
          <h3>Otoño | Invierno</h3>
          <p>Descubre la moda femenina para toda ocasión.</p>
        </Col>
        <Col md={7} className="category-img">
          <img
            src="https://album.mediaset.es/eimg/10000/2021/05/09/clipping_4kHzfm_4c97.jpg"
            alt="Otoño | Invierno"
          />
        </Col>
      </Row>
      <HorizontalProductList category="Camperas Importadas" addToCart={addToCart} /> {/* Horizontal scroll list for "Camperas Importadas" */}

      <Row className="category-row mb-3">
        <Col md={7} className="category-img">
          <img
            src="https://e00-telva.uecdn.es/assets/multimedia/imagenes/2022/12/26/16720195986169.jpg"
            alt="Accesorios"
          />
        </Col>
        <Col md={5} className="category-text p-4 rounded">
          <h3>Accesorios</h3>
          <p>Complementa tu estilo con los mejores accesorios.</p>
        </Col>
      </Row>
      <HorizontalProductList category="Sweaters" addToCart={addToCart} /> {/* Horizontal scroll list for "Sweaters" */}

    </Container>
  );
};

export default FeaturedCategories;
