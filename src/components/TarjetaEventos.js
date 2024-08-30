import React from 'react';
import { Card } from 'react-bootstrap';

const TarjetaEventos = ({ imagen, nombre, descripcion, fecha }) => {
  return (
    <Card className="my-3">
      <Card.Img variant="top" src={imagen} alt={nombre} />
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
        <Card.Text><small className="text-muted">Fecha: {fecha}</small></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TarjetaEventos;
