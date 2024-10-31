import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // Necesario para accesibilidad del modal

const Checkout = ({ carrito, productos, limpiarCarrito }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfirmar = () => {
    const resumen = Object.keys(carrito).map((id) => {
      const producto = productos.find((p) => p.id === parseInt(id));
      return `${producto.nombre} x ${carrito[id]}`;
    }).join(', ');

    const mensaje = `https://wa.me/tu-numero?text=Hola,%20mi%20pedido%20es:%20${resumen}%20y%20mi%20nombre%20es:%20${nombre}%20${apellido}`;
    
    // Abrir el enlace de WhatsApp en una nueva pestaña
    window.open(mensaje, '_blank');

    // Mostrar el modal de éxito
    setModalIsOpen(true);

    // Limpiar el carrito después de confirmar el pedido
    limpiarCarrito();

    // Redirigir al usuario a la página de inicio después de unos segundos
    setTimeout(() => {
      setModalIsOpen(false);
      navigate('/');
    }, 3000); // Cambia el tiempo de espera si deseas más o menos tiempo
  };

  return (
    <div style={styles.container}>
      <h2>Detalles del Pedido</h2>
      <ul style={styles.list}>
        {Object.keys(carrito).map((id) => {
          const producto = productos.find((p) => p.id === parseInt(id));
          return (
            <li key={id} style={styles.item}>
              {producto.nombre} - {carrito[id]} x {producto.precio.toLocaleString()} Gs
            </li>
          );
        })}
      </ul>
      <p style={styles.total}>
        Total: {Object.keys(carrito).reduce((acc, id) => {
          const producto = productos.find((p) => p.id === parseInt(id));
          return acc + (carrito[id] * producto.precio);
        }, 0).toLocaleString()} Gs
      </p>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleConfirmar} style={styles.confirmButton}>Confirmar</button>

      {/* Modal de éxito */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
        contentLabel="Pedido Exitoso"
      >
        <h2>¡Pedido Exitoso!</h2>
        <p>Tu pedido ha sido enviado con éxito. Serás redirigido a la página de inicio.</p>
      </Modal>
    </div>
  );
};

const styles = {
  container: { padding: '20px' },
  list: { listStyleType: 'none', padding: 0 },
  item: { padding: '10px 0' },
  total: { marginTop: '20px', fontWeight: 'bold' },
  input: { display: 'block', margin: '10px 0', padding: '8px', width: '100%' },
  confirmButton: { padding: '10px', backgroundColor: '#333', color: '#fff', border: 'none', cursor: 'pointer', width: '100%' },
};

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    textAlign: 'center'
  },
};

export default Checkout;
