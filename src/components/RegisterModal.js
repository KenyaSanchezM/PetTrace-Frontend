import React, { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './Register.css';

const RegisterModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    telefono: '',
    password: '',
    userType: 'user'  // Añadido para diferenciar entre usuario regular y refugio
  });

  const [error, setError] = useState('');
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, userType: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = formData.userType === 'shelter' ? 'http://localhost:8000/api/registro-refugio/' : 'http://localhost:8000/api/registro-usuario/';
    
    try {
      const response = await axios.post(url, formData);
      console.log(response.data);
      handleClose();
    } catch (error) {
      setError('Error al registrar usuario');
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Regístrate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="userType" className="mb-3">
                  <Form.Label>Tipo de usuario</Form.Label>
                  <Form.Control as="select" name="userType" value={formData.userType} onChange={handleSelectChange}>
                    <option value="user">Usuario Regular</option>
                    <option value="shelter">Refugio</option>
                  </Form.Control>
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
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                {formData.userType === 'shelter' && (
                  <>
                    <Form.Group controlId="estado" className="mb-3">
                      <Form.Label>Estado</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="ciudad" className="mb-3">
                      <Form.Label>Ciudad</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ciudad"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="direccion" className="mb-3">
                      <Form.Label>Dirección</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Dirección"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="codigoPostal" className="mb-3">
                      <Form.Label>Código Postal</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Código Postal"
                        name="codigoPostal"
                        value={formData.codigoPostal}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </>
                )}

                <Button className="button custom-button" type="submit">
                  Registrar
                </Button>
                {error && <p className="text-danger">{error}</p>}
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
