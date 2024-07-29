import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './RegistroPerros.css';

const RegistroPerros = () => {
  const [file, setFile] = useState(null);
  const [formType, setFormType] = useState('encontrado');
  const [formData, setFormData] = useState({
    ubicacion: '',
    tieneCollar: '',
    nombre: '',
    edad: '',
    color: '',
    caracteristicas: '',
    fecha: '',
  });
  const handleFormTypeChange = (event) => {
      setFormType(event.target.value);
    };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append('file', file);
    form.append('formType', formType);
    for (const key in formData) {
      form.append(key, formData[key]);
  };

  
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
                <Form.Group controlId="nombre" className="mb-3">
                  <Form.Label>¿Sabes su nombre? Ingresa el nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre del perro"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="tieneCollar" className="mb-3">
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
                
                <Form.Group controlId="edad" className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Edad del perro"
                    name="edad"
                    value={formData.edad}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="color" className="mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Color del perro"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="fecha" className="mb-3">
                  <Form.Label>Fecha en la que se encontró</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="ubicacion" className="mb-3">
                  <Form.Label>Ubicación donde lo encontraste</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa la ubicación"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="caracteristicas" className="mb-3">
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
                <Form.Group controlId="nombre" className="mb-3">
                  <Form.Label>Nombre del perro</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre del perro"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="tieneCollar" className="mb-3">
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
                <Form.Group controlId="edad" className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Edad del perro"
                    name="edad"
                    value={formData.edad}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="color" className="mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Color del perro"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="fecha" className="mb-3">
                  <Form.Label>Fecha en la que se perdió</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="ubicacion" className="mb-3">
                  <Form.Label>Ubicación donde se perdió</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa la ubicación"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="caracteristicas" className="mb-3">
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
            <Button variant="primary" type="submit">

              Registrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistroPerros;
