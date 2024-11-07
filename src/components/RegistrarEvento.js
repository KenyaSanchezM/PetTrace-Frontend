import React, { useState } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import './RegistrarEvento.css';
import TimePicker from 'react-time-picker';
import axios from 'axios';
import Swal from 'sweetalert2';


const RegistrarEvento = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    nombre_evento: '',
    lugar_evento: '',
    descripcion_evento: '',
    anfitrion_evento: '',
    motivo: '',
    fecha_evento: '',
    hora_evento: '10:00',
    imagen_evento: null
  });
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFormData({ ...formData, imagen_evento: event.target.files[0] });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeChange = (newTime) => {
    setFormData({ ...formData, hora_evento: newTime }); // Cambiado 'hora' a 'hora_evento'
  };

  const resetForm = () => {
    setFormData({
      nombre_evento: '',
      lugar_evento: '',
      descripcion_evento: '',
      anfitrion_evento: '',
      motivo: '',
      fecha_evento: '',
      hora_evento: '10:00',
      imagen_evento: null,
    });
    setError(''); // Restablecer error también
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('access_token');

    const formDataToSubmit = new FormData();
    // Agregar los datos del formulario
    formDataToSubmit.append('nombre_evento', formData.nombre_evento);
    formDataToSubmit.append('descripcion_evento', formData.descripcion_evento);
    formDataToSubmit.append('lugar_evento', formData.lugar_evento);
    formDataToSubmit.append('motivo', formData.motivo);
    formDataToSubmit.append('anfitrion_evento', formData.anfitrion_evento);
    formDataToSubmit.append('fecha_evento', formData.fecha_evento);
    formDataToSubmit.append('hora_evento', formData.hora_evento);
    if (formData.imagen_evento) {
      formDataToSubmit.append('imagen_evento', formData.imagen_evento);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/registrar-evento/', formDataToSubmit, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Evento registrado:', response.data);
      handleClose(); 
      resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Tu perrito se ha registrado correctamente.',
        confirmButtonText: 'Aceptar'
    }).then(() => {
      window.location.reload(); // Recargar la página después de la alerta
    });
    } catch (error) {
      // Lógica de reintento si el token expira
      if (error.response && error.response.status === 401 && error.response.data.code === 'token_not_valid') {
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          const refreshResponse = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken
          });
  
          token = refreshResponse.data.access;
          localStorage.setItem('access_token', token);
  
          // Reintentar la solicitud original con el nuevo token
          const retryResponse = await axios.post('http://localhost:8000/api/registrar-evento/', formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
  
          handleClose();
          resetForm();
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Tu perrito se ha registrado correctamente.',
            confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.reload(); // Recargar la página después de la alerta
        });
        } catch (refreshError) {
          console.error('Error al refrescar el token:', refreshError.response ? refreshError.response.data : refreshError.message);
          alert('Tu sesión ha expirado y no se pudo renovar. Por favor, inicia sesión de nuevo.');
        }
      } else {
        console.error('Error al registrar el perro:', error.response ? error.response.data : error.message);
        alert('Hubo un problema al registrar el perro. Por favor, inténtalo de nuevo.');
      }
    
    }
  };

  return (
    <Modal show={show} onHide={() => { handleClose(); resetForm(); }}>
      <Modal.Header closeButton>
        <Modal.Title>Registra tu evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre_evento" className="mb-3">
              <Form.Label>Nombre del Evento</Form.Label>
              <Form.Control
                type="text"
                placeholder="nombre"
                name="nombre_evento"
                value={formData.nombre_evento}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="imagen_evento" className="mb-3">
                  <Form.Label>Imagen del evento</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                  />
                </Form.Group>
            <Form.Group controlId="lugarEvento" className="mb-3">
              <Form.Label>Lugar del evento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dirección o ubicación"
                name="lugar_evento"
                value={formData.lugar_evento}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="descripcion_evento" className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción del evento"
                name="descripcion_evento"
                value={formData.descripcion_evento}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="motivo" className="mb-3">
              <Form.Label>Motivo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Motivo"
                name="motivo"
                value={formData.motivo}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="anfitrionEvento" className="mb-3">
              <Form.Label>Anfitrión</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del anfitrión"
                name="anfitrion_evento"
                value={formData.anfitrion_evento}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="fechaEvento" className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha_evento"
                value={formData.fecha_evento}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="horaEvento" className="mb-3">
              <Form.Label>Selecciona la hora</Form.Label>
              <TimePicker
                id="time"
                onChange={handleTimeChange}
                value={formData.hora_evento}
                format="HH:mm"
              />
            </Form.Group>
            
            <Button className="button custom-button" type="submit">
              Registrar
            </Button>
            {error && <p className="text-danger">{error}</p>}
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default RegistrarEvento;
