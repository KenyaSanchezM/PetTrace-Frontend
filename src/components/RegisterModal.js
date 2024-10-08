import React, { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './Register.css';
import Swal from 'sweetalert2';


const estados = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 
  'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 
  'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 
  'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

const RegisterModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    telefono: '',
    password: '',
    user_type: 'user',  // Añadido para diferenciar entre usuario regular y refugio
    profile_image: null,
    estado: '',
    ciudad: '',
    direccion: '',
    codigoPostal: '',
    descripcion: '',
    cuenta: '',
    image1: null,
    image2: null,
    image3: null,
  });

  const [error, setError] = useState('');
  
  const handleFileChange = (event) => {
    setFormData({ ...formData, profile_image: event.target.files[0] });
  };

  const handleImage1Change = (event) => {
    setFormData({ ...formData, image1: event.target.files[0] });
  };

  const handleImage2Change = (event) => {
    setFormData({ ...formData, image2: event.target.files[0] });
  };

  const handleImage3Change = (event) => {
    setFormData({ ...formData, image3: event.target.files[0] });
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = formData.user_type === 'shelter' ? 'http://localhost:8000/api/registro-refugio/' : 'http://localhost:8000/api/registro-usuario/';
    
    const formDataToSend = new FormData();
    formDataToSend.append('email', formData.email);
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('telefono', formData.telefono);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('user_type', formData.user_type);
    if (formData.profile_image) {
      formDataToSend.append('profile_image', formData.profile_image);
    }
    
    if (formData.user_type === 'shelter') {
      formDataToSend.append('estado', formData.estado);
      formDataToSend.append('ciudad', formData.ciudad);
      formDataToSend.append('direccion', formData.direccion);
      formDataToSend.append('codigoPostal', formData.codigoPostal);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('cuenta', formData.cuenta);
      if (formData.image1) {
        formDataToSend.append('image1', formData.image1);
      }
      if (formData.image2) {
        formDataToSend.append('image2', formData.image2);
      }
      if (formData.image3) {
        formDataToSend.append('image3', formData.image3);
      }
      
      
    }
    
    try {
      const response = await axios.post(url, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Mostrar mensaje de éxito con 
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Tu cuenta ha sido registrada correctamente.',
          confirmButtonText: 'Aceptar'
        });
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
                <Form.Group controlId="user_type" className="mb-3">
                  <Form.Label>Tipo de usuario</Form.Label>
                  <Form.Control as="select" name="user_type" value={formData.user_type} onChange={handleSelectChange}>
                    <option value="user">Usuario</option>
                    <option value="shelter">Refugio</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="profile_image" className="mb-3">
                  <Form.Label>Imagen de perfil</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                  />
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

                {formData.user_type === 'shelter' && (
                  <>
                    <Form.Group controlId="image1" className="mb-3">
                      <Form.Label>Imagen del refugio</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleImage1Change}
                      />
                    </Form.Group>
                    <Form.Group controlId="image2" className="mb-3">
                      <Form.Label>Imagen del refugio</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleImage2Change}
                      />
                    </Form.Group>
                    <Form.Group controlId="image3" className="mb-3">
                      <Form.Label>Imagen del refugio</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleImage3Change}
                      />
                    </Form.Group>
                    <Form.Group controlId="estado" className="mb-3">
                      <Form.Label>Estado</Form.Label>
                      <Form.Control
                        as="select"
                        name="estado"
                        value={formData.estado}
                        onChange={handleSelectChange}
                      >
                        <option value="">Selecciona un estado</option>
                        {estados.map((estado, index) => (
                          <option key={index} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </Form.Control>
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
                    <Form.Group controlId="descripcion" className="mb-3">
                      <Form.Label>Descripcion</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="cuenta" className="mb-3">
                      <Form.Label>Cuenta</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="cuenta"
                        name="cuenta"
                        value={formData.cuenta}
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
