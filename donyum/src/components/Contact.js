import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parámetros que se envían a la plantilla de EmailJS
    const templateParams = {
      from_name: nombre,
      from_email: email,
      message: mensaje,
    };

    // Reemplaza 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', y 'YOUR_USER_ID' con los valores de tu cuenta de EmailJS
    emailjs.send('service_ksw8nnx', 'template_kv4kjye', templateParams, '-dCH8DlVkeJXQCQNh')
      .then((response) => {
        console.log('Correo enviado con éxito:', response.status, response.text);
        setEnviado(true); // Mostrar mensaje de éxito
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
      <h2>Contacto</h2>
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
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  textarea: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    minHeight: '100px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  successMessage: {
    color: 'green',
    marginBottom: '10px',
  },
};

export default Contact;
