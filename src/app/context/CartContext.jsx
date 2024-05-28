import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

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

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = async (product) => {
    try {
      const userResponse = await axios.get("/api/sessions/online");
      const userId = userResponse.data.user_id;
      const response = await axios.post(`/api/cart/`, {
        product_id: product._id,
        user_id: userId,
      });
      if (response.status === 200) {
        setCartItems([...cartItems, product]);
        Swal.fire({
          icon: "success",
          title: "¡Producto añadido al carrito!",
          text: `${product.title} se ha añadido a tu carrito.`,
          confirmButtonText: "OK",
        });
      } else {
        console.error("Error al agregar el producto al carrito");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al agregar el producto al carrito.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al agregar el producto al carrito.",
        confirmButtonText: "OK",
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

  const precioTotal = () => {
    const total = cartItems.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    return total;
  };

  const borrarProducto = (idProducto) => {
    const productosFiltrados = cartItems.filter(
      (producto) => producto.id !== idProducto
    );
    setCartItems(productosFiltrados);
  };

  const borrarTodo = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        cantidadTotal,
        borrarTodo,
        precioTotal,
        borrarProducto,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };