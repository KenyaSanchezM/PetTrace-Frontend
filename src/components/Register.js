// components/RegisterModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import './Register.css';

const RegisterModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    telefono: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Aquí puedes manejar el envío del formulario
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registro de Usuarios</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
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
                
                <Button className="button custom-button" type="submit">
                  Registrar
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
