import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const Admin = () => {
    const sections = [
        { title: 'Pedidos', description: 'Gestiona y visualiza todos los pedidos.', link: '/admin/pedidos', icon: 'bi-truck' },
        { title: 'Productos', description: 'Administra los productos de la tienda.', link: '/admin/productos', icon: 'bi-box'},
        { title: 'Usuarios', description: 'Administra los usuarios de la plataforma.', link: '/admin/usuarios', icon: 'bi-people' },
        { title: 'Carritos', description: 'Revisa los carritos de compra activos.', link: '/admin/carritos', icon: 'bi-cart4' },
   
    ];

    return (
        <Container className='mt-5'>
            <Row className="mb-4">
                {sections.map((section, idx) => (
                    <Col key={idx} md={6} className="mb-4">
                        <Card className='bg-dark text-white'>
                            <Card.Body>
                                <Card.Title>
                                    <i className={`bi ${section.icon} me-2`}></i>
                                    {section.title}
                                </Card.Title>
                                <Card.Text>
                                    {section.description}
                                </Card.Text>
                                <Button variant="primary" href={section.link}>Ir a {section.title}</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Admin;