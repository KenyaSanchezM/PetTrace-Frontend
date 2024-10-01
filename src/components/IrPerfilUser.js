import React, { useState, useEffect } from 'react'; 
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const IrPerfilUser = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                const token = localStorage.getItem('access_token');
                try {
                    const response = await axios.get(`http://localhost:8000/api/ir-perfil-usuario/${userId}/`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    setUserData(response.data);
                } catch (error) {
                    console.error("Error fetching user:", error.response ? error.response.data : error.message);
                    setError('Error fetching user data');
                }
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    {error && <p>{error}</p>}
                    {userData ? (
                        <Container className="mt-4">
                            <Card.Body>
                                <Row className="cont1 align-items-center mb-4">
                                    <Col xs={12} md={4} className="text-center">
                                        <div className="perfil-contenedor">
                                            <Image 
                                                src={`http://localhost:8000${userData.profile_image}`} 
                                                roundedCircle 
                                                fluid 
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <h2>{userData.nombre}</h2>
                                        <p>Email: {userData.email}<br />
                                        Teléfono: {userData.telefono}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <div className='cont2'> 
                                <Row>
                                    <Col>
                                        <h3>Perros Registrados</h3>
                                        <hr className="mb-4" />
                                        {userData.predictions && userData.predictions.length > 0 ? (
                                            <Row className='tarjetas'>
                                                {userData.predictions.map((perro, index) => (
                                                    <Col md={4} key={index} className="mb-3">
                                                        <div className="card">
                                                            {perro.image && (
                                                                <img src={`http://localhost:8000${perro.image}`} className="card-img-top" alt="perro" />
                                                            )}
                                                            <div className="card-body">
                                                                <p className='p-name'>{perro.nombre}</p>
                                                                <p className='text'>
                                                                    <strong>Estado: </strong>{perro.form_type ? 'Perdido' : 'Encontrado'}<br />
                                                                    <strong>Edad:</strong> {perro.edad}<br />
                                                                    <strong>Color:</strong> {perro.color}<br />
                                                                    <strong>Estado:</strong> {perro.estado}<br />
                                                                    <strong>Ciudad:</strong> {perro.ciudad}<br />
                                                                    <strong>Direccion:</strong> {perro.direccion}<br />
                                                                    <strong>¿Tiene collar?:</strong> {perro.tieneCollar ? 'Sí' : 'No'}<br />
                                                                    <strong>Características:</strong> {perro.caracteristicas}<br />
                                                                    <strong>Fecha:</strong> {perro.fecha}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        ) : (
                                            <p>No tiene perros registrados.</p>
                                        )}
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    ) : (
                        <p>Cargando datos del usuario...</p>
                    )}
                </Col>
            </Row>

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
            width: 265px; 
            height: 265px;
            object-fit: cover;
            border-radius: 50%;
            border: 2px solid #fff;
            margin-bottom: 20px;
            margin-top: 30px;
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

          .btn-info:hover {
            background-color: #138496; /* Color de fondo al pasar el mouse */
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
            height: 40rem;
        }

        .card-body {
          flex-direction: column;
          justify-content: space-between;
        }

        .card-footer {
            display: flex; /* Alinea los botones uno al lado del otro */
            justify-content: center; /* Centra los botones horizontalmente */
            gap: 10px; /* Espacio entre los botones */
            margin-top: 0px; /* Espacio entre el contenido y los botones */
        }
        .card .btn {
            width: 30%;
            margin-top: 0px; /* Espacio entre los botones */
          }

        <.btn-danger {
          background-color: #dc3545; /* Color de fondo para eliminar */
          border: none; /* Sin borde */
        }

        .btn-danger:hover {
          background-color: #c82333; /* Color de fondo al pasar el mouse */
        }

        .btn-warning {
          background-color: #ffc107; /* Color de fondo para editar */
          border: none; /* Sin borde */
        }

        .btn-warning:hover {
          background-color: #e0a800; /* Color de fondo al pasar el mouse */
        }

        .btn-info {
          background-color: #17a2b8; /* Color de fondo para buscar */
          border: none; /* Sin borde */
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

export default IrPerfilUser;
