import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import Carrito from "./components/Carrito/Carrito.jsx";
import Face from "./components/Face/Face.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ForgotPassword from "./pages/Login/ForgotPassword.jsx";
import ResetPassword from "./pages/Login/ResetPassword.jsx";


function App() {
  return (
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Face />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/forgot-password" element={<ForgotPassword />} />
            <Route path="/user/reset-password" element={<ResetPassword/>} />
            <Route path="/products/real" element={<ItemListContainer />} />
            <Route path="/products/real/:category" element={<ItemListContainer />}/>
            <Route path="/products/:productId"element={<ItemDetailContainer />}/>
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
  );
}

export default App;