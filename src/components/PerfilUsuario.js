
import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import RegistroPerros from './RegistroPerros';

const PerfilUsuario = () => {
  const [userData, setUserData] = useState(null);
  const [showRegistro, setShowRegistro] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => { 
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('http://localhost:8000/api/perfil-usuario/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        alert('Hubo un problema al cargar los datos del usuario. Por favor, inténtalo de nuevo.');
      }
    };
    fetchUserData();
  }, []);

  const handleShowRegistro = () => setShowRegistro(true);
  const handleCloseRegistro = () => setShowRegistro(false);

  return (
    <Container className="mt-4">
      {userData ? (
        <>
          {/* Primera sección - Información del usuario */}
          <Row className=" cont1 align-items-center mb-4">
            <Col xs={12} md={4} className="text-center">
              {/* Foto de perfil circular */}
              <div className="perfil-contenedor">
              <Image 
                // src={`http://localhost:8000${userData.user.foto}`} 
                src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVBthwo3Poresa4_pyQ-WWlGdiYSrIqaw2bVcbSbUOkQLZkLVdPaHMnQnzCwRuX_sBAg&usqp=CAU'
                roundedCircle 
                fluid 
                //className="perfil-imagen"
              />
              </div>
            </Col>
            <div className="perfil-info">
              <Col xs={12} md={8}>
                <h2>{userData.user.nombre}</h2>
                <p>Email: {userData.user.email}
                <br/>Teléfono: {userData.user.telefono}</p>
                <Button className='btn-registrar-perro' variant="warning" onClick={handleShowRegistro}>
                  Registrar Perro
                </Button>
              </Col>
            </div>
          </Row>

          {/* Segunda sección - Lista de perros registrados */}
          <div className='cont2'> 
            <Row>
              <Col>
                <h3>Perros Registrados</h3>
                <hr className="mb-4" />
                {userData.predictions.length > 0 ? (
                  <Row className='tarjetas'>
                    {userData.predictions.map((perro, index) => (
                      <Col md={4} key={index} className="mb-3">
                        <div class="card">
                          {perro.image && (
                            <img src={`http://localhost:8000${perro.image}`} class="card-img-top" alt="perro"></img>
                          )}
                          <div class="card-body">
                            <p className='p-name'>{perro.nombre}</p>
                            <p className='text'>
                            {perro.form_type ? 'Perdido' : 'Encontrado'}<br/>
                              <strong>Edad:</strong> {perro.edad}<br />
                              <strong>Color:</strong> {perro.color}<br />
                              <strong>Ubicación:</strong> {perro.ubicacion}<br />
                              <strong>¿Tiene collar?:</strong> {perro.tieneCollar ? 'Sí' : 'No'}<br />
                              <strong>Características: </strong> {perro.caracteristicas}<br />
                              <strong>Fecha: </strong>{perro.fecha}
                            </p>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
              ) : (
                <p>No tienes perros registrados.</p>
              )}
            </Col>
          </Row>
        </div>

          {/* Componente de Registro de Perros */}
          <RegistroPerros show={showRegistro} handleClose={handleCloseRegistro} userId={userData.user.id} />
        </>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
      <style>
        {`
        .perfil-contenedor {
            display: flex;
            align-items: center; 
            justify-content: space-between; 
            flex-wrap: wrap; 
            gap: 20px;
            padding: 20px;
        }

        .perfil-contenedor img {
            width: 165px; 
            height: 165px;
            object-fit: cover;
            border-radius: 50%;
            border: 2px solid #fff;
            margin-bottom: 20px;
            margin-top: 85px;
        }

        .perfil-info {
            flex: 1; /* Permite que la información ocupe el espacio restante */
            display: flex;
            flex-direction: column; /* Alinea los elementos verticalmente */
            align-items: flex-start; /* Alinea los elementos a la izquierda en pantallas grandes */
        }

        @media (max-width: 768px) {
            .perfil-contenedor {
                justify-content: center; /* Centra los elementos horizontalmente */
                align-items: center; /* Centra los elementos verticalmente */
                text-align: center; /* Centra el texto */
            }
            
            .perfil-info {
                align-items: center; /* Centra el texto del perfil */
            }
            
            .tarjetas {
                flex-wrap: wrap;
                gap: 90px;
            }
        }

        .btn-registrar-perro {
            margin-top: 30px;
            background-color: #ff8700;
            border-color: #ff8700;
        }

        .btn-registrar-perro:hover {
            border-color: #c55b03;
            background-color: #c55b03;
            color: #fff;
        }

        .cont1 {
            margin-left: 70px;
        }

        .cont2 {
            background-image: url("/images/fondo_home.png");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
        }

        .card {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            width: 18rem; 
            height: 33rem;
        }

        .card-img-top {
            padding: 12px; 
            height: 270px; 
            object-fit: cover; 
            border-radius: 8px; 
        }

        .p-name {
            margin: 0;
            padding: 0;
            font-weight: bold;
            color: rgb(63, 63, 63);
            font-size: 18px;
        }

        .text {
            color: rgb(97, 97, 97);
            font-size: 14px;
            margin: 0;
            padding: 0;
        }
        `}
      </style>

    </Container>
  );
};

export default PerfilUsuario;
