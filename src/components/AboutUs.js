import React from 'react';

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sobre Nosotros</h2>
      
      <section style={styles.section}>
        <h3 style={styles.subheading}>Nuestra Historia</h3>
        <p style={styles.text}>
          Don Yum nació de la pasión por ofrecer bocaditos y postres de alta calidad. Nuestro objetivo siempre ha sido
          brindar un sabor excepcional y una experiencia memorable para nuestros clientes en cada evento.
        </p>
      </section>
      
      <section style={styles.section}>
        <h3 style={styles.subheading}>Misión</h3>
        <p style={styles.text}>
          Nuestra misión es deleitar a nuestros clientes con productos frescos y deliciosos, elaborados con los mejores
          ingredientes, y servir como el toque especial en cada ocasión especial.
        </p>
      </section>
      
      <section style={styles.section}>
        <h3 style={styles.subheading}>Visión</h3>
        <p style={styles.text}>
          Aspiramos a ser el referente principal en bocaditos y postres en la región, reconocidos por nuestra calidad,
          compromiso y pasión por lo que hacemos.
        </p>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    maxWidth: '800px',
    margin: '40px auto',
    background: 'rgba(255, 255, 255, 0.1)', // Fondo translúcido
    borderRadius: '15px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    textAlign: 'left',
    zIndex: 1, // Asegura que el contenedor esté detrás del menú desplegable
  },
  heading: {
    fontSize: '2.5rem',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '30px',
    textShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  section: {
    marginBottom: '20px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.15)', // Fondo translúcido para cada sección
    borderRadius: '10px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  },
  subheading: {
    fontSize: '1.8rem',
    color: '#fff', // Texto blanco para mejor contraste
    marginBottom: '10px',
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  text: {
    fontSize: '1rem',
    color: '#fff', // Texto blanco para mejor visibilidad
    lineHeight: '1.6',
  },
};

export default AboutUs;
