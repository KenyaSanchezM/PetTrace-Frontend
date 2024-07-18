import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './RegistroPerros.css';
//import MapaSeleccion from './MapaSeleccion';

const RegistroPerros = () => {
  const [file, setFile] = useState(null);
  const [formType, setFormType] = useState('encontrado');
  const [formData, setFormData] = useState({
    ubicacion: '',
    tieneCollar: '',
    nombre: '',
    edad: '',
    color: [],
    caracteristicas: '',
    fecha: '',
    estatus:'',
  });
  const handleFormTypeChange = (event) => {
    const value = event.target.value;
    setFormType(value);
    setFormData({ ...formData, estatus: value === 'encontrado' ? 'encontrado' : 'perdido' });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    // Manejo especial para checkboxes
    if (type === 'checkbox') {
      let updatedColors = [...formData.color];
      if (checked && !updatedColors.includes(name)) {
        updatedColors.push(name);
      } else {
        updatedColors = updatedColors.filter(color => color !== name);
      }
      setFormData({ ...formData, color: updatedColors });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUbicacionChange = (newUbicacion) => {
    setFormData({ ...formData, ubicacion: newUbicacion });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append('file', file);
    form.append('formType', formType);

    // Append colors as individual items
    formData.color.forEach(color => {
      form.append('color', color);
    });
    // Append other form data
    for (const key in formData) {
      if (key !== 'color') { // Skip appending color array again
        form.append(key, formData[key]);
      }
    }

  
    try {
      const response = await axios.post('http://localhost:8000/api/RegistroPerros/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Maneja la respuesta del servidor
    } catch (error) {
      console.error('Error subiendo el formulario:', error);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2 className="text-center">Registro de Perros</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Sube una imagen</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group controlId="formType" className="mb-3">
              <Form.Label>¿Es un perro encontrado o perdido?</Form.Label>
              <Form.Select value={formType} onChange={handleFormTypeChange}>
                <option value="encontrado">Encontrado</option>
                <option value="perdido">Perdido</option>
              </Form.Select>
            </Form.Group>

            {formType === 'encontrado' ? (
              <>
              
                <Form.Group controlId="nombreEncontrado" className="mb-3">
                  <Form.Label>¿Sabes su nombre? Ingresa el nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre del perro"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="tieneCollarEncontrado" className="mb-3">
                  <Form.Label>¿Tiene collar?</Form.Label>
                  <Form.Select
                    name="tieneCollar"
                    value={formData.tieneCollar}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group controlId="edadEncontrado" className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Edad del perro"
                    name="edad"
                    value={formData.edad}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                
              <Form.Group controlId="colorEncontrado" className="mb-3">
              <Form.Label>Colores</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  label="Negro"
                  id="colorNegro"
                  name="negro"
                  checked={formData.color.negro}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Blanco"
                  name="blanco"
                  id="colorBlanco"
                  checked={formData.color.blanco}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Gris"
                  name="gris"
                  id="coloGris"
                  checked={formData.color.gris}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Cafe"
                  name="cafe"
                  id="colorCafe"
                  checked={formData.color.cafe}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Amarillo"
                  name="amarillo"
                  id="colorAmarillo"
                  checked={formData.color.amarillo}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Rojizo"
                  name="rojizo"
                  id="colorRojizo"
                  checked={formData.color.rojizo}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Dorado"
                  name="dorado"
                  id="colorDorado"
                  checked={formData.color.dorado}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Naranja"
                  name="naranja"
                  id="colorNaranja"
                  checked={formData.color.naranja}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Manchas"
                  name="manchas"
                  id="colorManchas"
                  checked={formData.color.manchas}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Multicolor"
                  name="multicolor"
                  id="colorMulticolor"
                  checked={formData.color.multicolor}
                  onChange={handleInputChange}
                />
                
              </div>
            </Form.Group>

                <Form.Group controlId="fechaEncontrado" className="mb-3">
                  <Form.Label>Fecha en la que se encontró</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="ubicacionEncontrado" className="mb-3">
                  <Form.Label>Ubicacion</Form.Label>
                  <Form.Control
                    type="text"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                
                {/* Integración del mapa 
                <Form.Group className="mb-3">
                  <Form.Label>Selecciona la ubicación donde lo encontraste</Form.Label>
                  <MapaSeleccion ubicacion={formData.ubicacion} onUbicacionChange={handleUbicacionChange} />
                </Form.Group>*/}

                <Form.Group controlId="caracteristicasEncontrado" className="mb-3">
                  <Form.Label>Características especiales</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Características especiales"
                    name="caracteristicas"
                    value={formData.caracteristicas}
                    onChange={handleInputChange}
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
                    value={formData.nombre}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="tieneCollarPerdido" className="mb-3">
                  <Form.Label>¿Tiene collar?</Form.Label>
                  <Form.Select
                    name="tieneCollar"
                    value={formData.tieneCollar}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="edadPerdido" className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Edad del perro"
                    name="edad"
                    value={formData.edad}
                    onChange={handleInputChange}
                  />
                </Form.Group>

              <Form.Group controlId="colorPerdido" className="mb-3">
              <Form.Label>Colores</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  label="Negro"
                  id="colorNegro"
                  name="negro"
                  checked={formData.color.negro}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Blanco"
                  name="blanco"
                  id="colorBlanco"
                  checked={formData.color.blanco}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Gris"
                  name="gris"
                  id="coloGris"
                  checked={formData.color.gris}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Cafe"
                  name="cafe"
                  id="colorCafe"
                  checked={formData.color.cafe}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Amarillo"
                  name="amarillo"
                  id="colorAmarillo"
                  checked={formData.color.amarillo}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Rojizo"
                  name="rojizo"
                  id="colorRojizo"
                  checked={formData.color.rojizo}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Dorado"
                  name="dorado"
                  id="colorDorado"
                  checked={formData.color.dorado}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Naranja"
                  name="naranja"
                  id="colorNaranja"
                  checked={formData.color.naranja}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Manchas"
                  name="manchas"
                  id="colorManchas"
                  checked={formData.color.manchas}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Multicolor"
                  name="multicolor"
                  id="colorMulticolor"
                  checked={formData.color.multicolor}
                  onChange={handleInputChange}
                />
                
              </div>
            </Form.Group>

                <Form.Group controlId="fechaPerdido" className="mb-3">
                  <Form.Label>Fecha en la que se perdió</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="ubicacionPerdido" className="mb-3">
                  <Form.Label>Ubicacion</Form.Label>
                  <Form.Control
                    type="text"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                {/* Integración del mapa 
                <Form.Group className="mb-3">
                  <Form.Label>Selecciona la ubicación donde lo encontraste</Form.Label>
                  <MapaSeleccion ubicacion={formData.ubicacion} onUbicacionChange={handleUbicacionChange} />
                </Form.Group>
                */}

                <Form.Group controlId="caracteristicasPerdido" className="mb-3">
                  <Form.Label>Características especiales</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Características especiales"
                    name="caracteristicas"
                    value={formData.caracteristicas}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                
              </>
            )}

            <Button variant="primary" type="submit" className="button">
              Registrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistroPerros;
