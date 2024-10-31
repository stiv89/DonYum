import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Navbar = ({ carrito }) => {
  const totalItems = Object.values(carrito).reduce((sum, cantidad) => sum + cantidad, 0);

  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        {/* Logo clickeable que redirige a la página de inicio */}
        <Link to="/" style={styles.logoLink}>
          <img src={logo} alt="Don Yum" style={styles.logo} />
        </Link>
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
    padding: '15px 30px',
    background: 'rgba(51, 51, 51, 0.5)', // Fondo gris translúcido
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    color: '#fff',
    margin: '10px 20px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoLink: {
    textDecoration: 'none',
  },
  logo: {
    height: '50px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    padding: '10px 15px',
    borderRadius: '8px',
    transition: '0.3s',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
  },
  cart: {
    fontSize: '20px',
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    transition: '0.3s',
  },
};

export default Navbar;
