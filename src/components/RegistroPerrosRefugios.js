import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import './RegistroPerrosRefugios.css';

const RegistroPerrosRefugio = ({ show, handleClose, shelterUserId }) => {
  const [file, setFile] = useState(null);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [color, setColor] = useState([]);
  const [sexo, setSexo] = useState('');
  const [tamanio, setTamanio] = useState('');
  const [caracteristicas, setCaracteristicas] = useState('');
  const [temperamento, setTemperamento] = useState('');
  const [vacunas, setVacunas] = useState('');
  const [esterilizado, setEsterilizado] = useState('');

  const resetForm = () => {
    setFile(null);
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

  const handleColorChange = (event) => {
    const { name, checked } = event.target;
    setColor((prevColors) => 
      checked ? [...prevColors, name] : prevColors.filter(color => color !== name)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const predictionResponse = await axios.post('http://localhost:8000/api/predict-breed/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      const breeds = predictionResponse.data.top_10_breeds.join(',');

      formData.append('nombre', nombre);
      formData.append('edad', edad);
      formData.append('color', JSON.stringify(color));
      formData.append('sexo', sexo);
      formData.append('tamanio', tamanio);
      formData.append('caracteristicas', caracteristicas);
      formData.append('temperamento', temperamento);
      formData.append('vacunas', vacunas);
      formData.append('esterilizado', esterilizado);
      formData.append('shelter_user', shelterUserId); // Usar el ID del usuario del refugio
      formData.append('breeds', breeds);

      if (file) {
        formData.append('file', file); 
      }

      const response = await axios.post('http://localhost:8000/api/registro-perros-refugios/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Perro de refugio registrado:', response.data);
      handleClose(); 
      resetForm();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (refreshToken) {
          try {
            const refreshResponse = await axios.post('http://localhost:8000/api/token/refresh/', {
              refresh: refreshToken
            });

            token = refreshResponse.data.access;
            localStorage.setItem('token', token);

            const retryResponse = await axios.post('http://localhost:8000/api/registro-perros-refugios/', formData, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
              }
            });

            console.log('Perro de refugio registrado:', retryResponse.data);
            handleClose(); 
            resetForm();
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
    }
  };
  
  return (
    <Modal show={show} onHide={() => { handleClose(); resetForm(); }}>
      <Modal.Header closeButton>
        <Modal.Title>Registro de Perros de Refugio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Sube una imagen</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
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
              type="text"
              placeholder="Temperamento del perro"
              value={temperamento}
              onChange={(e) => setTemperamento(e.target.value)}
            />
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
            Registrar Perro
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegistroPerrosRefugio;