import React from 'react';
import { FaDog, FaRuler, FaPalette } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import './MatchResults.css';

const MatchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationResults = location.state?.results || [];
  const defaultImage = "/images/eventos.jpg";

  const TarjetaPerrosMatch = ({ imagen, nombre, edad, tamanio, descripcion, breed, temperamento }) => (
    <div className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center">
      <div className="card h-100 shadow border-0 match-results-interactive-card">
        <div className="match-results-image-container">
          <img
            src={imagen ? `http://localhost:8000${imagen}` : defaultImage}
            className="card-img-top"
            alt="Perro"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text">
            <span><FaDog /> <b>Edad:</b> {edad}</span><br />
            <span><FaRuler /> <b>Tamaño:</b> {tamanio}</span><br />
            <span><FaPalette /><b> Color:</b> {descripcion}</span><br />
            <span> <b>Razas:</b> {breed}</span><br />
            <span> <b>Temperamento:</b> {temperamento}</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="match-results-container mt-4">
      {locationResults.length > 0 ? (
        <>
          <div className="text-center p-3" style={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <h3 className="match-results-title">¡Encuentra a tu mejor amigo!</h3>
          </div>
          <div className="row">
            {locationResults.map((dog) => (
              <TarjetaPerrosMatch
                key={dog.id}
                imagen={dog.image}
                nombre={dog.nombre}
                edad={dog.edad}
                tamanio={dog.tamanio}
                breed={dog.breeds?.split(',').slice(0, 3).join(', ') || 'Raza no especificada'}
                descripcion={Array.isArray(dog.color) ? dog.color.join(', ') : dog.color || 'No especificado'}
                temperamento={dog.temperamento}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-muted mt-4">No se encontraron coincidencias. Intenta modificar tus preferencias o vuelve más tarde.</p>
      )}
      <h5 className="text-center mt-4">¡Comunícate con el refugio por medio de redes sociales o su número telefónico!</h5>
      <div className="d-flex justify-content-center">
        <button
          className="match-results-button mt-3"
          onClick={() => navigate(-1)}
        >
          Volver al refugio
        </button>
      </div>
    </div>
  );
};

export default MatchResults;
