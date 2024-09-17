import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import RegistroPerros from './RegistroPerros';
import { useNavigate } from 'react-router-dom';  // Cambia useHistory por useNavigate

const PerfilUsuario = () => {
  const [userData, setUserData] = useState(null);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    nombre: '',
    edad: '',
    color: [],
    ubicacion: '',
    tieneCollar: '',
    caracteristicas: '',
    fecha: '',
    breeds: []  // Añadido para razas
  });
  const navigate = useNavigate();  // Usa useNavigate

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('http://localhost:8000/api/perfil-usuario/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
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

  const handleDelete = async (id) => {
    if (!id) {
      alert('ID de publicación no válido.');
      return;
    }

    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`http://localhost:8000/api/dog-predictions/${id}/delete/`, {
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
    // Aseguramos que 'color' siempre sea un arreglo
    setEditData({
      ...perro,
      color: Array.isArray(perro.color) ? perro.color : JSON.parse(perro.color), // Parsear si está en formato JSON
    });
    setShowEditModal(true);
  };
  

  const handleUpdate = async () => {
    if (!editData.id) {
      alert('ID de publicación no válido.');
      return;
    }

    const token = localStorage.getItem('access_token');

    // Mantén 'color' y 'breeds' como arreglos convertidos en cadena JSON
    const dataToUpdate = { 
      ...editData,
      color: JSON.stringify(editData.color),  // Convertimos el arreglo a una cadena JSON
      breeds: JSON.stringify(editData.breeds) // Convertimos el arreglo a una cadena JSON
    };

    // Eliminar campos no necesarios o solo de lectura
    delete dataToUpdate.user;
    delete dataToUpdate.form_type;
    delete dataToUpdate.image;
    delete dataToUpdate.profile_image1;
    delete dataToUpdate.profile_image2;
    delete dataToUpdate.sexo;

    try {
      const response = await axios.put(`http://localhost:8000/api/dog-predictions/${editData.id}/update/`, dataToUpdate, {
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

  const handleBreedChange = (e) => {
    const { name, checked } = e.target;
    setEditData((prevData) => {
      let newBreeds = [...prevData.breeds];
      if (checked) {
        newBreeds.push(name);
      } else {
        newBreeds = newBreeds.filter((breed) => breed !== name);
      }
      return { ...prevData, breeds: newBreeds };
    });
  };

  const handleSearchMatches = (perro) => {
    const query = {
      breeds: perro.breeds || [],
      color: perro.color || []
    };
  
    // Redirige al HomeUser con los parámetros de búsqueda en la URL
    navigate(`/home?search=${encodeURIComponent(JSON.stringify(query))}`);
  };
  

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
                            Color: {Array.isArray(perro.color) ? perro.color.join(', ') : 'No disponible'}<br /> {/* Verifica que color sea un arreglo */}
                            Ubicación: {perro.ubicacion}<br />
                            ¿Tiene collar?: {perro.tieneCollar ? 'Sí' : 'No'}<br />
                            Características: {perro.caracteristicas}<br />
                            Fecha: {perro.fecha}
                          </Card.Text>

                          <Button variant="danger" onClick={() => handleDelete(perro.id)}>
                            Eliminar Publicación
                          </Button>
                          <Button variant="warning" className="ml-2" onClick={() => handleEdit(perro)}>
                            Editar Publicación
                          </Button>
                          <Button variant="info" className="ml-2" onClick={() => handleSearchMatches(perro)}>
                            Buscar Coincidencias
                          </Button>
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

      {/* Modal para editar publicación */}
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
            <Form.Group controlId="formUbicacion">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                value={editData.ubicacion || ''}
                onChange={(e) => setEditData({ ...editData, ubicacion: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formTieneCollar">
              <Form.Label>¿Tiene collar?</Form.Label>
              <Form.Select
                value={editData.tieneCollar || 'No'} // Mostrar "Sí" o "No" según el valor actual, por defecto "No"
                onChange={(e) =>
                  setEditData({ ...editData, tieneCollar: e.target.value })
                }
              >
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </Form.Select>
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
            <Form.Group controlId="formFecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={editData.fecha || ''}
                onChange={(e) => setEditData({ ...editData, fecha: e.target.value })}
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



export default PerfilUsuario;
