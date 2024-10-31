import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Navbar = ({ carrito }) => {
  const totalItems = Object.values(carrito).reduce((sum, cantidad) => sum + cantidad, 0);

  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Don Yum" style={styles.logo} />
      </div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Inicio</Link>
        <Link to="/about" style={styles.link}>Sobre Nosotros</Link>
        <Link to="/contact" style={styles.link}>Contacto</Link>
      </div>
      <Link to="/cart" style={styles.cart}>
        🛒 {totalItems > 0 ? `(${totalItems})` : ""}
      </Link>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '50px',
  },
  links: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '16px',
  },
  cart: {
    fontSize: '20px',
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Navbar;
