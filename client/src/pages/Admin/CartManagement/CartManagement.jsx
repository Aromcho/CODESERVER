import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const CartManagement = () => {
  const [carts, setCarts] = useState([
    { id: 1, user: 'Usuario 1', products: 3, total: '$150.00' },
    { id: 2, user: 'Usuario 2', products: 5, total: '$250.00' },
    { id: 3, user: 'Usuario 3', products: 2, total: '$100.00' },
    { id: 4, user: 'Usuario 4', products: 1, total: '$50.00'},
    { id: 5, user: 'Usuario 5', products: 4, total: '$200.00'}

    // Agrega más carritos aquí
  ]);

  const handleDelete = (cartId) => {
    setCarts(carts.filter(cart => cart.id !== cartId));
  };

  const handleViewDetails = (cartId) => {
    console.log(`Detalles del carrito ${cartId}`);
    // Aquí podrías abrir un modal o navegar a otra página con los detalles del carrito
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Productos</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {carts.map((cart) => (
          <tr key={cart.id}>
            <td>{cart.id}</td>
            <td>{cart.user}</td>
            <td>{cart.products}</td>
            <td>{cart.total}</td>
            <td>
              <Button variant="info" onClick={() => handleViewDetails(cart.id)} className="me-2">
                Ver Detalles
              </Button>
              <Button variant="danger" onClick={() => handleDelete(cart.id)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CartManagement;