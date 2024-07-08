import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Dropdown, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './AdminAppBar.css'; // Asegúrate de crear este archivo CSS para personalizaciones adicionales

const AdminAppBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Navbar className='d-flex justify-content-around p-3' bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="#home">Panel de Administrador</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse  id="basic-navbar-nav">
        <Nav className="mr-auto d-flex justify-content-center w-100">
          <Form inline className='d-flex  '>
            <FormControl type="text" placeholder="Buscar en el panel…" className="mr-sm-2 search-input" />
            <Button variant="outline-info" className="search-button">
              <FontAwesomeIcon icon={faSearch} size="lg" />
            </Button>
          </Form>
        </Nav>
        <Nav className='d-flex justify-content-end w-100 align-items-center'>
          <Button variant="outline-light" className="mr-3 notification-button">
            <Badge variant="danger">17</Badge>
            <FontAwesomeIcon icon={faBell} size="lg" />
          </Button>
          <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)} className="user-dropdown">
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic" className="dropdown-toggle">
              <FontAwesomeIcon icon={faUserCircle} size="lg" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item href="#/action-1">Mi cuenta</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminAppBar;