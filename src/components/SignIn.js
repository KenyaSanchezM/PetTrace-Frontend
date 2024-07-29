import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './SignIn.css';


const SignIn = ({ show, handleClose }) => {
    const [formData, setFormData] = useState({
      email: '',
      contraseña: '',
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Aquí puedes manejar el envío del formulario
      console.log(formData);
      handleClose(); // Cierra el modal después de enviar el formulario
    };
  
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
              Iniciar Sesión
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };
  
  export default SignIn;