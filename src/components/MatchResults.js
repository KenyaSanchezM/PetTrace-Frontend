import React from 'react';
import { FaDog, FaRuler, FaPalette } from 'react-icons/fa'; 
import { useLocation, useNavigate } from 'react-router-dom'; 

const MatchResults = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook para navegar
  const locationResults = location.state?.results || [];
  const defaultImage = "/images/eventos.jpg";

  const TarjetaPerrosMatch = ({ imagen, nombre, edad, tamanio, descripcion, breed, temperamento }) => {
    return (
      <div className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center">
        <div className="card h-100 shadow border-0" style={{ width: '60rem' }}>
          <div className="image-container" style={{ height: '200px', overflow: 'hidden' }}>
            <img
              src={imagen ? `http://localhost:8000${imagen}` : defaultImage}
              className="card-img-top"
              alt="Perro"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{nombre}</h5>
            <p className="card-text">
              <span><FaDog /> <b>Edad:</b> {edad}</span>
              <br />
              <span><FaRuler /> <b>Tamaño:</b> {tamanio}</span>
              <br />
              <span><FaPalette /> <b>Razas:</b> {breed}</span>
              <br />
              <span> <b>Temperamento:</b> {temperamento}</span>
              <br />
              <span><b>Color:</b> {descripcion}</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {locationResults.length > 0 ? (
        <>
          <h3 className="mt-4">¡Felicidades, encuentra a tu mejor amigo!</h3>
          <div className="row justify-content-center">
            {locationResults.map((dog) => {
              const breedsArray = typeof dog.breeds === 'string' ? dog.breeds.split(',').slice(0, 3) : [];
              const breed = breedsArray.length > 0 ? breedsArray.join(', ') : 'Raza no especificada';
              const color = Array.isArray(dog.color) ? dog.color.join(', ') : dog.color || 'No especificado';
              
              return (
                <TarjetaPerrosMatch
                  key={dog.id}
                  imagen={dog.image}
                  nombre={dog.nombre}
                  edad={dog.edad}
                  tamanio={dog.tamanio}
                  breed={breed}
                  descripcion={color}
                  temperamento={dog.temperamento}
                />
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-center text-muted mt-4">No se encontraron coincidencias. Intenta modificar tus preferencias o vuelve más tarde.</p>

      )}
      <h5 className="mt-4">¡Comunícate con el refugio por medio de redes sociales o su número telefónico!</h5>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Volver a la página anterior
      </button>
    </div>
  );
};

export default MatchResults;

