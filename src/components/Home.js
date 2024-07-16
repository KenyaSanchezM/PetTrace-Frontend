// Home.js
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './Home.css';

function Home() {
  return (
    <div>
        <Container className="py-5">
          {/* Primera sección */}
          <div className="section">
          <h2 className="section-title">Publica si tu mascota está perdida o si has encontrado a una y quieres buscar a su dueño</h2>
          <Row>
            <Col md={4} className="d-flex justify-content-center">
              <Card className="card-custom">
                <Card.Img variant="top" src="/images/perroProv.jpeg" alt="Perro perdido 1" />
                <Card.Body>
                  <Card.Title className="card-title">Perro perdido 1</Card.Title>
                  <Card.Text>
                    Información sobre el perro perdido 1.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <Card className="card-custom">
                <Card.Img variant="top" src="/images/perroProv.jpeg" alt="Perro perdido 2" />
                <Card.Body>
                  <Card.Title className="card-title">Perro perdido 2</Card.Title>
                  <Card.Text>
                    Información sobre el perro perdido 2.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <Card className="card-custom">
                <Card.Img variant="top" src="/images/perroProv.jpeg" alt="Perro perdido 3" />
                <Card.Body>
                  <Card.Title className="card-title">Perro perdido 3</Card.Title>
                  <Card.Text>
                    Información sobre el perro perdido 3.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
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
    </div>
  );
}

export default Home;
