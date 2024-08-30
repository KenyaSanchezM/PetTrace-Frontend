import React from 'react';
import { Card } from 'react-bootstrap';

const TarjetaPerros = ({ imagen, nombre, edad, tamano, descripcion }) => {
  return (
    <Card className="my-3">
      <Card.Img variant="top" src={imagen} alt={nombre} />
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>Edad: {edad}</Card.Text>
        <Card.Text>Tamaño: {tamano}</Card.Text>
        <Card.Text>{descripcion}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TarjetaPerros;
