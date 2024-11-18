import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import './RegistroPerros.css';
import Swal from 'sweetalert2';


const RegistroPerros = ({ show, handleClose, user_id }) => {
  const [file, setFile] = useState(null);
  const [profileImage1, setProfileImage1] = useState(null);
  const [profileImage2, setProfileImage2] = useState(null);
  const [formType, setFormType] = useState('encontrado');
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [color, setColor] = useState([]);
  const [estado, setEstado] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tieneCollar, setTieneCollar] = useState('');
  const [caracteristicas, setCaracteristicas] = useState('');
  const [fecha, setFecha] = useState('');
  const [sexo, setSexo] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const estados = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 
    'Coahuila', 'Colima', 'Chiapas', 'Chihuahua', 'Durango', 'Distrito Federal', 
    'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 
    'Morelos', 'Nayarit', 'Oaxaca', 'Quintana Roo', 'San Luis Potosí', 
    'Sonora', 'Yucatán'
  ];
  
  

  const resetForm = () => {
    setFile(null);
    setProfileImage1(null);
    setProfileImage2(null);
    setNombre('');
    setEdad('');
    setColor([]);
    setEstado('');
    setCiudad('');
    setDireccion('');
    setTieneCollar('');
    setCaracteristicas('');
    setFecha('');
    setFormType('encontrado');
    setSexo('');
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
    
    let token = localStorage.getItem('access_token');
  
    const formData = new FormData();
    const predictionFormData = new FormData();
    predictionFormData.append('file', file);
  
    try {
      const predictionResponse = await axios.post('http://localhost:5000/predict-breed/', predictionFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
     
      const breeds = predictionResponse.data.breed.join(',');
  
      // Verifica el valor de user_id
     
      formData.append('profile_image1', profileImage1);
      formData.append('profile_image2', profileImage2);
      formData.append('nombre', nombre);
      formData.append('edad', edad);
      formData.append('color', JSON.stringify(color));
      formData.append('estado', estado);
      formData.append('ciudad', ciudad);
      formData.append('direccion', direccion);
      formData.append('tieneCollar', tieneCollar);
      formData.append('caracteristicas', caracteristicas);
      formData.append('fecha', fecha);
      formData.append('user', user_id); // Verifica que se esté agregando correctamente
      formData.append('form_type', formType);
      formData.append('sexo', sexo);
      formData.append('breeds', breeds); 
      if (file) {
        formData.append('file', file);
      }
  
      const response = await axios.post('http://localhost:8000/api/registro-perros/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      
      Swal.close(); // Cerrar el mensaje de búsqueda
  
      handleClose(); 
      resetForm();

      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Tu perrito se ha registrado correctamente.',
        confirmButtonText: 'Aceptar'
    }).then(() => {
      window.location.reload(); // Recargar la página después de la alerta
    });

    } catch (error) {
      // Lógica de reintento si el token expira
      if (error.response && error.response.status === 401 && error.response.data.code === 'token_not_valid') {
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          const refreshResponse = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken
          });
  
          token = refreshResponse.data.access;
          localStorage.setItem('access_token', token);
  
          // Reintentar la solicitud original con el nuevo token
          const retryResponse = await axios.post('http://localhost:8000/api/registro-perros/', formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          
          Swal.close(); // Cerrar el mensaje de búsqueda
          
          handleClose();
          resetForm();

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
        console.error('Error al registrar el perro:', error.response ? error.response.data : error.message);
        alert('Hubo un problema al registrar el perro. Por favor, inténtalo de nuevo.');
      }
    }
  };
  


