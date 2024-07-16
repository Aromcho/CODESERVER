import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const CartManagement = () => {
  const [carts, setCarts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get('/api/cart');
        console.log('API response:', response.data);

        if (response.data && response.data.statusCode === 200 && Array.isArray(response.data.response)) {
          setCarts(response.data.response);
        } else if (response.data && response.data.statusCode === 404) {
          setError('No carts found.');
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching carts:', error);
        setError(error.message);
      }
    };

    fetchCarts();
  }, []);

  const handleDelete = async (cartId) => {
    try {
      await axios.delete(`/api/cart/${cartId}`);
      setCarts(carts.filter(cart => cart._id !== cartId));
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };

  const handleViewDetails = (cartId) => {
    console.log(`Detalles del carrito ${cartId}`);
    // Aquí podrías abrir un modal o navegar a otra página con los detalles del carrito
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        {carts.length > 0 ? (
          carts.map((cart) => (
            <tr key={cart._id}>
              <td>{cart._id}</td>
              <td>{cart.user_id.email}</td>
              <td>{cart.product_id.title}</td>
              <td>{`$${cart.product_id.price}`}</td>
              <td>
                <Button variant="info" onClick={() => handleViewDetails(cart._id)} className="me-2">
                  Ver Detalles
                </Button>
                <Button variant="danger" onClick={() => handleDelete(cart._id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No carts found</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default CartManagement;
