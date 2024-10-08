import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [total, setTotal] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkIfAdmin = async () => {
      try {
        const statusResponse = await axios.get('/api/sessions/online');
        const { role, user_id } = statusResponse.data;
        setIsAdmin(role === 'ADMIN');
        setUserId(user_id);
        if (user_id) {
          await fetchCartItems(user_id);
          await getTotalPrice(user_id);
        }
      } catch (error) {
        console.error('Error al verificar el estado del usuario', error);
        setIsAdmin(false);
        setUserId(null);
      }
    };

    checkIfAdmin();
  }, []);

  useEffect(() => {
    if (userId) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  const fetchCartItems = async (userId) => {
    try {
      const cartResponse = await axios.get(`/api/cart?user_id=${userId}`);
      setCartItems(cartResponse.data.response || []);
    } catch (error) {
      console.error('Error al obtener los productos del carrito', error);
    }
  };

  const addToCart = async (product, quantity) => {
    try {
      const response = await axios.post('/api/cart/', {
        product_id: product._id,
        user_id: userId,
        quantity,
      });
      if (response.status === 200) {
        setCartItems((prevItems) => [
          ...prevItems,
          {
            _id: response.data._id,
            product_id: product,
            quantity,
          },
        ]);
        Swal.fire({
          icon: 'success',
          title: '¡Producto añadido al carrito!',
          text: `${product.title} se ha añadido a tu carrito.`,
          confirmButtonText: 'OK',
        });
      } else {
        console.error('No se pudo añadir el producto al carrito.');
      }
    } catch (error) {
      console.error('Error al agregar el producto al carrito', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al añadir al carrito',
        text: 'No se pudo añadir el producto al carrito. Por favor, inténtalo de nuevo.',
      });
    }
  };

  const cantidadTotal = () => {
    return cartItems.reduce((total, producto) => total + producto.quantity, 0);
  };

  const getTotalPrice = async (userId) => {
    try {
      const response = await axios.get(`/api/tickets/${userId}`);
      const total = response.data.response?.length ? response.data.response[0].total : 0;
      setTotal(total);
    } catch (error) {
      console.error('Error al obtener el precio total del carrito', error);
    }
  };

  const borrarProducto = async (idProducto) => {
    try {
      const response = await axios.delete(`/api/cart/${idProducto}`);
      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.filter((producto) => producto._id !== idProducto)
        );
      } else {
        console.error('Error al eliminar el producto del carrito');
      }
    } catch (error) {
      console.error('Error al eliminar el producto del carrito', error);
    }
  };

  const borrarTodo = async () => {
    try {
      const response = await axios.delete(`/api/cart/all/${userId}`);
      if (response.status === 200) {
        setCartItems([]);
      } else {
        console.error('Error al eliminar los productos del carrito');
      }
    } catch (error) {
      console.error('Error al eliminar los productos del carrito', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        isAdmin,
        userId,
        addToCart,
        cantidadTotal,
        borrarTodo,
        getTotalPrice,
        borrarProducto,
        fetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
