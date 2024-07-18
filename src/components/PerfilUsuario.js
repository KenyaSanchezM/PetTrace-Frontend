import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import axios from 'axios';

const PerfilUsuario = () => {
  const [perfil, setPerfil] = useState(null); // Estado para almacenar los datos del perfil del usuario

  // Función para cargar el perfil del usuario
  const cargarPerfil = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/perfil_usuario'); // Endpoint para obtener el perfil del usuario
      setPerfil(response.data); // Actualizar el estado con los datos del perfil obtenidos del servidor
    } catch (error) {
      console.error('Error al cargar el perfil del usuario:', error);
    }
  };

  // Cargar el perfil del usuario al cargar el componente
  useEffect(() => {
    cargarPerfil();
  }, []);

  // Renderizar mientras se carga el perfil
  if (!perfil) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2 className="text-center">Perfil de Usuario</h2>

          {/* Botón para agregar perro perdido */}
          <Button variant="primary" className="mb-3" href="/registro_perros">
            Agregar Perro Perdido
          </Button>

          {/* Lista de perros del usuario */}
          <h3>Mis Perros</h3>
          {perfil.perros.map((perro) => (
            <Card key={perro.id} className="mb-3">
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Card.Img variant="top" src={perro.imagen} />
                  </Col>
                  <Col md={8}>
                    <Card.Title>{perro.nombre}</Card.Title>
                    <Card.Text>
                      <strong>Edad:</strong> {perro.edad} <br />
                      <strong>Color:</strong> {perro.color} <br />
                      <strong>Características:</strong> {perro.caracteristicas}
                    </Card.Text>
                    <Card.Link href={`https://maps.google.com/?q=${perro.ubicacion}`} target="_blank">
                      Ver en Mapa
                    </Card.Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default PerfilUsuario;
