import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'; // Importar EmailJS

Modal.setAppElement('#root');

const Checkout = ({ carrito, productos, limpiarCarrito }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState(''); // Nuevo estado para el correo
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  // Función para validar el correo electrónico
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correo
    return re.test(String(email).toLowerCase());
  };

  const handleConfirmar = () => {
    // Validación del correo electrónico
    if (!isValidEmail(correo)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }
  
    const resumen = Object.keys(carrito).map((id) => {
      const producto = productos.find((p) => p.id === parseInt(id));
      return `${producto.nombre} x ${carrito[id]}`;
    }).join(', ');
  
    // Mensaje personalizado para WhatsApp
    const mensaje = `https://wa.me/tu-numero?text=Hola,%20soy%20${nombre}%20${apellido}.%20Me%20gustaría%20agendar%20estos%20pedidos:%20${resumen}`;
  
    // Enviar el correo utilizando EmailJS
    const templateParams = {
      from_name: nombre,
      apellido: apellido,
      from_email: correo, // Enviar el correo ingresado por el usuario
      message: `Hola,%20soy%20${nombre}%20${apellido}.%20Me%20gustaría%20agendar%20estos%20pedidos:%20${resumen}`,
    };
  
    console.log(templateParams); // Verificar los valores que se envían
  
    emailjs.send('service_ksw8nnx', 'template_w7ne66c', templateParams, '-dCH8DlVkeJXQCQNh')
      .then((response) => {
        console.log('Correo enviado con éxito:', response.status, response.text);
  
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
        }, 3000);
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
      });
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Detalles del Pedido</h2>
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
      <input
        type="email" // Campo de correo electrónico
        placeholder="Correo Electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
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
        <h2 style={styles.modalHeading}>¡Pedido Exitoso!</h2>
        <p style={styles.modalText}>Tu pedido ha sido enviado con éxito. Serás redirigido a la página de inicio.</p>
      </Modal>
    </div>
  );
};

// Estilos
const styles = {
  container: {
    padding: '40px',
    maxWidth: '600px',
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
  list: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '20px',
  },
  item: {
    padding: '10px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ccc',
  },
  total: {
    marginTop: '20px',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    display: 'block',
    margin: '10px 0',
    padding: '15px',
    width: '100%',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    fontSize: '1rem',
    backdropFilter: 'blur(5px)',
  },
  confirmButton: {
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
  modalHeading: {
    color: '#4CAF50',
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  modalText: {
    color: '#fff',
  },
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    textAlign: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  },
};

export default Checkout;
