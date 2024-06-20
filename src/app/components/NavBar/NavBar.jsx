import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cart from '../Carrito/Carrito.jsx';
import axios from 'axios';
import { CartContext } from "../../context/CartContext.jsx";
import Swal from 'sweetalert2';

const NavBar = () => {
  const [isOnline, setIsOnline] = useState(false);

  const { cartItems, isAdmin } = useContext(CartContext);

  useEffect(() => {
    const checkOnlineStatus = async () => {
      try {
        const response = await axios.get("/api/sessions/online");
        setIsOnline(response.status === 200);
       
      } catch (error) {
        setIsOnline(false);
      }
    };

    checkOnlineStatus();
  }, []);
  const logout = async () => {
    try {
      const response = await axios.post('/api/sessions/signout');
      if (response.status === 200) {
        // aletra con sweetalert
        Swal.fire({
          icon: 'success',
          title: '¡Sesión cerrada!',
          text: 'Has cerrado la sesión correctamente.',
          confirmButtonText: 'OK'
        });
        setIsOnline(false);
      } else {
        console.error('Error al cerrar la sesión');
        // alerta con sweetalert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al cerrar la sesión.',
          confirmButtonText: 'OK'
        });


      }
    } catch (error) {
      console.error('Error al cerrar la sesión', error);
    }
  };
  const renderAuthButtons = () => {
    if (isOnline) {
      return (
        <>
          {isAdmin ? (
            <h5 className='text-white m-1'>Hola Administrador</h5>
          ) : (
            <Cart cartItems={cartItems} />
          )}
          <Button className="ms-1" as={Link} to="/" onClick={logout} variant="dark">
            Cerrar sesión
          </Button>
        </>
      );
    } else {
      return (
        <Button className="ms-1" as={Link} to="/user/login" variant="dark">
          Iniciar sesión
        </Button>
      );
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Aroncho´s
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products/real">
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/user">
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/user/register">
              Registrarse
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/Orders">
              Pedidos
            </Nav.Link>
          </Nav>
          {renderAuthButtons()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;