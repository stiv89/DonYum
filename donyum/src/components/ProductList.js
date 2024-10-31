import React, { useState } from 'react';
import productos from '../data/productos.json';

const ProductList = ({ carrito, setCarrito }) => {
  const [filtro, setFiltro] = useState("Todos");

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => ({
      ...prev,
      [producto.id]: (prev[producto.id] || 0) + 1,
    }));
  };

  const quitarDelCarrito = (producto) => {
    setCarrito((prev) => {
      const nuevoCarrito = { ...prev };
      if (nuevoCarrito[producto.id] > 0) nuevoCarrito[producto.id] -= 1;
      return nuevoCarrito;
    });
  };

  const filtrarProductos = filtro === "Todos" ? productos : productos.filter((p) => p.categoria === filtro);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Productos y Servicios</h2>

      {/* Filtros de categoría */}
      <div style={styles.filtros}>
        <button style={styles.filterButton} onClick={() => setFiltro("Todos")}>Todos</button>
        <button style={styles.filterButton} onClick={() => setFiltro("Ensaladas y Vinagretas")}>Ensaladas y Vinagretas</button>
        <button style={styles.filterButton} onClick={() => setFiltro("Carnes y Acompañamientos")}>Carnes y Acompañamientos</button>
        <button style={styles.filterButton} onClick={() => setFiltro("Bocaditos y Aperitivos")}>Bocaditos y Aperitivos</button>
        <button style={styles.filterButton} onClick={() => setFiltro("Tradicionales y Dulces")}>Tradicionales y Dulces</button>
      </div>

      {/* Lista de productos */}
      <div style={styles.productList}>
        {filtrarProductos.map((producto) => (
          <div key={producto.id} style={styles.producto}>
            <img src={producto.imagen} alt={producto.nombre} style={styles.imagen} />
            <h3 style={styles.productName}>{producto.nombre}</h3>
            <p style={styles.productDescription}>{producto.descripcion}</p>
            <p style={styles.productPrice}>Precio: {producto.precio.toLocaleString()} Gs</p>
            <div style={styles.cantidad}>
              <button onClick={() => quitarDelCarrito(producto)} style={styles.quantityButton}>-</button>
              <span style={styles.quantityDisplay}>{carrito[producto.id] || 0}</span>
              <button onClick={() => agregarAlCarrito(producto)} style={styles.quantityButton}>+</button>
            </div>
            <button onClick={() => agregarAlCarrito(producto)} style={styles.addButton}>
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #333, #555)', // Fondo degradado gris oscuro
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2rem',
    color: '#fff',
    marginBottom: '20px',
    textShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  filtros: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  filterButton: {
    padding: '10px 15px',
    borderRadius: '10px',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    transition: '0.3s',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  producto: {
    width: '220px',
    padding: '20px',
    borderRadius: '15px',
    background: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.3s ease',
  },
  productName: {
    color: '#fff',
    fontSize: '1.2rem',
    margin: '10px 0',
  },
  productDescription: {
    color: '#e0e0e0',
    fontSize: '0.9rem',
    marginBottom: '10px',
  },
  productPrice: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  cantidad: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  quantityButton: {
    padding: '5px 10px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  quantityDisplay: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    padding: '10px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: '0.3s',
  },
  imagen: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '10px',
  },
};

export default ProductList;
