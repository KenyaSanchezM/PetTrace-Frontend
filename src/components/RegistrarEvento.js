import React, { useState } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import './RegistrarEvento.css';
import TimePicker from 'react-time-picker';
import axios from 'axios';
import 'react-time-picker/dist/TimePicker.css';

const RegistrarEvento = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    nombre_evento: '',
    lugar_evento: '',
    descripcion_evento: '',
    anfitrion_evento: '',
    motivo: '',
    fecha_evento: '',
    hora_evento: '10:00',
  });
  const [error, setError] = useState('');

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
    });
    setError(''); // Restablecer error también
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');

    const formDataToSubmit = new FormData();
    // Agregar los datos del formulario
    formDataToSubmit.append('nombre_evento', formData.nombre_evento);
    formDataToSubmit.append('descripcion_evento', formData.descripcion_evento);
    formDataToSubmit.append('lugar_evento', formData.lugar_evento);
    formDataToSubmit.append('motivo', formData.motivo);
    formDataToSubmit.append('anfitrion_evento', formData.anfitrion_evento);
    formDataToSubmit.append('fecha_evento', formData.fecha_evento);
    formDataToSubmit.append('hora_evento', formData.hora_evento);

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
    } catch (error) {
      setError('Hubo un problema al registrar el evento. Por favor, inténtalo de nuevo.'); // Manejo de error
      console.error('Error al registrar el evento:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
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
