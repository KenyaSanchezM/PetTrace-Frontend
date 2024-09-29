import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Modal, Form,Image } from 'react-bootstrap';
import axios from 'axios';
import RegistroPerros from './RegistroPerros';
import '@fortawesome/fontawesome-free/css/all.min.css';
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


  const handleSearchMatches = (perro) => {
    if (!perro.id) {
        console.error('ID del perro no disponible.');
        return;
    }
    console.log('ID del perro:', perro.id);


    const query = {
      
        current_dog_id: perro.id  // Aquí se envía el ID correctamente
    };

    navigate(`/home?search=${encodeURIComponent(JSON.stringify(query))}`);
};

    

return (
  <Container>
    <Row className="my-4">
      <Col>
        {userData ? (
          <>
            <Container className="mt-4">


              <Card.Body>
                <Row className="cont1 align-items-center mb-4">
                  <Col xs={12} md={4} className="text-center">
                    <div className="perfil-contenedor">
                      <Image 
                        src={`http://localhost:8000${userData.user.profile_image}`} // Accediendo a la imagen del usuario
                        roundedCircle 
                        fluid 
                      />
                    </div>
                  </Col>
                  <Col xs={12} md={8}>
                    <h2>{userData.user.nombre}</h2>
                    <p>Email: {userData.user.email}<br />Teléfono: {userData.user.telefono}</p>
                    <Button className='btn-registrar-perro' variant="warning" onClick={handleShowRegistro}>
                      Registrar Perro
                    </Button>
                  </Col>
                </Row>
              </Card.Body>

              <div className='cont2'> 
                <Row>
                  <Col>
                    <h3>Perros Registrados</h3>
                    <hr className="mb-4" />
                    {userData.predictions.length > 0 ? (
                      <Row className='tarjetas'>
                        {userData.predictions.map((perro, index) => (
                          <Col md={4} key={index} className="mb-3">
                            <div className="card">
                              {perro.image && (
                                <img src={`http://localhost:8000${perro.image}`} className="card-img-top" alt="perro" />
                              )}
                              <div className="card-body">
                                <p className='p-name'>{perro.nombre}</p>
                                <p className='text'>
                                  <strong>Estado: </strong>{perro.form_type === 'perdido' ? 'Perdido' : 'Encontrado'}<br />
                                  <strong>Edad:</strong> {perro.edad}<br />
                                  <strong>Color:</strong> {perro.color}<br />
                                  <strong>Ubicación:</strong> {perro.ubicacion}<br />
                                  <strong>¿Tiene collar?:</strong> {perro.tieneCollar ? 'Sí' : 'No'}<br />
                                  <strong>Características:</strong> {perro.caracteristicas}<br />
                                  <strong>Fecha:</strong> {perro.fecha}
                                </p>
                              </div>
                              <div className="card-footer d-flex justify-content-end"style={{ backgroundColor: 'transparent' }}> {/* Alinea los botones a la derecha */}
                                <Button variant="danger" onClick={() => handleDelete(perro.id)} className="me-2"> {/* Agrega margen a la derecha */}
                                  <i className="fa-solid fa-trash"></i>
                                </Button>
                                <Button variant="warning" onClick={() => handleEdit(perro)}>
                                  <i className="fa-solid fa-pencil-alt"></i>
                                </Button>

                                <Button style={{ backgroundColor: '#3498db', borderColor: '#3498db' }} onClick={() => handleSearchMatches(perro)}>
                                  <i className="fa-solid fa-search"></i>
                                </Button>
     
                              </div>
                                
                           </div>
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <p>No tienes perros registrados.</p>
                    )}
                  </Col>
                </Row>
              </div>
            </Container>

            {/* Componente de Registro de Perros */}
            <RegistroPerros show={showRegistro} handleClose={handleCloseRegistro} userId={userData.user.id} />
            
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



          </>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}
      </Col>
    </Row>
    <style>
        {`
        .perfil-contenedor {
            display: flex;
            align-items: center; 
            justify-content: space-between; 
            flex-wrap: wrap; 
            gap: 20px;
            padding: 20px;
        }

        .perfil-contenedor img {
            width: 265px; 
            height: 265px;
            object-fit: cover;
            border-radius: 50%;
            border: 2px solid #fff;
            margin-bottom: 20px;
            margin-top: 85px;
            margin-top: 30px;
        }

        .perfil-info {
            flex: 1; /* Permite que la información ocupe el espacio restante */
            display: flex;
            flex-direction: column; /* Alinea los elementos verticalmente */
            align-items: flex-start; /* Alinea los elementos a la izquierda en pantallas grandes */
        }

        @media (max-width: 768px) {
            .perfil-contenedor {
                justify-content: center; /* Centra los elementos horizontalmente */
                align-items: center; /* Centra los elementos verticalmente */
                text-align: center; /* Centra el texto */
            }
            
            .perfil-info {
                align-items: center; /* Centra el texto del perfil */
            }
            
            .tarjetas {
                flex-wrap: wrap;
                gap: 90px;
            }
        }

        .btn-registrar-perro {
            margin-top: 30px;
            background-color: #ff8700;
            border-color: #ff8700;
        }

        .btn-registrar-perro:hover {
            border-color: #c55b03;
            background-color: #c55b03;
            color: #fff;
        }
          .btn-info:hover {
            background-color: #138496; /* Color de fondo al pasar el mouse */
          }
      
        .cont1 {
            margin-left: 70px;
        }

        .cont2 {
            background-image: url("/images/fondo_home.png");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
        }

        .card {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            width: 18rem; 
            height: 36rem;
        }

        .card-body {
          flex-direction: column;
          justify-content: space-between;
        }

        .card-footer {
            display: flex; /* Alinea los botones uno al lado del otro */
            justify-content: center; /* Centra los botones horizontalmente */
            gap: 10px; /* Espacio entre los botones */
            margin-top: 0px; /* Espacio entre el contenido y los botones */
        }
        .card .btn {
            width: 30%;
            margin-top: 0px; /* Espacio entre los botones */
          }

        <.btn-danger {
          background-color: #dc3545; /* Color de fondo para eliminar */
          border: none; /* Sin borde */
        }

        .btn-danger:hover {
          background-color: #c82333; /* Color de fondo al pasar el mouse */
        }

        .btn-warning {
          background-color: #ffc107; /* Color de fondo para editar */
          border: none; /* Sin borde */
        }

        .btn-warning:hover {
          background-color: #e0a800; /* Color de fondo al pasar el mouse */
        }

        .btn-info {
          background-color: #17a2b8; /* Color de fondo para buscar */
          border: none; /* Sin borde */
        }

        .card-img-top {
            padding: 12px; 
            height: 270px; 
            object-fit: cover; 
            border-radius: 8px; 
        }

        .p-name {
            margin: 0;
            padding: 0;
            font-weight: bold;
            color: rgb(63, 63, 63);
            font-size: 18px;
        }

        .text {
            color: rgb(97, 97, 97);
            font-size: 14px;
            margin: 0;
            padding: 0;
        }
        `}
      </style>

    </Container>
  );

};

export default PerfilUsuario;
