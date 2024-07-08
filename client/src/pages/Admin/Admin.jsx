import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext.jsx' // Asegúrate de ajustar la ruta al archivo CartProvider
import OrderManagement from './OrderManagement/OrderManagement.jsx';
import ProductManagement from './ProductManagement/ProductManagement.jsx';
import UserManagement from './UserManagement/UserManagement.jsx';
import CartManagement from './CartManagement/CartManagement.jsx';
import AdminAppBar from './AdminAppBar/AdminAppBar.jsx';
import HomeCards from './HomeCards/HomeCards.jsx';
import BioCard from './BioCard/BioCard.jsx';

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState('pedidos');
  const { isAdmin } = useContext(CartContext); // Consumiendo el contexto

  const renderComponent = () => {
    switch (activeComponent) {
      case 'pedidos':
        return <OrderManagement />;
      case 'productos':
        return <ProductManagement />;
      case 'usuarios':
        return <UserManagement />;
      case 'carritos':
        return <CartManagement />;
      default:
        return <OrderManagement />;
    }
  };

  if (!isAdmin) {
    return (
      <div className="text-center">
        <h1 className="text-danger">Acceso denegado</h1>
        <p>No tienes permiso para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div>
      <AdminAppBar />
      <Container fluid className="bg-dark" style={{ display: 'flex' }}>
        <Navbar bg="dark" variant="dark" className="flex-column mt-5">
          <Nav className="flex-column">
            {[
              { name: 'Pedidos', icon: 'cart-fill' },
              { name: 'Productos', icon: 'box-seam' },
              { name: 'Usuarios', icon: 'people-fill' },
              { name: 'Carritos', icon: 'cart4' }
            ].map((item, index) => (
              <Nav.Link key={index} onClick={() => setActiveComponent(item.name.toLowerCase())}>
                <i className={`bi ${item.icon}`} style={{ marginRight: '8px' }}></i>
                {item.name}
              </Nav.Link>
            ))}
            <BioCard />
          </Nav>
        </Navbar>
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <HomeCards />
          <h1 className='text-white'>Usuarios</h1>
          {renderComponent()}
        </main>
      </Container>
    </div>
  );
};

export default Admin;
