import React from 'react';

const HeadSection = ({ imagen1, imagen2, imagen3, titulo, descripcion, cuenta, celular, ciudad, estado, instagram, logo }) => {
  return (
    <div className="head-section">
      <img src={logo} alt="Logo" className="logo" />
      <h1>{titulo}</h1>
      <p>{descripcion}</p>
      <p>Cuenta: {cuenta}</p>
      <p>Teléfono: {celular}</p>
      <p>Ciudad: {ciudad}, {estado}</p>
      <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
      <div className="images">
        <img src={imagen1} alt="Imagen 1" />
        <img src={imagen2} alt="Imagen 2" />
        <img src={imagen3} alt="Imagen 3" />
      </div>
    </div>
  );
};

export default HeadSection;
