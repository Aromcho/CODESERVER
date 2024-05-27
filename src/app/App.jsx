import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx';
import Carrito from './components/Carrito/Carrito.jsx';
import Face from './components/Face/Face.jsx';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Checkout from './components/Checkout/Checkout.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Face />} />
        <Route path="/user/login" element={<Login/>} />
        <Route path="/user/register" element={<Register/>} />
        <Route path="/products/real" element={<ItemListContainer />} />
        <Route path="/products/real/:category" element={<ItemListContainer />} />
        <Route path="/products/:productId" element={<ItemDetailContainer />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/ticket" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;