return (
    <Modal show={show} onHide={() => { handleClose(); resetForm(); }}>
      <Modal.Header closeButton>
        <Modal.Title>Registro de perro</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '1600px', overflowY: 'auto' }}> {/* Agregar estilos aquí */}
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

          <Form.Group controlId="formType" className="mb-3">
            <Form.Label>¿Se te perdió o lo encontraste?</Form.Label>
            <Form.Select value={formType} onChange={(e) => setFormType(e.target.value)}>
              <option value="Encontrado">Encontrado</option>
              <option value="Perdido">Perdido</option>
            </Form.Select>
          </Form.Group>

          {formType === 'encontrado' ? (
              <>
                <Form.Group controlId="nombreEncontrado" className="mb-3">
                  <Form.Label>¿Sabes su nombre? Ingresa el nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre del perro"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)} 
                  />
                </Form.Group>
                <Form.Group controlId="tieneCollarEncontrado" className="mb-3">
                  <Form.Label>¿Tiene collar?</Form.Label>
                  <Form.Select
                    value={tieneCollar}
                    onChange={(e) => setTieneCollar(e.target.value)}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="edadEncontrado" className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    as="select"
                    name="Edad"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                  >
                    <option value="">Selecciona una opcion</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Joven">Joven</option>
                    <option value="Adulto">Adulto</option>
                    <option value="Anciano">Anciano</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formSexo" className="mb-3">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                    <option value="Selecciona">Selecciona</option>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="colorEncontrado" className="mb-3">
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
                  <Form.Group controlId="fechaEncontrado" className="mb-3">
                    <Form.Label>Fecha en la que se encontró</Form.Label>
                    <Form.Control
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      min="2010-01-01"  // Fecha mínima es 1 de enero de 2010
                      max={new Date().toISOString().split("T")[0]}  // Fecha máxima es hoy
                    />
                  </Form.Group>

                  <Form.Group controlId="estadoEncontrado" className="mb-3">
                    <Form.Label>Estado dónde se encontró</Form.Label>
                    <Form.Control
                      as="select"
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                    >
                      <option value="">Seleccione un estado</option>
                      {estados.map((estado, index) => (
                        <option key={index} value={estado}>
                          {estado}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

              <Form.Group controlId="ciudadEncontrado" className="mb-3">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Guadalajara"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="direccionEncontrado" className="mb-3">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Av. 1 entre calle 2 y calle 3"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="caracteristicasEncontrado" className="mb-3">
                <Form.Label>Características especiales</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Características especiales"
                  value={caracteristicas}
                  onChange={(e) => setCaracteristicas(e.target.value)}
                />
              </Form.Group>
              </>
            ) : (
              <>
                <Form.Group controlId="nombrePerdido" className="mb-3">
                  <Form.Label>Nombre del perro</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre del perro"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="edadPerdido" className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    as="select"
                    name="Edad"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                  >
                    <option value="">Selecciona una opcion</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Joven">Joven</option>
                    <option value="Adulto">Adulto</option>
                    <option value="Anciano">Anciano</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="tieneCollarPerdido" className="mb-3">
                  <Form.Label>¿Tiene collar?</Form.Label>
                  <Form.Select
                    name="tieneCollar"
                    value={tieneCollar}
                    onChange={(e) => setTieneCollar(e.target.value)}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formSexo" className="mb-3">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                    <option value="">Selecciona</option>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="colorPerdido" className="mb-3">
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
                      id="colorCafe"
                      checked={color.includes('cafe')}
                    onChange={handleColorChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Amarillo"
                      name="amarillo"
                      id="colorAmarillo"
                      checked={color.includes('amarillo')}
                    onChange={handleColorChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Rojizo"
                      name="rojizo"
                      id="colorRojizo"
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
                <Form.Group controlId="fechaPerdido" className="mb-3">
                  <Form.Label>Fecha en la que se perdió</Form.Label>
                  <Form.Control
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    min="2018-01-01"  // Fecha mínima es 1 de enero de 2010
                    max={new Date().toISOString().split("T")[0]}  // Fecha máxima es hoy
                  />
                </Form.Group>
                
                <Form.Group controlId="estadoPerdido" className="mb-3">
                  <Form.Label>Estado donde se perdió</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Selecciona una opcion"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  >
                    <option value="">Seleccione un estado</option>
                    {estados.map((estado, index) => (
                      <option key={index} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="ciudadPerdido" className="mb-3">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="direccionPerdido" className="mb-3">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Av. 1 entre calle 2 y calle 3"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </Form.Group>
                {/* Integración del mapa 
                <Form.Group className="mb-3">
                  <Form.Label>Selecciona la ubicación donde lo perdiste</Form.Label>
                  <MapaSeleccion ubicacion={formData.ubicacion} onUbicacionChange={handleUbicacionChange} />
                </Form.Group> */}
                <Form.Group controlId="caracteristicasPerdido" className="mb-3">
                  <Form.Label>Características especiales</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Características especiales"
                    value={caracteristicas}
                    onChange={(e) => setCaracteristicas(e.target.value)}
                  />
                </Form.Group>
              </>
            )}
            <Button variant="primary" type="submit">
              Registrar un perro
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
  );
};

export default RegistroPerros;
