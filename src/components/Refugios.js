import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Refugios.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

const Refugios = () => {
  const [refugios, setRefugios] = useState([]);
  const [filteredRefugios, setFilteredRefugios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');

  const handleSearch = () => {
    const filtered = refugios.filter(refugio => {
      const matchesEstado = selectedEstado ? refugio.estado === selectedEstado : true;
  
      const nombre = refugio.nombre ? refugio.nombre.toLowerCase() : '';
      const descripcion = refugio.descripcion ? refugio.descripcion.toLowerCase() : '';
  
      const matchesSearchTerm = nombre.includes(searchTerm.toLowerCase()) || 
                                descripcion.includes(searchTerm.toLowerCase());
  
      return matchesEstado && matchesSearchTerm;
    });
    setFilteredRefugios(filtered);
  };
  
  
  

  // Llama a handleSearch cuando cambien el estado o el término de búsqueda
  useEffect(() => {
    handleSearch();
  }, [selectedEstado, searchTerm, refugios]);

  useEffect(() => {
    fetchRefugios();
  }, []);

  const fetchRefugios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/refugios/');
      const refugios = response.data; // Suponiendo que 'response' es la respuesta de tu API
        refugios.forEach(refugio => {
            console.log("Refugio ID:", refugio.id); // Asegúrate de que 'id' sea el nombre correcto del campo
        });

      console.log('Respuesta de la API:', response.data);
      response.data.forEach(refugio => {
        console.log('Refugio ID:', refugio.id); // Verifica que cada refugio tiene un ID
      });
      setRefugios(response.data);
    } catch (error) {
      console.error('Error al obtener los refugios:', error);
    }
  };
  


  const Tarjeta = ({ profile_image, nombre, descripcion, estado, ciudad, id }) => {
      const navigate = useNavigate();
      const defaultImage = "/images/eventos.jpg";

      return (
          <div className="col-12 col-sm-6 col-md-4 mb-4 mt-4">
              <div className="card tarjeta" onClick={() => navigate(`/api/ir-perfil-refugio/${id}`)}>
                  <img src={profile_image ? `http://localhost:8000${profile_image}` : defaultImage} alt={nombre} className="card-img-top" />
                  <div className="card-body">
                      <h5 className="card-title">{nombre}</h5>
                      <p className="card-text">{descripcion}</p>
                      <div className="info-section">
                          <p className="card-text"><strong>Estado:</strong> {estado}</p>
                          <p className="card-text"><strong>Ciudad:</strong> {ciudad}</p>
                      </div>
                  </div>
              </div>
          </div>
      );
  };


  const handleSubmit = (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    handleSearch(); // Llama a la función de búsqueda
  };

  return (
    <div className='contenedor-refugios'>
      {/* Masthead */}
      <header className="masthead">
        <div className="container">
          <div className="masthead-heading text-uppercase">Refugios</div>
        </div>
      </header>

      {/* Refugios */}
      <section className="page-section" id="services">
        <div className="container">
          <div className="text-center">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="btn-filter btn-group me-3" role="group">
                  <button type="button" className="btn btn-warning dropdown-toggle text-light" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: '#ff8700', borderColor: '#ff8700', width: '120px' }}>
                    Estado
                  </button>
                  <ul className="dropdown-menu">
                    {/* Lista de estados */}
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Aguascalientes')}>Aguascalientes</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Baja California')}>Baja California</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Baja California Sur')}>Baja California Sur</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Campeche')}>Campeche</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Coahuila')}>Coahuila</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Colima')}>Colima</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Chiapas')}>Chiapas</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Chihuahua')}>Chihuahua</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Durango')}>Durango</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Distrito Federal')}>Distrito Federal</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Guanajuato')}>Guanajuato</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Guerrero')}>Guerrero</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Hidalgo')}>Hidalgo</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Jalisco')}>Jalisco</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Mexico')}>México</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Michoacan')}>Michoacán</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Morelos')}>Morelos</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Nayarit')}>Nayarit</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Oaxaca')}>Oaxaca</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Quintana Roo')}>Quintana Roo</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('San Luis Potosí')}>San Luis Potosí</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Sonora')}>Sonora</a></li>
                    <li><a className="dropdown-item" onClick={() => setSelectedEstado('Yucatán')}>Yucatán</a></li>
                    {/* Agrega los demás estados aquí */}
                  </ul>
                </div>
              </div>
              <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                  className="form-control me-2 rounded-pill shadow-sm"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn rounded-pill btn-warning" type="submit" style={{ backgroundColor: '#ff8700', borderColor: '#ff8700' }}>
                  <i className="bi bi-search" style={{ color: '#fff' }}></i>
                </button>
              </form>
            </div>
          </div>

          <div className="tarjetas row text-center mt-5">
          {(filteredRefugios.length > 0 ? filteredRefugios : refugios).map(refugio => (
            <Tarjeta key={refugio.id} {...refugio} /> // Asegúrate de que el ID está presente
          ))}

          </div>

        </div>
      </section>
    </div>
  );
};

export default Refugios;
