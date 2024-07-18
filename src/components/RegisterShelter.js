import React, { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import './RegisterShelter.css';

const estados = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 
  'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 
  'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 
  'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

const RegisterShelterModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    telefono: '',
    estado: '',
    ciudad: '',
    direccion: '',
    CP: ''
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
        <Modal.Title>Registro de Refugios</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre" className="mb-3">
              <Form.Label>Nombre del refugio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del refugio"
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
            <Row>
              <Col md={6}>
                <Form.Group controlId="estado" className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    as="select"
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona un estado</option>
                    {estados.map((estado, index) => (
                      <option key={index} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
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
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <Form.Group controlId="direccion" className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Calle y número"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="CP" className="mb-3">
                  <Form.Label>Código Postal</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Código Postal"
                    name="CP"
                    value={formData.CP}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button className="button custom-button" type="submit">
              Registrar
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterShelterModal;
