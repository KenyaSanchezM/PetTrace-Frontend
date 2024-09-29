import '@fortawesome/fontawesome-free/css/all.min.css';
import { Button, Card, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import RegistroPerrosRefugio from './RegistroPerrosRefugios';

const PerfilUsuarioRefugio = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    nombre: '',
    edad: '',
    color: [],
    temperamento: '',
    vacunas: '',
    caracteristicas: '',
    esterilizado: '',
    tamanio: '',
  });

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

  const handleDelete = async (id) => {
    if (!id) {
      alert('ID de publicación no válido.');
      return;
    }

    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`http://localhost:8000/api/dog-predictions-shelter/${id}/delete/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserData((prevData) => ({
        ...prevData,
        predictions: prevData.predictions.filter((perro) => perro.id !== id)
      }));
      alert('Publicación eliminada con éxito.');
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
      alert('Hubo un problema al eliminar la publicación.');
    }
  };

  const handleEdit = (perro) => {
    setEditData({
      ...perro,
      color: Array.isArray(perro.color) ? perro.color : JSON.parse(perro.color),
    });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!editData.id) {
      alert('ID de publicación no válido.');
      return;
    }
  
    const token = localStorage.getItem('access_token');
    
    const dataToUpdate = { 
      ...editData,
      color: JSON.stringify(editData.color),
    };

    // Eliminar campos no necesarios o solo de lectura
    delete dataToUpdate.user;
    delete dataToUpdate.image;
    delete dataToUpdate.profile_image1;
    delete dataToUpdate.profile_image2;
    delete dataToUpdate.sexo;
  
    try {
      const response = await axios.put(`http://localhost:8000/api/dog-predictions-shelter/${editData.id}/update/`, dataToUpdate, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserData((prevData) => ({
        ...prevData,
        predictions: prevData.predictions.map((perro) => 
          perro.id === editData.id ? response.data : perro
        )
      }));
      setShowEditModal(false);
      alert('Publicación actualizada con éxito.');
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error al actualizar la publicación:', error.response.data);
        alert('Hubo un problema al actualizar la publicación: ' + JSON.stringify(error.response.data));
      } else {
        console.error('Error al actualizar la publicación:', error);
        alert('Hubo un problema al actualizar la publicación.');
      }
    }
  };

  const handleColorChange = (e) => {
    const { name, checked } = e.target;
    setEditData((prevData) => {
      let newColors = [...prevData.color];
      if (checked) {
        newColors.push(name);
      } else {
        newColors = newColors.filter((color) => color !== name);
      }
      return { ...prevData, color: newColors };
    });
  };

  

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
                          <Button variant="danger" onClick={() => handleDelete(perro.id)}>
                            Eliminar Publicación
                          </Button>
                          <Button variant="warning" className="ml-2" onClick={() => handleEdit(perro)}>
                            Editar Publicación
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p></p>
              )}
            </>
          ) : (
            <p>Cargando datos del refugio...</p>
          )}
        </Col>
      </Row>

      <RegistroPerrosRefugio show={showRegistro} handleClose={handleCloseRegistro} userId={userData ? userData.shelter_user.id : null} />

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={editData.nombre || ''}
                onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEdad">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="text"
                value={editData.edad || ''}
                onChange={(e) => setEditData({ ...editData, edad: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="colorEncontrado" className="mb-3">
              <Form.Label>Colores</Form.Label>
              <div>
                {['negro', 'blanco', 'gris', 'cafe', 'amarillo', 'rojizo', 'dorado', 'naranja', 'manchas', 'multicolor'].map((color) => (
                  <Form.Check
                    key={color}
                    type="checkbox"
                    label={color.charAt(0).toUpperCase() + color.slice(1)}
                    name={color}
                    checked={editData.color.includes(color)}
                    onChange={handleColorChange}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group controlId="formTemperamento">
              <Form.Label>Temperamento</Form.Label>
              <Form.Control
                type="text"
                value={editData.temperamento || ''}
                onChange={(e) => setEditData({ ...editData, temperamento: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formVacunas">
              <Form.Label>Vacunas</Form.Label>
              <Form.Control
                type="text"
                value={editData.vacunas || ''}
                onChange={(e) => setEditData({ ...editData,
                  vacunas: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formCaracteristicas">
                  <Form.Label>Características</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editData.caracteristicas || ''}
                    onChange={(e) => setEditData({ ...editData, caracteristicas: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formEsterilizado">
                  <Form.Label>Esterilizado</Form.Label>
                  <Form.Control
                    type="text"
                    value={editData.esterilizado || ''}
                    onChange={(e) => setEditData({ ...editData, esterilizado: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formTamanio">
                  <Form.Label>Tamaño</Form.Label>
                  <Form.Control
                    type="text"
                    value={editData.tamanio || ''}
                    onChange={(e) => setEditData({ ...editData, tamanio: e.target.value })}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleUpdate}>
                  Actualizar
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      );
    };
    
    export default PerfilUsuarioRefugio;
    