import React from 'react';

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <h2>Sobre Nosotros</h2>
      <section style={styles.section}>
        <h3>Nuestra Historia</h3>
        <p>
          Don Yum nació de la pasión por ofrecer bocaditos y postres de alta calidad. Nuestro objetivo siempre ha sido
          brindar un sabor excepcional y una experiencia memorable para nuestros clientes en cada evento.
        </p>
      </section>
      <section style={styles.section}>
        <h3>Misión</h3>
        <p>
          Nuestra misión es deleitar a nuestros clientes con productos frescos y deliciosos, elaborados con los mejores
          ingredientes, y servir como el toque especial en cada ocasión especial.
        </p>
      </section>
      <section style={styles.section}>
        <h3>Visión</h3>
        <p>
          Aspiramos a ser el referente principal en bocaditos y postres en la región, reconocidos por nuestra calidad,
          compromiso y pasión por lo que hacemos.
        </p>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  section: {
    marginBottom: '20px',
  },
};

export default AboutUs;
