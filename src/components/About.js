import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import './About.css';

const About = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">¿Quiénes somos?</h1>

      <Row className="mb-4">
        <Col md={6}>
          <img src="/images/about1.jpeg" alt="Nuestro equipo" className="img-fluid rounded"  />
        </Col>
        <Col md={6}>
          <h2>Sobre Nosotros</h2>
          <p>
            Somos una organización dedicada a  conectar personas con el propósito de facilitar la adopción de mascotas 
            y promover el bienestar animal. <br></br>
            Nuestra plataforma permite que los usuarios den en adopción a sus mascotas y que otros usuarios interesados 
            las adopten, asegurando así que cada mascota encuentre un hogar adecuado. Actuamos como un puente entre personas 
            que necesitan reubicar a sus mascotas y aquellas que buscan adoptar, garantizando que el proceso sea seguro y transparente.
          </p>
          <p>
          Además, nos comprometemos a apoyar y dar visibilidad a refugios de animales. Proporcionamos un espacio donde los refugios 
          pueden promocionar sus eventos, compartir información sobre los animales que tienen en adopción y publicar actualizaciones 
          generales sobre sus actividades. Esto ayuda a aumentar la visibilidad de los refugios y facilita que más animales encuentren 
          hogares permanentes.
          </p>
          <h4>
            ¿Por qué elegirnos?
          </h4>
          <p>
          ●Conexión Eficaz: Facilitamos el proceso de adopción, asegurando que cada paso sea claro y seguro tanto para los que dan en adopción como para los que adoptan.<br></br>
          ●Apoyo a Refugios: Ayudamos a los refugios a alcanzar un público más amplio, promoviendo sus eventos y animales disponibles para adopción.<br></br>
          ●Transparencia: Priorizamos la transparencia en todas nuestras operaciones para asegurar que el bienestar de los animales esté siempre en primer lugar.<br></br>
          ●Comunidad Compasiva: Trabajamos para construir una comunidad que valora y respeta la vida de los animales, promoviendo la adopción responsable y el cuidado adecuado de las mascotas.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className='text-card'>
            <Card.Img variant="top" src="/images/mision.png" />
            <Card.Body>
              <Card.Title>Nuestra Misión</Card.Title>
              <Card.Text>
                Nuestra misión es mejorar la calidad de vida de los animales abandonados y maltratados a través de 
                mejorar el alcance y visualización de algunos refugios, así como facilitamos una opción donde los 
                usuarios pueden dar en adopción a sus mascotas, asegurando que encuentren un buen hogar.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='text-card'>
            <Card.Img variant="top" src="/images/vision.png" />
            <Card.Body>
              <Card.Title>Nuestra Visión</Card.Title>
              <Card.Text>
                Nuestra visión es crear un mundo en el que cada mascota tenga un hogar seguro y amoroso. Aspiramos a ser 
                líderes en la concienciación y educación sobre el bienestar animal, apoyando a refugios y organizaciones 
                en su misión de rescatar y proteger a los animales necesitados.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='text-card'>
            <Card.Img variant="top" src="/images/valores.png" />
            <Card.Body>
              <Card.Title>Nuestros Valores</Card.Title>
              <Card.Text>
                Nuestros valores incluyen la compasión y empatía buscando el cuidado y bienestar de los animales.
                Promovemos la adopción responsable, colaboración con otras organizaciones y sobre todo la transparencia
                en nuestras operaciones, asegurando que las acciones beneficien a los animales. 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <h2 className="text-center mb-4">Preguntas frecuentes</h2>
      <Accordion defaultActiveKey="0" className="my-4 custom-accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header>¿Cómo puedo adoptar una mascota?</Accordion.Header>
          <Accordion.Body>
            Puedes adoptar una mascota visitando nuestra sección de adopciones, donde encontrarás una lista de mascotas 
            disponibles. Puedes buscar por filtros de raza, edad, ubicación para que se acomode a tus intereses o necesidades. 
            Una vez que encuentres una mascota que te interese, puedes ponerte en contacto con el dueño de la mascota por medio
            de nuestro chat.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>¿Qué debo hacer si encuentro un animal perdido?</Accordion.Header>
          <Accordion.Body>
            Si encuentras un animal perdido, primero asegúrate de que está a salvo. Luego, revisa si tiene alguna 
            identificación, como un collar con una placa. Puedes publicar la información en nuestra plataforma y 
            contactar a refugios locales. También es útil llevar al animal a un veterinario para que verifiquen si 
            tiene un microchip.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>¿Cómo puedo hacer una donación?</Accordion.Header>
          <Accordion.Body>
            Puedes hacer una donación visitando la sección de refugios, en ella encontrarás la información necesaria para donar
            directamente al refugio. Nosotros no aceptamos donaciones monetarias, así como alimentos, juguetes y otros 
            suministros para animales, no te dejes engañar por usuarios maliciosos. 
            Tu generosidad ayuda a mantener nuestros programas y a cuidar de los animales necesitados.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>¿Puedo ser voluntario en su organización?</Accordion.Header>
          <Accordion.Body>
            ¡Sí, siempre estamos buscando voluntarios apasionados! Puedes unirte a nuestro equipo de voluntarios y 
            ayudar en diversas tareas, desde el mantenimiento de la plataforma hasta la organización de eventos y 
            campañas de concienciación. Envíanos correo por medio de la sección de contacto o comunicate por medio de 
            nuestras redes sociales para obtener más información.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>¿Cómo puedo reportar un caso de maltrato animal?</Accordion.Header>
          <Accordion.Body>
            Si eres testigo de un caso de maltrato animal, es importante actuar rápidamente. Puedes reportar el caso 
            a las autoridades locales y también a través de nuestra plataforma, donde colaboramos con refugios y 
            organizaciones para tomar las medidas necesarias. Proporciona toda la información posible para ayudar en 
            la investigación.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default About;
