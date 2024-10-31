import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Navbar = ({ carrito }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const totalItems = Object.values(carrito).reduce((sum, cantidad) => sum + cantidad, 0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setMenuOpen(false); // Cerrar menú si se expande a pantalla grande
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActiveLink = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        <Link to="/" style={styles.logoLink}>
          <img src={logo} alt="Don Yum" style={styles.logo} />
        </Link>
      </div>

      {/* Botón de menú hamburguesa para pantallas pequeñas */}
      {isMobile && (
        <button onClick={toggleMenu} style={styles.hamburger}>
          ☰
        </button>
      )}

      {/* Menú desplegable cuando el botón hamburguesa está activo */}
      {menuOpen && isMobile && (
        <div style={styles.dropdownMenu}>
          <Link to="/" style={isActiveLink('/') ? { ...styles.link, ...styles.activeLink } : styles.link}>Inicio</Link>
          <Link to="/about" style={isActiveLink('/about') ? { ...styles.link, ...styles.activeLink } : styles.link}>Sobre Nosotros</Link>
          <Link to="/contact" style={isActiveLink('/contact') ? { ...styles.link, ...styles.activeLink } : styles.link}>Contacto</Link>
        </div>
      )}

      {/* Links visibles en pantallas grandes */}
      {!isMobile && (
        <div style={styles.links}>
          <Link to="/" style={isActiveLink('/') ? { ...styles.link, ...styles.activeLink } : styles.link}>Inicio</Link>
          <Link to="/about" style={isActiveLink('/about') ? { ...styles.link, ...styles.activeLink } : styles.link}>Sobre Nosotros</Link>
          <Link to="/contact" style={isActiveLink('/contact') ? { ...styles.link, ...styles.activeLink } : styles.link}>Contacto</Link>
        </div>
      )}

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
    background: 'rgba(51, 51, 51, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    color: '#fff',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoLink: {
    textDecoration: 'none',
  },
  logo: {
    height: '40px',
    borderRadius: '8px',
  },
  links: {
    display: 'flex',
    gap: '15px',
    flexDirection: 'row',
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: '0.3s',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
  },
  activeLink: {
    background: 'rgba(255, 255, 255, 0.3)', // Estilo resaltado para el enlace activo
    color: '#fff',
  },
  cart: {
    fontSize: '18px',
    color: '#fff',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
  },
  hamburger: {
    fontSize: '24px',
    color: '#fff',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '60px',
    right: '10px',
    background: 'rgba(51, 51, 51, 0.95)',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    zIndex: '10000', // Aumentamos el zIndex para asegurar que esté al frente
  },
};

export default Navbar;
