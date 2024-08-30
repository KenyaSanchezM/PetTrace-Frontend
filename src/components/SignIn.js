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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    
    try {
        const response = await axios.post('http://localhost:8000/api/inicio-sesion/', {
          email: formData.email,
          password: formData.password
        });

        console.log('Inicio de sesión exitoso:', response.data);

        // Extraer tokens y user_type
        const { access,refresh, user_type } = response.data;

        if (access) {
          localStorage.setItem('access_token', access);
          localStorage.setItem('refresh_token', response.data.refresh);

          // Redirige según el tipo de usuario
          if (user_type === 'shelter') {
            window.location.href = '/perfil-refugio';
          } else {
            window.location.href = '/perfil-usuario';
          }
          
          // Cierra el modal
          handleClose();
        } else {
          setError('No se recibieron tokens válidos.');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
        setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          {error && <div className="error">{error}</div>}
          <Button variant="primary" type="submit">
            Iniciar Sesión
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
