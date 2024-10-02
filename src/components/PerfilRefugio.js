import '@fortawesome/fontawesome-free/css/all.min.css';
import { Button, Card, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import RegistroPerrosRefugio from './RegistroPerrosRefugios';
import RegistrarEvento from './RegistrarEvento';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './PerfilRefugio.css';
import TimePicker from 'react-time-picker'; 
import { Toast } from 'react-bootstrap';

const PerfilUsuarioRefugio = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRegistrarEvento, setShowRegistrarEvento] =useState(false);
  const [eventos, setEventos] = useState([]);
  const [showEditEventoModal, setShowEditEventoModal] = useState(false);
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

  const [editEventoData, setEditEventoData] = useState({
    nombre_evento: '',
    descripcion_evento: '',
    lugar_evento:'',
    //motivo:'',
    anfitrion_evento:'',
    fecha_evento:'',
    hora_evento:'',
  });
  
  const [perros, setPerros] = useState([]);
  const [showToast, setShowToast] = useState(false);

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
        setEventos(response.data.events); // Establecer los eventos
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        setError('Hubo un problema al cargar los datos del usuario. Por favor, inténtalo de nuevo.');
      }
    };

    fetchUserData();
  }, []);
  

  const handleShowRegistro = () => setShowRegistro(true);
  const handleCloseRegistro = () => setShowRegistro(false);

  const handleShowRegistrarEvento = () => setShowRegistrarEvento(true);
  const handleCloseRegistrarEvento = () => setShowRegistrarEvento(false);

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

      // Mostrar Toast de éxito
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        // Si quieres volver a cargar los datos del usuario, descomenta la línea siguiente
        //fetchUserData(); 
      }, 2000); // Espera 2 segundos antes de ocultar

    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
      alert('Hubo un problema al eliminar la publicación.');
    }
  };

  //Eliminar evento
  const handleDeleteEvent = async (id) => {
    if (!id) {
      alert('ID de publicación no válido.');
      return;
    }

    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`http://localhost:8000/api/event/${id}/delete/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEventos((prevData) => prevData.filter((evento) => evento.id !== id));
      alert('Publicación eliminada con éxito.');
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
      alert('Hubo un problema al eliminar la publicación.');
    }
  };

  //Editar perro

  const handleEdit = (perro) => {
    setEditData({
      ...perro,
      color: Array.isArray(perro.color) ? perro.color : JSON.parse(perro.color),
    });
    setShowEditModal(true);
  };

  const handleEditEvento = (evento) => {
    setEditEventoData(evento);
    setShowEditEventoModal(true);
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
      // Mostrar Toast de éxito
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        // Si quieres volver a cargar los datos del usuario, descomenta la línea siguiente
        //fetchUserData(); 
      }, 2000); // Espera 2 segundos antes de ocultar

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

  // Función para actualizar evento
  const handleUpdateEvento = async () => {
    if (!editEventoData.id) {
      alert('ID de evento no válido.');
      return;
    }

    const token = localStorage.getItem('access_token');
    
    try {
      const response = await axios.put(`http://localhost:8000/api/eventos/${editEventoData.id}/update/`, editEventoData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUserData((prevData) => ({
        ...prevData,
        eventos: prevData.eventos.map((evento) =>
          evento.id === editEventoData.id ? response.data : evento
        )
      }));

      setShowEditEventoModal(false);
      alert('Evento actualizado con éxito.');
    } catch (error) {
      // Manejo de errores
    }
  };

const TarjetaPerros = ({imagen, nombre, edad, tamanio, descripcion}) => {
  return (
      
      <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div className="card h-100" style={{ width: '18rem' }}>
          <div className="image-container" style={{ height: '200px', overflow: 'hidden' }}>
            <img
              src={imagen}
              className="card-img-top"
              alt="..."
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div className="card-body">
            <h5 className="card-title">{nombre}</h5>
            <p className="card-text">
              <b>Edad: </b> {edad}
              <br />
              <b>Tamaño: </b> {tamanio}
              <br />
              {descripcion}
            </p>
          </div>
        </div>
      </div>
    );

};



const TarjetaEventos = ({imagen, nombre, descripcion, fecha, ubicacion, hora_evento, footer}) => {
  return(
      <div className="row">
          <div className="card mb-3" style={{marginTop: '10px'}}>
              <div className="row g-0">
                  <div className="col-md-4">
                  <img src={imagen} className="img-fluid rounded-start" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{nombre} </h5>
                        <p className="card-text">{descripcion}<br/>
                            <b>Ubicación: </b>{ubicacion}<br/>
                            <b>Hora: </b>{hora_evento}<br/>
                            <b>Fecha del evento: </b>{fecha}   
                        </p>
                    </div>
                    {footer && (
                      <div className="card-footer">
                        {footer}
                      </div>
                    )}
                  </div>
              </div>
          </div>
      </div>
  );

};

