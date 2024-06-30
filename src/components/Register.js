import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Register.css';

const Register = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    rol: 'usuario',
    telefono: '',
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormTypeChange = (event) => {
    setFormData({ ...formData, rol: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(file, formData);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2 className="text-center">Registro de Usuarios</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Sube una imagen de tu credencial</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group controlId="nombre" className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="contraseña" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="rol" className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select value={formData.rol} onChange={handleFormTypeChange}>
                <option value="usuario">Usuario</option>
                <option value="refugio">Refugio</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="telefono" className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button className="button" type="submit">
              Registrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};


export default Register;
