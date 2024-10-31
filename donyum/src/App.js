import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import productos from './data/productos.json';

function App() {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : {};
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const limpiarCarrito = () => {
    setCarrito({});
    localStorage.removeItem('carrito');
  };

  return (
    <Router>
      <div className="App">
        <Navbar carrito={carrito} />
        <Routes>
          <Route path="/" element={<ProductList carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/cart" element={<Cart carrito={carrito} setCarrito={setCarrito} productos={productos} />} />
          <Route path="/checkout" element={<Checkout carrito={carrito} productos={productos} limpiarCarrito={limpiarCarrito} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
