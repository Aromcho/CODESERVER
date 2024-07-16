import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // Importa el archivo de estilos CSS

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light text-center p-3">
            <Container>
                <Row>
                    <Col>
                        <p>© 2023 Mi Tienda de Ropa</p>
                    </Col>
                    <Col>
                        <Link to="/privacy-policy" className="text-light">
                            Política de Privacidad
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/contact" className="text-light">
                            Contacto
                        </Link>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
