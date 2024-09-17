// Home.js
import React from 'react';
import { Card, Container, Row, Col, Carousel } from 'react-bootstrap';


function Home() {
  return (
    <div>
      {/* Head */}
      <header className="head">
        <div className="container">
          <div className="head-subheading">Encuentra a tu mascota mucho más rápido con nuestra</div>
          <div className="head-heading text-uppercase">Inteligencia Artificial </div>
        </div>
      </header>

      <Container className="py-5">
        {/* Segunda sección - Carrusel de React-Bootstrap */}
        <div className="section">
          <h2 className="section-title">¡Ayudálos a volver a casa!</h2>
          <Carousel id="carouselPerros">
            <Carousel.Item id='CarruselPerros'>
              <Row>
                <Col md={4} className="d-flex justify-content-center">
                  <Card className="card-custom">
                    <Card.Img variant="top" src="/images/perroProv.jpeg" alt="Perro perdido 1" />
                    <Card.Body>
                      <Card.Title className="card-title">Perro perdido 1</Card.Title>
                      <Card.Text>Información sobre el perro perdido 1.</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="d-flex justify-content-center">
                  <Card className="card-custom">
                    <Card.Img variant="top" src="/images/perroProv.jpeg" alt="Perro perdido 2" />
                    <Card.Body>
                      <Card.Title className="card-title">Perro perdido 2</Card.Title>
                      <Card.Text>Información sobre el perro perdido 2.</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="d-flex justify-content-center">
                  <Card className="card-custom">
                    <Card.Img variant="top" src="/images/perroProv.jpeg" alt="Perro perdido 3" />
                    <Card.Body>
                      <Card.Title className="card-title">Perro perdido 3</Card.Title>
                      <Card.Text>Información sobre el perro perdido 3.</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item id='CarruselPerros'>
              <Row>
                <Col md={4} className="d-flex justify-content-center">
                  <Card className="card-custom">
                    <Card.Img variant="top" src="/images/perroProv.jpeg" alt="Perro perdido 1" />
                    <Card.Body>
                      <Card.Title className="card-title">Perro perdido 1</Card.Title>
                      <Card.Text>Información sobre el perro perdido 1.</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="d-flex justify-content-center">
                  <Card className="card-custom">
                    <Card.Img variant="top" src="/images/perroProv.jpeg" alt="Perro perdido 2" />
                    <Card.Body>
                      <Card.Title className="card-title">Perro perdido 2</Card.Title>
                      <Card.Text>Información sobre el perro perdido 2.</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="d-flex justify-content-center">
                  <Card className="card-custom">
                    <Card.Img variant="top" src="/images/perroProv.jpeg" alt="Perro perdido 3" />
                    <Card.Body>
                      <Card.Title className="card-title">Puticerdo</Card.Title>
                      <Card.Text>Infputijdjne.</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Carousel.Item>
          </Carousel>
        </div>

      {/* Segunda sección */}
      <div className="section">
        <h2 className="section-title">Registra a tu mascota y nuestra IA hará el resto</h2>
        <div>
          <img src="/images/FormularioProv.png" alt="Imagen de registro de mascotas" className="section-image" />
        </div>
      </div>

      {/* Tercera sección */}
      <div className="section">
        <h2 className="section-title">Aprovecha y conoce a tu nueva mascota en nuestros refugios</h2>
        <Row>
          <Col md={4} className="d-flex justify-content-center">
            <Card className="card-custom">
              <Card.Img variant="top" src="/images/refugioProv.jpeg" alt="Refugio 1" />
              <Card.Body>
                <Card.Title className="card-title">Refugio 1</Card.Title>
                <Card.Text>
                  Información sobre el refugio 1.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex justify-content-center">
            <Card className="card-custom">
              <Card.Img variant="top" src="/images/refugioProv.jpeg" alt="Refugio 2" />
              <Card.Body>
                <Card.Title className="card-title">Refugio 2</Card.Title>
                <Card.Text>
                  Información sobre el refugio 2.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex justify-content-center">
            <Card className="card-custom">
              <Card.Img variant="top" src="/images/refugioProv.jpeg" alt="Refugio 3" />
              <Card.Body>
                <Card.Title className="card-title">Refugio 3</Card.Title>
                <Card.Text>
                  Información sobre el refugio 3.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
    <style>
{`.section-title {
    text-align: center;
    margin-bottom: 2rem;
}

  
.section-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
}
  
.card-title {
    text-align: center;
}

.card-custom {
    width: 100%;
    max-width: 350px; /* Ajusta el valor según el tamaño deseado */
    margin: auto; /* Para centrar la card dentro de su contenedor */
}
  
.section-image {
    width: 100%;
    max-width: 700px; /* Ajusta el valor según el tamaño deseado */
    display: block;
    margin: 0 auto; /* Centra la imagen horizontalmente */
  }
  
.section-title {
  text-align: center;
  margin-top: 0px; /* Espacio superior */
  margin-bottom: 40px; /* Espacio inferior */
}

.section {
  margin-top: 0px; /* Espacio superior */
  margin-bottom: 40px; /* Espacio inferior */
}

header.head {
  position: relative;
  display: flex;
  padding-top: 10.5rem;
  padding-bottom: 6rem;
  text-align: center;
  color: #fff;
  background-image: url("https://image.ondacero.es/clipping/cmsimages01/2023/02/09/FF2B1D9A-C795-4CE6-99E3-FB1FB9841BE8/imagen-archivo-varios-perros-parque_103.jpg");
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center center;
  background-size: cover;
  z-index: 1;
  height: 500px;
}
header.head::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Opacidad y color del degradado */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)); /* Degradado */
  z-index: -1; 
}

header.head .head-subheading {
  font-size: 1.5rem;
  font-style: italic;
  line-height: 1.5rem;
  margin-bottom: 25px;
  font-family: "Roboto Slab", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
header.head .head-heading {
  font-size: 3.25rem;
  font-weight: 700;
  line-height: 3.25rem;
  margin-bottom: 2rem;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

@media (min-width: 768px) {
  header.head {
    padding-top: 8rem;
    padding-bottom: 4.5rem;
  }
  
  header.head .head-subheading {
    font-size: 2.25rem;
    font-style: italic;
    line-height: 2.25rem;
    margin-bottom: 1rem;
  }
  header.head .head-heading {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 4.5rem;
    margin-bottom: 4rem;
  }
}

`}
    </style>
  </div>
  );
}

export default Home;
