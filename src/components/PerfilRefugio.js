import '@fortawesome/fontawesome-free/css/all.min.css';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import RegistroPerrosRefugio from './RegistroPerrosRefugios';

const PerfilUsuarioRefugio = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [showRegistro, setShowRegistro] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      console.log('Token en el frontend:', token);

      try {
        const response = await axios.get('http://localhost:8000/api/perfil-refugio/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('User Data:', response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        setError('Hubo un problema al cargar los datos del usuario. Por favor, inténtalo de nuevo.');
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
          {error && <p className="text-danger">{error}</p>}
          {userData ? (
            <>
              <Card>
                <Card.Header>{userData.shelter_user.nombre || 'Nombre no disponible'} - Perfil de Refugio</Card.Header>
                <Card.Body>
                  <Card.Text>Email: {userData.shelter_user.email || 'Email no disponible'}</Card.Text>
                  <Card.Text>Teléfono: {userData.shelter_user.telefono || 'Teléfono no disponible'}</Card.Text>
                  <Button variant="primary" onClick={handleShowRegistro}>
                    Registrar Perro
                  </Button>
                </Card.Body>
              </Card>
              <h3>Perros Registrados</h3>
              {userData.predictions && userData.predictions.length > 0 ? (
                <Row>
                  {userData.predictions.map((perro, index) => (
                    <Col md={4} key={index} className="mb-3">
                      <Card>
                        {perro.image && (
                          <Card.Img variant="top" src={`http://localhost:8000${perro.image}`} />
                        )}
                        <Card.Body>
                          <Card.Title>{perro.nombre || 'Nombre no disponible'}</Card.Title>
                          <Card.Text>
                            Edad: {perro.edad || 'Edad no disponible'}<br />
                            Tamaño: {perro.tamanio || 'Tamaño no disponible'}<br />
                            Descripción: {perro.caracteristicas || 'Descripción no disponible'}<br />
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p>No hay perros registrados.</p>
              )}
            </>
          ) : (
            <p>Cargando datos del refugio...</p>
          )}
        </Col>
      </Row>

      <RegistroPerrosRefugio show={showRegistro} handleClose={handleCloseRegistro} userId={userData ? userData.shelter_user.id : null} />
    </Container>
  );
};

export default PerfilUsuarioRefugio;
