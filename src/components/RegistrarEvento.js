import React, { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import './RegistrarEvento.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const RegistrarEvento = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    lugar: '',
    anfitrion: '',
    motivo: '',
    fecha: '',
    hora: '10:00',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeChange = (newTime) => {
    setFormData({ ...formData, hora: newTime });
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
        <Modal.Title>Registra tu evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="lugarEvento" className="mb-3">
              <Form.Label>Lugar del evento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Direccion o ubicacion"
                name="lugar"
                value={formData.lugar}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="motivoEvento" className="mb-3">
              <Form.Label>Motivo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Motivo del evento"
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
                name="anfitrion"
                value={formData.anfitrion}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="fechaEvento" className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                  />
            </Form.Group>
            <Form.Group controlId="horaEvento" className="mb-3">
              <Form.Label>Selecciona la hora</Form.Label>
              <TimePicker
                id="time"
                onChange={handleTimeChange}
                value={formData.hora}
                format="HH:mm"
              />
            </Form.Group>
            
            <Button className="button custom-button" type="submit">
              Registrar
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default RegistrarEvento;
