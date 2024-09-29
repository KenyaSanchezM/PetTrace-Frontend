import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './SignIn.css';

const SignIn = ({ show, handleClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para el loading

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Iniciar loading
    const { email, password } = formData;

    try {
      const response = await axios.post('http://localhost:8000/api/inicio-sesion/', {
        email: formData.email,
        password: formData.password,
      });

      console.log('Inicio de sesión exitoso:', response.data);
      const { access, refresh, user_type } = response.data;

      if (access) {
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('user_type', user_type);

        // Llamar a la función de éxito de inicio de sesión
        onLoginSuccess();

        // Redirige según el tipo de usuario
        if (user_type === 'shelter') {
          window.location.href = '/perfil-refugio';
        } else {
          window.location.href = '/perfil-usuario';
        }
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setError('Correo electrónico o contraseña incorrectos.');
    } finally {
      setLoading(false); // Detener loading
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton>
        <Modal.Title>INICIA SESIÓN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Ingrese su correo electrónico"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Contraseña"
              required
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <Button className="custom-button-SI" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Iniciando...
              </>
            ) : (
              'Iniciar'
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
