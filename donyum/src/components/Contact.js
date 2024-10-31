import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: nombre,
      from_email: email,
      message: mensaje,
    };

    emailjs.send('service_ksw8nnx', 'template_kv4kjye', templateParams, '-dCH8DlVkeJXQCQNh')
      .then((response) => {
        console.log('Correo enviado con éxito:', response.status, response.text);
        setEnviado(true);
        setNombre('');
        setEmail('');
        setMensaje('');
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Contacto</h2>
      <p>Si tienes alguna consulta o deseas más información, contáctanos mediante el siguiente formulario:</p>
      
      {enviado && <p style={styles.successMessage}>¡Gracias! Tu mensaje ha sido enviado.</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          style={styles.textarea}
          required
        ></textarea>
        <button type="submit" style={styles.button}>Enviar</button>
      </form>
    </div>
  );
};

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
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    fontSize: '1rem',
    backdropFilter: 'blur(5px)',
    '::placeholder': {
      color: '#ffffff',
      opacity: 0.8,
    },
  },
  textarea: {
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    fontSize: '1rem',
    backdropFilter: 'blur(5px)',
    minHeight: '120px',
    '::placeholder': {
      color: '#ffffff',
      opacity: 0.8,
    },
  },
  button: {
    padding: '15px',
    backgroundColor: 'rgba(51, 51, 51, 0.8)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  successMessage: {
    color: '#4CAF50',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '1rem',
  },
};

export default Contact;
