import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Cart from '../Carrito/Carrito.jsx';
import axios from 'axios';
import { CartContext } from "../../context/CartContext.jsx";
import Swal from 'sweetalert2';
import BioCard from '../../pages/Admin/BioCard/BioCard.jsx';

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
        Swal.fire({
          icon: 'success',
          title: '¡Sesión cerrada!',
          text: 'Has cerrado la sesión correctamente.',
          confirmButtonText: 'OK'
        });
        setIsOnline(false);
      } else {
        console.error('Error al cerrar la sesión');
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
          <Dropdown className="ms-1">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Perfil
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" variant="dark">
              <Dropdown.Item as="div">
                <BioCard />
                <Button className=" w-100 mt-2" as={Link} to="/" onClick={logout} variant="dark">
                  Cerrar sesión
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      );
    } else {
      return (
        <div className="auth-buttons">
          <Button className="ms-1" as={Link} to="/user/login" variant="dark">
            Iniciar sesión
          </Button>
          <Button className="ms-1" as={Link} to="/user/register" variant="dark">
            Registrarse
          </Button>
        </div>
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
              Tienda
            </Nav.Link>
          </Nav>
          {renderAuthButtons()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
