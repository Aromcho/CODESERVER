import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { get } from "mongoose";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const checkIfAdmin = async () => {
      try {
        const statusResponse = await axios.get('/api/sessions/online');
        if (statusResponse.data.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error al verificar el estado del usuario", error);
        setIsAdmin(false); // En caso de error, asumir que el usuario no es administrador
      }
    };
  
    checkIfAdmin();
    fetchCartItems();
    getTotalPrice();
  }, []);


  const fetchCartItems = async () => {
    try {
      const userResponse = await axios.get("/api/sessions/online");
      const userId = userResponse.data.user_id;
      const cartResponse = await axios.get(`/api/cart?user_id=${userId}`);
      const cartItems = cartResponse.data.response;
      setCartItems(cartItems);
    } catch (error) {
      console.error("Error al obtener los productos del carrito", error);
    }
  };

  
  const addToCart = async (product, quantity) => {
    try {
      const userResponse = await axios.get("/api/sessions/online");
      if (userResponse.status !== 200) {
        throw new Error("No se pudo verificar el estado del usuario.");
      }
      const userId = userResponse.data.user_id;
      const response = await axios.post(`/api/cart/`, {
        product_id: product._id,
        user_id: userId,
        quantity: quantity,
      });
      if (response.status === 200) {
        setCartItems(prevItems => [
          ...(Array.isArray(prevItems) ? prevItems : []),
          ...Array(quantity).fill({
            _id: response.data._id, // Asegúrate de que la respuesta del servidor incluye el id del carrito
            product_id: product,
            quantity: quantity,
          }),
        ]);
        Swal.fire({
          icon: "success",
          title: "¡Producto añadido al carrito!",
          text: `${product.title} se ha añadido a tu carrito.`,
          confirmButtonText: "OK",
        });
      } else {
        throw new Error("No se pudo añadir el producto al carrito.");
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito", error);
      Swal.fire({
        icon: "error",
        title: "Error al añadir al carrito",
        text: "No se pudo añadir el producto al carrito. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const cantidadTotal = () => {
    const cantidad = cartItems.reduce(
      (total, producto) => total + producto.cantidad,
      0
    );
    return cantidad;
  };

  // Calcula el precio total de los productos en el carrito
  const getTotalPrice = async () => {
    try {
      const userResponse = await axios.get("/api/sessions/online");
      const userId = userResponse.data.user_id;      
      const response = await axios.get(`/api/tickets/${userId}`);
      setTotal(response.data.response[0].total); 
    } catch (error) {
      console.error("Error al obtener el precio total del carrito", error);
    }
  };

  const borrarProducto = async (idProducto) => {
    try {
      const response = await axios.delete(`/api/cart/${idProducto}`);
      if (response.status === 200) {
        const productosFiltrados = cartItems.filter(
          (producto) => producto._id !== idProducto
        );
        setCartItems(productosFiltrados);
      } else {
        console.error("Error al eliminar el producto del carrito");
      }
    } catch (error) {
      console.error("Error al eliminar el producto del carrito", error);
    }
  };
  // Elimina todos los productos del carrito
  const borrarTodo = async () => {
    try {
      const userResponse = await axios.get("/api/sessions/online");
      const userId = userResponse.data.user_id;
      const response = await axios.delete(`/api/cart/all/${userId}`);
      if (response.status === 200) {
        setCartItems([]);
      } else {
        console.error("Error al eliminar los productos del carrito");
      }
    } catch (error) {
      console.error("Error al eliminar los productos del carrito", error);
    }
  };
  // condicional que si el susario es admin haga una accion
  


  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        isAdmin,
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