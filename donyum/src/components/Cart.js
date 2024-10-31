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

  // Función para aumentar la cantidad de un producto
  const aumentarCantidad = (id) => {
    setCarrito((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  // Función para disminuir la cantidad de un producto
  const disminuirCantidad = (id) => {
    setCarrito((prev) => {
      const nuevoCarrito = { ...prev };
      if (nuevoCarrito[id] > 1) {
        nuevoCarrito[id] -= 1;
      } else {
        delete nuevoCarrito[id];
      }
      return nuevoCarrito;
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Carrito</h2>
      {Object.keys(carrito).length === 0 ? (
        <p style={styles.emptyMessage}>Tu carrito está vacío.</p>
      ) : (
        <ul style={styles.list}>
          {Object.keys(carrito).map((id) => {
            const producto = productos.find((p) => p.id === parseInt(id));
            return (
              <li key={id} style={styles.item}>
                <span style={styles.productName}>{producto.nombre}</span>
                <div style={styles.quantityControls}>
                  <button onClick={() => disminuirCantidad(id)} style={styles.quantityButton}>-</button>
                  <span style={styles.productDetail}>{carrito[id]}</span>
                  <button onClick={() => aumentarCantidad(id)} style={styles.quantityButton}>+</button>
                </div>
                <span style={styles.productDetail}>Precio: {producto.precio.toLocaleString()} Gs</span>
                <button onClick={() => eliminarProducto(id)} style={styles.deleteButton}>Eliminar</button>
              </li>
            );
          })}
        </ul>
      )}
      <p style={styles.total}>Total: {total.toLocaleString()} Gs</p>
      {Object.keys(carrito).length > 0 && (
        <button style={styles.payButton} onClick={() => navigate('/checkout')}>
          Confirmar
        </button>
      )}
      <Link to="/" style={styles.continueShopping}>Seguir comprando</Link>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    maxWidth: '800px',
    margin: '40px auto',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    color: '#fff',
    textAlign: 'left',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '20px',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#ccc',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: '20px 0',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  },
  productName: {
    fontSize: '1.1rem',
    color: '#fff',
    flex: 2,
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  productDetail: {
    color: '#ccc',
    textAlign: 'center',
  },
  quantityButton: {
    padding: '5px 10px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    padding: '8px 12px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.3s',
  },
  total: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    margin: '20px 0',
  },
  payButton: {
    padding: '15px',
    backgroundColor: 'rgba(51, 51, 51, 0.8)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    display: 'block',
    width: '100%',
    marginTop: '20px',
    transition: 'background-color 0.3s',
  },
  continueShopping: {
    display: 'block',
    textAlign: 'center',
    marginTop: '20px',
    color: '#61dafb',
    textDecoration: 'none',
    fontSize: '1rem',
  },
};

export default Cart;
