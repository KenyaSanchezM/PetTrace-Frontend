import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SignIn.css';

const SignIn = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/inicio-sesion/', formData);
      const { access, refresh } = response.data;
  
      // Almacenar los tokens en localStorage
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
  
      // Cerrar el modal o redirigir al usuario
      handleClose();
    } catch (error) {
      setError('Error al iniciar sesión');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar sesión</Modal.Title>
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
          {error && <p className="text-danger">{error}</p>}
          <Button className="button custom-button" type="submit">
            Iniciar Sesión
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
