import React, { useEffect, useState } from 'react';
import { Col ,Button} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './PresentRef.css';
import MatchForm from './MatchForm';

const PresentRef = () => {
    const { id } = useParams();
    const [refugioData, setRefugioData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeButton, setActiveButton] = useState('perritos');
    const [eventos, setEventos] = useState([]);
    const defaultImage = "/images/eventos.jpg"; // Imagen predeterminada
    const [showMatchForm, setShowMatchForm] = useState(false);

    const handleShowMatchForm = () => setShowMatchForm(true);
    const handleCloseMatchForm = () => setShowMatchForm(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/ir-perfil-refugio/${id}/`);
                console.log("Datos del refugio:", response.data); // Verifica la respuesta del backend
                setRefugioData(response.data);
                setEventos(response.data.eventos);
            } catch (err) {
                setError(err.response?.data?.message || 'Error al obtener datos');
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [id]);
    

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    const TarjetaPerros = ({ imagen, nombre, edad, tamanio, descripcion }) => {
        return (
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100" style={{ width: '18rem' }}>
                <div id={`carousel-${nombre}`} className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner" style={{ height: '280px', overflow: 'hidden' }}>
                            {imagen.map((img, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                            >
                                <img
                                src={img}
                                className="d-block w-100"
                                alt={`Imagen de ${nombre}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            ))}
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#carousel-${nombre}`}
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#carousel-${nombre}`}
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                        </div>
                    <div className="card-body">
                        <h5 className="card-title">{nombre}</h5>
                        <p className="card-text">
                            <b>Edad: </b> {edad}
                            <br />
                            <b>Tamaño: </b> {tamanio}
                            <br />
                            {descripcion}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const TarjetaEventos = ({ imagen, nombre, descripcion, fecha, ubicacion,hora }) => {
        return (
            <div className="row">
                <div className="card mb-3" style={{ marginTop: '10px' }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={imagen} className="img-fluid rounded-start" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                            <h5 className="card-title">{nombre} </h5>
                            <p className="card-text">{descripcion}<br/>
                                <b>Ubicación: </b>{ubicacion}<br/>
                                <b>Hora: </b>{hora}<br/>
                                <b>Fecha del evento: </b>{fecha}   
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const HeadSection = ({ profile_image, image1, image2, image3, titulo, descripcion, celular, instagram, facebook, cuenta, ciudad, estado }) => {
        const defaultImage = "/images/eventos.jpg"; // Imagen predeterminada
        return (
            <section className='Head'>
                <div className="container px-5">
                    <div className="row gx-5 align-items-center">
                        <div id="carouselExampleInterval" className="carousel slide col-lg-6 order-1" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="3000">
                                    <img src={image1 ? `http://localhost:8000${image1}` : defaultImage} className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item" data-bs-interval="3000">
                                    <img src={image2 ? `http://localhost:8000${image2}` : defaultImage}  className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={image3 ? `http://localhost:8000${image3}` : defaultImage} className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="col-lg-6 order-2">
                            <div className="p-5" style={{ borderRadius: '10px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', height: '420px' }}>
                                <h2 className="display-4"><img src={profile_image ? `http://localhost:8000${profile_image}` : defaultImage}  className="rounded-circle me-3" alt="Logo" style={{ width: '52px', height: '52px' }} />{titulo}</h2>
                                <h5 className="font-weight-light">{descripcion}<i className="fas fa-paw" style={{ marginLeft: '10px' }}></i></h5>
                                <h5 className="font-weight-light"><i className="bi bi-geo-alt"></i> {ciudad}, {estado}</h5>
                                <h5 className="font-weight-light"><i className="bi bi-telephone"></i> {celular}</h5>
                                <h5 className="font-weight-light"><i className="fa-solid fa-piggy-bank"></i> {cuenta}</h5>
                                <a href={facebook}><i className="fa-brands fa-facebook" style={{ marginTop: '20px', fontSize: '1.5rem', color: '#070B83' }}></i></a>
                                <a href={instagram}><i className="fa-brands fa-instagram" style={{ marginTop: '20px', marginLeft: '20px', color: '#B817A9', fontSize: '1.5rem' }}></i></a>
                                <Button className="btn btn-warning btn-match text-light" onClick={handleShowMatchForm}>Haz match</Button>
                                <MatchForm 
                                    show={showMatchForm} 
                                    handleClose={handleCloseMatchForm} 
                                    shelterId={id}  // Pasa el ID del refugio aquí
                                />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    return (
        <div>
            <HeadSection
                profile_image={refugioData.shelter_user.profile_image}
                image1={refugioData.shelter_user.image1}
                image2={refugioData.shelter_user.image2}
                image3={refugioData.shelter_user.image3}
                titulo={refugioData.shelter_user.nombre}
                descripcion={refugioData.shelter_user.descripcion}
                celular={refugioData.shelter_user.telefono}
                instagram={refugioData.shelter_user.instagram}
                facebook={refugioData.shelter_user.facebook}
                cuenta={refugioData.shelter_user.cuenta}
                ciudad={refugioData.shelter_user.ciudad}
                estado={refugioData.shelter_user.estado}
            />
            <div className="AdditionalSection">
                <div className="container px-5 mt-5">
                    <div className="row justify-content-center">
                        <button className={`btn-elect ${activeButton === 'perritos' ? 'active' : ''}`} onClick={() => setActiveButton('perritos')}>Perritos<i className="fa-solid fa-dog" style={{ marginLeft: '10px' }}></i></button>
                        <button className={`btn-elect ${activeButton === 'eventos' ? 'active' : ''}`} onClick={() => setActiveButton('eventos')}>Eventos con Causa y Voluntariado</button>
                    </div>
                    <hr />
                    {activeButton === 'eventos' ? (
                      <div className='row'>
                          {eventos.map((evento) => (
                            <TarjetaEventos
                              imagen={evento.imagen_evento ? `http://localhost:8000${evento.imagen_evento}` : defaultImage}
                              nombre={evento.nombre_evento}
                              descripcion={evento.descripcion_evento}
                              fecha={evento.fecha_evento}
                              ubicacion={evento.lugar_evento}
                              hora={evento.hora_evento}
                             />
                          ))}
                      </div>
                  ) : (
                      <div className='row'>
                          {refugioData && refugioData.predictions && refugioData.predictions.map((perro) => (
                              <Col md={4} key={perro.id} className="mb-4">
                                  <TarjetaPerros
                                      imagen={[
                                        `http://localhost:8000${perro.image}`,
                                        `http://localhost:8000${perro.profile_image1}`,
                                        `http://localhost:8000${perro.profile_image2}`
                                      ]}
                                      nombre={perro.nombre}
                                      edad={perro.edad}
                                      tamanio={perro.tamanio}
                                      descripcion={
                                          <div>
                                              <b>Características: </b> {perro.caracteristicas}
                                              <br />
                                              <b>Temperamento: </b> {perro.temperamento}
                                              <br />
                                              <b>Vacunas: </b> {perro.vacunas}
                                              <br />
                                              <b>Color: </b> {JSON.parse(perro.color).join(', ')} {/* Convierte el JSON a array y muestra las razas */}
                                              <div className="card-footer d-flex justify-content-end"style={{ backgroundColor: 'transparent' }}> {/* Alinea los botones a la derecha */}
                                              
                                            </div>


                                          </div>
                                      }
                                  />
                              </Col>
                          ))}
                      </div>
                  )}
                </div>
            </div>
        </div>
    );

};

export default PresentRef;
