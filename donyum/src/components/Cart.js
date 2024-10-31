import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = ({ carrito, setCarrito, productos }) => {
  const navigate = useNavigate();

  // Calcular el total del carrito
  const total = Object.keys(carrito).reduce((acc, id) => {
    const producto = productos.find((p) => p.id === parseInt(id));
    return acc + (carrito[id] * producto.precio);
  }, 0);

  // Función para eliminar un producto del carrito
  const eliminarProducto = (id) => {
    setCarrito((prev) => {
      const nuevoCarrito = { ...prev };
      delete nuevoCarrito[id];
      return nuevoCarrito;
    });
  };

  return (
    <div style={styles.container}>
      <h2>Carrito</h2>
      {Object.keys(carrito).length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul style={styles.list}>
          {Object.keys(carrito).map((id) => {
            const producto = productos.find((p) => p.id === parseInt(id));
            return (
              <li key={id} style={styles.item}>
                <span>{producto.nombre}</span>
                <span>Cantidad: {carrito[id]}</span>
                <span>Precio: {producto.precio.toLocaleString()} Gs</span>
                <button onClick={() => eliminarProducto(id)}>Eliminar</button>
              </li>
            );
          })}
        </ul>
      )}
      <p>Total: {total.toLocaleString()} Gs</p>
      {Object.keys(carrito).length > 0 && (
        <button style={styles.payButton} onClick={() => navigate('/checkout')}>
          Pagar
        </button>
      )}
      <Link to="/">Seguir comprando</Link>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
  },
  payButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Cart;
