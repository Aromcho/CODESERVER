import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Face.css';
import ItemListContainer from '../ItemListContainer/ItemListContainer.jsx';

const Face = () => {
  return (
    <div>
      {/* Sección Hero */}
      <div className="hero d-flex align-items-center justify-content-center flex-column">
        <div className="overlay w-100 d-flex align-items-center justify-content-center flex-column">
          <h1 className="display-3 text-white">
            Bienvenido a Mi Tienda de Ropa
          </h1>
          <p className="lead text-light">
            La moda que buscas, en un solo lugar.
          </p>

          <Link to="/products/real">
            <Button variant="outline-light" size="lg">
              Explora Nuestros Productos
            </Button>
          </Link>
        </div>
      </div>

      {/* Sección de Categorías Destacadas */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Categorías Destacadas</h2>
        <Row className="category-row mb-3">
          <Col md={7} className="category-img">
            <img
              src="https://st2.depositphotos.com/1010550/8116/i/450/depositphotos_81167544-stock-photo-handsome-skater-boy-using-his.jpg"
              alt="Hombres"
            />
          </Col>
          <Col md={5} className="category-text p-4 rounded">
            <h3>Hombres</h3>
            <p>Explora las últimas tendencias para hombres.</p>
            <Link to="/category/men">
              <Button variant="outline-light" size="lg">
                Ver Más
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="category-reverse category-row mb-3">
          <Col md={5} className="category-text-2 p-4 rounded">
            <h3>Mujeres</h3>
            <p>Descubre la moda femenina para toda ocasión.</p>
            <Link to="/category/women">
              <Button variant="outline-light" size="lg">
                Ver Más
              </Button>
            </Link>
          </Col>
          <Col md={7} className="category-img">
            <img
              src="https://deportesriesgo.com/wp-content/uploads/Mejor-ropa-de-skate.jpg"
              alt="Mujeres"
            />
          </Col>
        </Row>
        <Row className="category-row mb-3 ">
          <Col md={7} className="category-img">
            <img
              src="https://growoldbcn.com/cdn/shop/articles/skate.jpg?v=1589962181"
              alt="Accesorios"
            />
          </Col>
          <Col md={5} className="category-text p-4 rounded">
            <h3>Accesorios</h3>
            <p>Complementa tu estilo con los mejores accesorios.</p>
            <Link to="/category/accessories">
              <Button variant="outline-light" size="lg">
                Ver Más
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>

      {/* Mejoras en la Sección de Productos Populares */}
      <Container className="my-5 popular-products-section">
        <h2 className="text-center mb-4 section-title">Productos Populares</h2>
        <ItemListContainer />
      </Container>

      {/* Mejoras en la Sección de Suscripción */}
      <div className="subscription-section text-center p-5">
        <div className="subscription-content">
          <h2 className="subscription-title">Únete a Nuestro Boletín</h2>
          <p>Recibe las últimas noticias y ofertas exclusivas.</p>
          <form className="subscription-form">
            <input type="email" placeholder="Tu correo electrónico" />
            <Button variant="primary" size="lg">
              Suscribirse
            </Button>
          </form>
        </div>
      </div>
      <div className="testimonials-section text-center my-5">
        <Container>
          <h2 className="mb-4">Lo Que Dicen Nuestros Clientes</h2>
          <Row>
            <Col md={4}>
              <div className="testimonial">
                <p className="testimonial-text">
                  "¡La mejor tienda de ropa! Siempre encuentro lo que busco y
                  más."
                </p>
                <p className="testimonial-author">- Alex M.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="testimonial">
                <p className="testimonial-text">
                  "Increíble calidad y excelente servicio al cliente. ¡Muy
                  recomendado!"
                </p>
                <p className="testimonial-author">- Daniela R.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="testimonial">
                <p className="testimonial-text">
                  "Variedad y estilo en un solo lugar. Siempre me sorprenden con
                  sus colecciones."
                </p>
                <p className="testimonial-author">- Carlos S.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      
    </div>
  );
};

export default Face;
