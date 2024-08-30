
import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

import axios from 'axios';
import RegistroPerros from './RegistroPerros';

const PerfilUsuario = () => {
  const [userData, setUserData] = useState(null);
  const [showRegistro, setShowRegistro] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => { 
      const token = localStorage.getItem('access_token');
      console.log('Token1:', token);
      try {
        
        const response = await axios.get('http://localhost:8000/api/perfil-usuario/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('User Data:', response.data); // Debugging
        console.log('Token2:', token);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        alert('Hubo un problema al cargar los datos del usuario. Por favor, inténtalo de nuevo.');
      }
    };
  
    fetchUserData();
  }, []);

  const handleShowRegistro = () => setShowRegistro(true);
  const handleCloseRegistro = () => setShowRegistro(false);

  return (
    <Container>
      <Row className="my-4">
        <Col>
          {userData ? (
            <>
              <Card>
                <Card.Header>{userData.user.nombre} - Perfil</Card.Header>
                <Card.Body>
                  <Card.Text>Email: {userData.user.email}</Card.Text>
                  <Card.Text>Teléfono: {userData.user.telefono}</Card.Text>
                  <Button variant="primary" onClick={handleShowRegistro}>
                    Registrar Perro
                  </Button>
                </Card.Body>
              </Card>
              <h3>Mis Perros Registrados</h3>
              {userData.predictions.length > 0 ? (
                <Row>
                  {userData.predictions.map((perro, index) => (
                    <Col md={4} key={index} className="mb-3">
                      <Card>
                        {perro.image && (
                          <Card.Img variant="top" src={`http://localhost:8000${perro.image}`} />
                        )}
                        <Card.Body>
                          <Card.Title>{perro.nombre}</Card.Title>
                          <Card.Text>
                            Edad: {perro.edad}<br />
                            Color: {perro.color}<br />
                            Ubicación: {perro.ubicacion}<br />
                            ¿Tiene collar?: {perro.tieneCollar ? 'Sí' : 'No'}<br />
                            Características: {perro.caracteristicas}<br />
                            Fecha: {perro.fecha}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p>No tienes perros registrados.</p>
              )}
            </>
          ) : (
            <p>Cargando datos del usuario...</p>
          )}
        </Col>
      </Row>
          
      <RegistroPerros show={showRegistro} handleClose={handleCloseRegistro} userId={userData ? userData.user.id : null} />
    </Container>

  );
};

export default PerfilUsuario;
  