import React, { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import MatchResults from './MatchResults'; // Asegúrate de importar el componente
import { useNavigate } from 'react-router-dom';

const availableBreeds = [
    'Afgano', 'Akita', 'Alaskan Malamute', 'Basenji', 'Basset Hound', 'Beagle', 
    'Bearded Collie', 'Bichon Frise', 'Border Collie', 'Border Terrier', 'Borzoi', 
    'Boston Terrier', 'Boxer', 'Bulldog', 'Bullmastiff', 'Cairn Terrier', 'Cane Corso', 
    'Caniche', 'Cavalier King Charles Spaniel', 'Chihuahua', 'Chow Chow', 'Cocker Spaniel', 
    'Collie', 'Dalmata', 'Doberman Pinscher', 'Dogo Argentino', 'Dogue De Bourdeaux', 
    'FoxTerrier', 'Galgo Espanol', 'Golden Retriver', 'Gran Danes', 'Greyhound', 
    'Grifon De Bruselas', 'Havanese', 'Husky', 'Irish Setter', 'Jack Russel Terrier', 
    'Keeshond', 'Kerry Blue Terrier', 'Komondor', 'Kuvasz', 'Labrador Retriever', 
    'LhasaApso', 'Maltes', 'Mastin Napolitano', 'Mastin Tibetano', 'Norfolk Terrier', 
    'NorwichTerrier', 'Papillon', 'Pastor Aleman', 'Pequines', 'Perro De Agua Portugues', 
    'Perro De Montana De Berna', 'Perro Lobo De Saarloos', 'Pinscher Miniatura', 'Pit Bull', 
    'Pomerania', 'Presa Canario', 'Pug', 'Rat Terrier', 'Rottweiler', 'Saluki', 
    'Samoyedo', 'San Bernardo', 'Schipperke', 'Schnauzer', 'Setter Inglés', 'SharPei', 
    'ShibaInu', 'Shih Tzu', 'Staffordshire Bull Terrier', 'Yorkshire Terrier'
];
  

    const MatchForm = ({ show, handleClose, shelterId }) => {
    const [formData, setFormData] = useState({
        tamanio: '',
        edad: '',
        raza: '',
        temperamento: '',
    });

    const [error, setError] = useState('');
    const [results, setResults] = useState([]); // Estado para almacenar los resultados

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleColorChange = (event) => {
        const { name, checked } = event.target;
        let updatedColors = [...formData.color];

        if (checked) {
        updatedColors.push(name);  // Agrega el color seleccionado
        } else {
        updatedColors = updatedColors.filter((color) => color !== name);  // Remueve el color si se desmarca
        }

        setFormData({ ...formData, color: updatedColors });
    };

    const handleRazaChange = (event) => {
        setFormData({ ...formData, raza: event.target.value });
    };
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('access_token');
      
        if (!token) {
          setError('No hay token disponible, por favor, inicia sesión nuevamente.');
          return;
        }
      
        const dataToSend = {
          ...formData,
          shelter_id: shelterId,
        };
      
        try {
          const response = await axios.post('http://localhost:8000/api/match/', dataToSend, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          console.log('Respuesta de la API:', response.data);
          handleClose(); // Cierra el modal
      
          // Redirige a la página de resultados con los datos
          navigate('/match-resultados', { state: { results: response.data } });
        } catch (error) {
          console.error('Error al enviar las preferencias:', error);
          setError('Error al enviar las preferencias. Por favor, revisa tu conexión o inicia sesión nuevamente.');
        }
      };
      
  
  

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Preferencias de Mascota Ideal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="tamaño" className="mb-3">
                  <Form.Label>Tamaño</Form.Label>
                  <Form.Control
                    as="select"
                    name="tamanio"
                    value={formData.tamanio}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona un tamaño</option>
                    <option value="pequeño">Pequeño</option>
                    <option value="mediano">Mediano</option>
                    <option value="grande">Grande</option>
                  </Form.Control>
                </Form.Group>

                {/* Edad */}
                <Form.Group controlId="edad" className="mb-3">
                <Form.Label>Edad</Form.Label>
                <Form.Control
                    as="select"
                    name="edad"
                    value={formData.edad}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona una edad</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Joven">Joven</option>
                    <option value="Adulto">Adulto</option>
                    <option value="Anciano">Anciano</option>
                  </Form.Control>
                </Form.Group>
                {/* Selección de Razas */}
                <Form.Group controlId="raza" className="mb-3">
                    <Form.Label>Raza</Form.Label>
                    <Form.Control as="select" value={formData.raza} onChange={handleRazaChange}>
                    <option value="">Selecciona una raza</option>
                    {availableBreeds.map((breed) => (
                        <option key={breed} value={breed}>
                        {breed}
                        </option>
                    ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="temperamento" className="mb-3">
                  <Form.Label>Temperamento</Form.Label>
                  <Form.Control
                    as="select"
                    name="temperamento"
                    value={formData.temperamento}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona un temperamento</option>
                    <option value="juguetón">Juguetón</option>
                    <option value="tranquilo">Tranquilo</option>
                    <option value="activo">Activo</option>
                    <option value="noble">Noble</option>
                    <option value="ansioso">Ansioso</option>
                    <option value="miedoso">Miedoso</option>
                    <option value="apegado">Apegado</option>
                    <option value="hiperactivo">Hiperactivo</option>
                    <option value="agradable">Agradable</option>
                    <option value="desapegado">Desapegado</option>
                  </Form.Control>
                </Form.Group>

                <Button className="button custom-button" type="submit">
                  Enviar Preferencias
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

export default MatchForm;
