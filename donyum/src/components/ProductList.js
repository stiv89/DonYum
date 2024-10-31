import React, { useState } from 'react';
import productos from '../data/productos.json'; // Importa los datos de productos

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
      <h2>Productos y Servicios</h2>

      {/* Filtros de categoría */}
      <div style={styles.filtros}>
        <button onClick={() => setFiltro("Todos")}>Todos</button>
        <button onClick={() => setFiltro("Ensaladas y Vinagretas")}>Ensaladas y Vinagretas</button>
        <button onClick={() => setFiltro("Carnes y Acompañamientos")}>Carnes y Acompañamientos</button>
        <button onClick={() => setFiltro("Bocaditos y Aperitivos")}>Bocaditos y Aperitivos</button>
        <button onClick={() => setFiltro("Tradicionales y Dulces")}>Tradicionales y Dulces</button>
      </div>

      {/* Lista de productos */}
      <div style={styles.productList}>
        {filtrarProductos.map((producto) => (
          <div key={producto.id} style={styles.producto}>
            <img src={producto.imagen} alt={producto.nombre} style={styles.imagen} />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>Precio: {producto.precio.toLocaleString()} Gs</p>
            <div style={styles.cantidad}>
              <button onClick={() => quitarDelCarrito(producto)}>-</button>
              <span>{carrito[producto.id] || 0}</span>
              <button onClick={() => agregarAlCarrito(producto)}>+</button>
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
  container: { padding: '20px' },
  filtros: { marginBottom: '20px' },
  productList: { display: 'flex', flexWrap: 'wrap', gap: '20px' },
  producto: { border: '1px solid #ddd', padding: '10px', borderRadius: '5px', width: '200px' },
  cantidad: { display: 'flex', alignItems: 'center', gap: '10px' },
  imagen: { width: '100%', height: 'auto', borderRadius: '5px' },
  addButton: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default ProductList;