const HeadSection = ({ profile_image, image1, image2, image3, titulo, descripcion, telefono, instagram, facebook, cuenta, ciudad, estado }) => {
  const [activeButton, setActiveButton] = useState(''); // Maneja el botón activo
  const defaultImage = "/images/eventos.jpg"; // Imagen predeterminada
  return (
      <div>
          <section className='Head'>
              <div className="container px-5">
                  <div className="row gx-5 align-items-center">
                  <div id="carouselExampleInterval" className="carousel slide col-lg-6 order-1" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="3000">
                                    <img src={image1 ? `http://localhost:8000${image1}` : defaultImage} className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item" data-bs-interval="3000">
                                    <img src={image2 ? `http://localhost:8000${image2}` : defaultImage} className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={image3 ? `http://localhost:8000${image3}` : defaultImage} className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                              <span className="carousel-control-next-icon" aria-hidden="true"></span>
                              <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                      <div className="col-lg-6 order-2 ">
                          <div className="p-5" style={{ borderRadius: '10px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', height: '420px' }}>
                              <h2 className="display-4"><img src={profile_image ? `http://localhost:8000${profile_image}` : defaultImage} className="rounded-circle me-3" alt="" style={{ width: '52px', height: '52px' }} />{titulo}</h2>
                              <h5 className="font-weight-light"><i className="fas fa-paw" style={{ marginLeft: '10px', textAlign:'justify', alignItems: 'justify' }}></i>{descripcion}</h5>
                              <h5 className="font-weight-light"><i className="bi bi-geo-alt"></i> {ciudad}, {estado}</h5>
                              <h5 className="font-weight-light"><i className="bi bi-telephone"></i> {telefono}</h5>
                              <h5 className="font-weight-light"><i className="fa-solid fa-piggy-bank"></i> {cuenta}</h5>
                              <a href={facebook}><i className="fa-brands fa-facebook" style={{ marginTop: '20px', fontSize: '1.5rem', color: '#070B83' }}></i></a>
                              <a href={instagram}><i className="fa-brands fa-instagram" style={{ marginTop: '20px', marginLeft: '20px', color: '#B817A9', fontSize: '1.5rem' }}></i></a>
                              <div>

                              </div>  
                          </div>
                      </div>
                  </div>
                  
              </div>
          </section>

          {/* Aquí se coloca el Toast */}
            <Toast 
              onClose={() => setShowToast(false)} 
              show={showToast} 
              delay={3000} 
              autohide 
              className="bg-success text-white"
              style={{ position: 'fixed', bottom: '20px', right: '20px' }}
            >
              <Toast.Body>¡Publicación actualizada/eliminada con éxito!</Toast.Body>
            </Toast>
          <div className='AdditionalSection'>
              <div className="container px-5 mt-5">
              <div className="row justify-content-center">
                <div className="col-auto">
                    <button className={`btn btn-elect ${activeButton === 'perritos' ? 'active' : ''}`} onClick={() => setActiveButton('perritos')}>
                        Perritos <i className="fa-solid fa-dog" style={{ marginLeft: '10px' }}></i>
                    </button>
                </div>
                <div className="col-auto">
                    <button className={`btn btn-elect ${activeButton === 'eventos' ? 'active' : ''}`} onClick={() => setActiveButton('eventos')}>
                        Eventos con Causa y Voluntariado
                    </button>
                </div>
            </div>

                  <hr />
                  {activeButton === 'eventos' ? (
                      <div className='row'>
                          <div>
                            <Button className="btn-regevent" variant="primary" onClick={handleShowRegistrarEvento}><i class="bi bi-plus-circle"> Agregar Evento</i> 
                            </Button>
                          </div>
                          {eventos.map((evento) => (
                            <TarjetaEventos
                              imagen={evento.imagen_evento ? `http://localhost:8000${evento.imagen_evento}` : defaultImage}
                              nombre={evento.nombre_evento}
                              descripcion={evento.descripcion_evento}
                              fecha={evento.fecha_evento}
                              ubicacion={evento.lugar_evento}
                              hora_evento={evento.hora_evento}
                              
                              footer={
                                <div className="d-flex justify-content-end" style={{ backgroundColor: 'transparent' }}>
                                  <Button variant="danger" onClick={() => handleDeleteEvent(evento.id)} className="me-2">
                                    <i className="fa-solid fa-trash"></i>
                                  </Button>
                                  <Button variant="warning" /*onClick={() => handleEditEvento(evento)}*/>
                                    <i className="fa-solid fa-pencil-alt"></i>
                                  </Button>
                                </div>
                              }
                             />
                          ))}
                      </div>
                  ) : (
                      <div className='row'>
                        <div>
                          <Button className="btn-regperr" variant="primary" onClick={handleShowRegistro}><i class="bi bi-plus-circle"> Agregar Perro</i> 
                          </Button>
                        </div>
                          {userData && userData.predictions && userData.predictions.map((perro) => (
                              <Col md={4} key={perro.id} className="mb-4">
                                  <TarjetaPerros
                                      imagen={`http://localhost:8000${perro.image}`} // Asumiendo que tu API devuelve la imagen con un prefijo de URL
                                      nombre={perro.nombre}
                                      edad={perro.edad}
                                      tamanio={perro.tamanio}
                                      descripcion={
                                          <div>
                                              <b>Características: </b> {perro.caracteristicas}
                                              <br />
                                              <b>Temperamento: </b> {perro.temperamento}
                                              <br />
                                              <b>Vacunas: </b> {perro.vacunas}
                                              <br />
                                              <b>Color: </b> {JSON.parse(perro.color).join(', ')} {/* Convierte el JSON a array y muestra las razas */}
                                              <div className="card-footer d-flex justify-content-end"style={{ backgroundColor: 'transparent' }}> {/* Alinea los botones a la derecha */}
                                              <Button variant="danger" onClick={() => handleDelete(perro.id)} className="me-2"> {/* Agrega margen a la derecha */}
                                                <i className="fa-solid fa-trash"></i>
                                              </Button>
                                              <Button variant="warning" onClick={() => handleEdit(perro)}>
                                                <i className="fa-solid fa-pencil-alt"></i>
                                              </Button>
                                            </div>


                                          </div>
                                      }
                                  />
                              </Col>
                          ))}
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
};


  return (
    <Container>
      <Row className="my-4">
        <Col>
          {error && <p className="text-danger">{error}</p>}

          {userData ? (
              <>
                <HeadSection
                image1={userData.shelter_user.image1} // Asegúrate de que la URL sea correcta
                image2={userData.shelter_user.image2}
                image3={userData.shelter_user.image3}
                titulo={userData.shelter_user.nombre} // Cambia según los datos de tu API
                descripcion={userData.shelter_user.descripcion}
                cuenta={userData.shelter_user.cuenta}
                telefono={userData.shelter_user.telefono}
                ciudad={userData.shelter_user.ciudad}
                estado={userData.shelter_user.estado}
                profile_image={userData.shelter_user.profile_image}
              />
            
            </>
          ) : (
            <p>Cargando datos del refugio...</p>
          )}
        </Col>
        
      </Row>     

      <RegistroPerrosRefugio show={showRegistro} handleClose={handleCloseRegistro} userId={userData ? userData.shelter_user.id : null} />
      <RegistrarEvento show={showRegistrarEvento} handleClose={handleCloseRegistrarEvento} userId={userData ? userData.shelter_user.id : null} />

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
                    as="select"
                    name="temperamento"
                    value={editData.temperamento || ''}
                    onChange={(e) => setEditData({ ...editData, temperamento: e.target.value })}
                  >
                    <option value="">Selecciona un temperamento</option>
                    <option value="juguetón">Juguetón</option>
                    <option value="tranquilo">Tranquilo</option>
                    <option value="activo">Activo</option>
                    <option value="noble">Noble</option>
                    <option value="ansioso">Ansioso</option>
                    <option value="miedoso">Miedoso</option>
                    <option value="apegado">Apegado</option>
                    <option value="hiperactivo">Hiperactivo</option>
                    <option value="agradable">Agradable</option>
                    <option value="desapegado">Desapegado</option>
                  </Form.Control>
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

          <Modal show={showEditEventoModal} onHide={() => setShowEditEventoModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Evento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="nombre_evento">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={editEventoData.nombre_evento || ''}
                    onChange={(e) => setEditEventoData({ ...editEventoData, nombre_evento: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="descripcion_evento">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    value={editEventoData.descripcion_evento || ''}
                    onChange={(e) => setEditEventoData({ ...editEventoData, descripcion_evento: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="lugar_evento">
                  <Form.Label>Ubicación</Form.Label>
                  <Form.Control
                    type="text"
                    value={editEventoData.lugar_evento || ''}
                    onChange={(e) => setEditEventoData({ ...editEventoData, lugar_evento: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="anfitrion">
                  <Form.Label>Anfitrión</Form.Label>
                  <Form.Control
                    type="text"
                    value={editEventoData.anfitrion_evento || ''}
                    onChange={(e) => setEditEventoData({ ...editEventoData,
                      anfitrion_evento: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group controlId="fecha_evento" className="mb-3">
                      <Form.Label>Fecha</Form.Label>
                      <Form.Control
                        type="date"
                        name="fecha_evento"
                        value={editEventoData.fecha_evento || ''}
                        onChange={(e) => setEditEventoData({ ...editEventoData,
                          fecha_evento: e.target.value })}
                      />
                    </Form.Group>
                    
                    <Button variant="primary" onClick={handleUpdateEvento}>
                      Actualizar
                    </Button>
                  </Form>
                </Modal.Body>
          </Modal>
        </Container>
      );
    };
    
    export default PerfilUsuarioRefugio;
    