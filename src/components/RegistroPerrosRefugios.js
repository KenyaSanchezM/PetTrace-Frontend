import React, { useState } from 'react';
import { Form, Button, Modal, Container } from 'react-bootstrap';
import axios from 'axios';
import './RegistroPerrosRefugios.css';
import Swal from 'sweetalert2';


const RegistroPerrosRefugio = ({ show, handleClose, shelterUserId }) => {
  const [file, setFile] = useState(null);
  const [profileImage1, setProfileImage1] = useState(null);
  const [profileImage2, setProfileImage2] = useState(null);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [color, setColor] = useState([]);
  const [sexo, setSexo] = useState('');
  const [tamanio, setTamanio] = useState('');
  const [caracteristicas, setCaracteristicas] = useState('');
  const [temperamento, setTemperamento] = useState('');
  const [vacunas, setVacunas] = useState('');
  const [esterilizado, setEsterilizado] = useState('');
  const [loading, setLoading] = useState(false); // Estado de cargaS

  const resetForm = () => {
    setFile(null);
    setProfileImage1(null);
    setProfileImage2(null);
    setNombre('');
    setEdad('');
    setColor([]);
    setSexo('');
    setTamanio('');
    setCaracteristicas('');
    setTemperamento('');
    setVacunas('');
    setEsterilizado('');
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleProfileImage1Change = (event) => {
    setProfileImage1(event.target.files[0]);
  };

  const handleProfileImage2Change = (event) => {
    setProfileImage2(event.target.files[0]);
  };

  const handleColorChange = (event) => {
    const { name, checked } = event.target;
    setColor((prevColors) => 
      checked ? [...prevColors, name] : prevColors.filter(color => color !== name)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Iniciar carga
    let token = localStorage.getItem('access_token');

    const formData = new FormData();
    formData.append('file', file);

    try {
        const predictionResponse = await axios.post('http://localhost:5000/predict-breed/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        const breeds = predictionResponse.data.breed.join(',');
        
        // Agregar imágenes y otros datos al formData
        formData.append('profile_image1', profileImage1);
        formData.append('profile_image2', profileImage2);
        formData.append('nombre', nombre);
        formData.append('edad', edad);
        formData.append('color', JSON.stringify(color));
        formData.append('sexo', sexo);
        formData.append('tamanio', tamanio);
        formData.append('caracteristicas', caracteristicas);
        formData.append('temperamento', temperamento);
        formData.append('vacunas', vacunas);
        formData.append('esterilizado', esterilizado);
        formData.append('shelter_user', shelterUserId);
        formData.append('breeds', breeds);

        // Ya no necesitas añadir file de nuevo aquí, ya que ya lo hiciste
        // const response = await axios.post(...) se queda igual

        const response = await axios.post('http://localhost:8000/api/registro-perros-refugios/', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        handleClose(); 
        resetForm();

        // Alerta de éxito
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Tu perrito se ha registrado correctamente.',
            confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.reload(); // Recargar la página después de la alerta
        });

    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Manejo del token de refresco
            const refreshToken = localStorage.getItem('refresh_token');
            
            if (refreshToken) {
                try {
                    const refreshResponse = await axios.post('http://localhost:8000/api/token/refresh/', {
                        refresh: refreshToken
                    });

                    token = refreshResponse.data.access;
                    localStorage.setItem('access_token', token); // Asegúrate de usar el nombre correcto

                    const retryResponse = await axios.post('http://localhost:8000/api/registro-perros-refugios/', formData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    handleClose(); 
                    resetForm();

                    // Alerta de éxito
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso',
                        text: 'Tu perrito se ha registrado correctamente.',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                      window.location.reload(); // Recargar la página después de la alerta
                    });

                } catch (refreshError) {
                    console.error('Error al refrescar el token:', refreshError.response ? refreshError.response.data : refreshError.message);
                    alert('Tu sesión ha expirado y no se pudo renovar. Por favor, inicia sesión de nuevo.');
                }
            } else {
                console.error('Token de refresco no disponible.');
                alert('No se pudo encontrar el token de refresco. Por favor, inicia sesión de nuevo.');
            }
        } else {
            console.error('Error al registrar el perro de refugio:', error.response ? error.response.data : error.message);
            alert('Hubo un problema al registrar el perro. Por favor, inténtalo de nuevo.');
        }
    } finally {
        setLoading(false); // Finalizar carga
    }
};

  
  return (
    <Modal show={show} onHide={() => { handleClose(); resetForm(); }}>
      <Modal.Header closeButton>
        <Modal.Title>Registro de Perros de Refugio</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '1400px', overflowY: 'auto' }}>

        <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Sube la imagen para la IA</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>

          <Form.Group controlId="profileImage1" className="mb-3">
            <Form.Label>Sube una imagen para mostrar en el perfil (opcional)</Form.Label>
            <Form.Control type="file" onChange={handleProfileImage1Change} />
          </Form.Group>
          <Form.Group controlId="profileImage2" className="mb-3">
            <Form.Label>Sube otra imagen para mostrar en el perfil (opcional)</Form.Label>
            <Form.Control type="file" onChange={handleProfileImage2Change} />
          </Form.Group>

          <Form.Group controlId="formNombre" className="mb-3">
            <Form.Label>Nombre del Perro</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del perro"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} 
            />
          </Form.Group>
          <Form.Group controlId="formEdad" className="mb-3">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Edad del perro"
              value={edad}
              onChange={(e) => setEdad(e.target.value)} 
            />
          </Form.Group>
          <Form.Group controlId="formColor" className="mb-3">
            <Form.Label>Colores</Form.Label>
            <div>
                    <Form.Check
                      type="checkbox"
                      label="Negro"
                      name="negro"
                      checked={color.includes('negro')}
                      onChange={handleColorChange} 
                    />
                    <Form.Check
                      type="checkbox"
                      label="Blanco"
                      name="blanco"
                      checked={color.includes('blanco')}
                      onChange={handleColorChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Gris"
                      name="gris"
                      checked={color.includes('gris')}
                      onChange={handleColorChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Cafe"
                      name="cafe"
                      checked={color.includes('cafe')}
                      onChange={handleColorChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Amarillo"
                      name="amarillo"
                      checked={color.includes('amarillo')}
                      onChange={handleColorChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Rojizo"
                      name="rojizo"
                      checked={color.includes('rojizo')}
                      onChange={handleColorChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Dorado"
                      name="dorado"
                      checked={color.includes('dorado')}
                      onChange={handleColorChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Naranja"
                      name="naranja"
                      checked={color.includes('naranja')}
                      onChange={handleColorChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Manchas"
                      name="manchas"
                      checked={color.includes('manchas')}
                      onChange={handleColorChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Multicolor"
                      name="multicolor"
                      checked={color.includes('multicolor')}
                      onChange={handleColorChange}
                    />
                  </div>
          </Form.Group>
          <Form.Group controlId="formSexo" className="mb-3">
            <Form.Label>Sexo</Form.Label>
            <Form.Select value={sexo} onChange={(e) => setSexo(e.target.value)}>
              <option value="">Selecciona el sexo</option>
              <option value="macho">Macho</option>
              <option value="hembra">Hembra</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formTamanio" className="mb-3">
            <Form.Label>Tamaño</Form.Label>
            <Form.Select value={tamanio} onChange={(e) => setTamanio(e.target.value)}>
              <option value="">Selecciona el tamaño</option>
              <option value="pequeño">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formCaracteristicas" className="mb-3">
            <Form.Label>Características Especiales</Form.Label>
            <Form.Control
              type="text"
              placeholder="Características especiales"
              value={caracteristicas}
              onChange={(e) => setCaracteristicas(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formTemperamento" className="mb-3">
            <Form.Label>Temperamento</Form.Label>
                  <Form.Control
                    as="select"
                    name="temperamento"
                    value={temperamento}
                    onChange={(e) => setTemperamento(e.target.value)}
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
          <Form.Group controlId="formVacunas" className="mb-3">
            <Form.Label>Vacunas</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vacunas del perro"
              value={vacunas}
              onChange={(e) => setVacunas(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEsterilizado" className="mb-3">
            <Form.Label>Esterilizado</Form.Label>
            <Form.Select value={esterilizado} onChange={(e) => setEsterilizado(e.target.value)}>
              <option value="">Selecciona una opción</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Registrar un perro
          </Button>
        </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default RegistroPerrosRefugio;