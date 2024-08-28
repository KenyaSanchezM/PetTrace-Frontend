import '@fortawesome/fontawesome-free/css/all.min.css';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import RegistroPerrosRefugio from './RegistroPerrosRefugios';

const PerfilUsuarioRefugio = () => {
  const [userData, setUserData] = useState({
    user: {},
    perritos: [],
    eventos: []
  });
  const token = localStorage.getItem('access_token');
  const [showRegistro, setShowRegistro] = useState(false);
  const [activeButton, setActiveButton] = useState('perritos');

  useEffect(() => {
    const fetchUserData = async () => {
  
      try {
        const response = await axios.get('http://localhost:8000/api/perfil-refugio/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('User Data:', response.data); // Debugging
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
    <Container>
      <HeadSection
        imagen1="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz1TGpr1fd7bC7qZer2p4bXnMdYyZxBb_ryA&s"
        imagen2="https://i0.wp.com/labcsa.org/wp-content/uploads/2022/09/10282995.jpg?resize=660%2C440&ssl=1"
        imagen3="https://www.eloccidental.com.mx/incoming/x11dqk-refugio-buenos-chicos-instagram-2.jpeg/alternates/FREE_720/Refugio%20Buenos%20Chicos%20Instagram%20(2).jpeg"
        titulo="Buenos chicos"
        descripcion="Somos una asociación con 220 perritos rescatados"
        cuenta="5579 1002 9337 4193"
        celular="3315689487"
        ciudad="Guadalajara"
        estado="Jal"
        instagram="https://www.instagram.com/refugiobuenoschicos/?hl=es"
        logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT6oMpCjvMKVTempfv32Vjqzsfr2voIbav5A&s"
      />
      <Row className="my-4">
        <Col>
          {userData ? (
            <>
              <Card>
                <Card.Header>{userData.user.nombre} - Perfil</Card.Header>
                <Card.Body>
                  <Card.Text>Email: {userData.user.email}</Card.Text>
                  <Card.Text>Teléfono: {userData.user.telefono}</Card.Text>
                  <Button variant="primary" onClick={handleShowRegistro}>
                    Registrar Perro
                  </Button>
                </Card.Body>
              </Card>
              <div className="mt-4">
                <div className="row justify-content-center">
                  <button className={`btn-elect ${activeButton === 'perritos' ? 'active' : ''}`} onClick={() => setActiveButton('perritos')}>
                    Perritos <i className="fa-solid fa-dog" style={{marginLeft: '10px'}}></i>
                  </button>
                  <button className={`btn-elect ${activeButton === 'eventos' ? 'active' : ''}`} onClick={() => setActiveButton('eventos')}>
                    Eventos con Causa y Voluntariado
                  </button>
                </div>
                <hr />
                {activeButton === 'eventos' ? (
                  <div className="row">
                    {userData.eventos && userData.eventos.length > 0 ? (
                      userData.eventos.map((evento, index) => (
                        <TarjetaEventos
                          key={index}
                          imagen={evento.imagen}
                          nombre={evento.nombre}
                          descripcion={evento.descripcion}
                          fecha={evento.fecha}
                        />
                      ))
                    ) : (
                      <p>No hay eventos registrados.</p>
                    )}
                  </div>
                ) : (
                  <div className="row">
                    {userData.perritos && userData.perritos.length > 0 ? (
                      userData.perritos.map((perro, index) => (
                        <TarjetaPerros
                          key={index}
                          imagen={perro.imagen}
                          nombre={perro.nombre}
                          edad={perro.edad}
                          tamano={perro.tamano}
                          descripcion={perro.descripcion}
                        />
                      ))
                    ) : (
                      <p>No hay perros registrados.</p>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <p>Cargando datos del usuario...</p>
          )}
        </Col>
      </Row>
      <RegistroPerrosRefugio show={showRegistro} handleClose={handleCloseRegistro} userId={userData.user.id || null} />
    </Container>
  );
};

const TarjetaPerros = ({ imagen, nombre, edad, tamano, descripcion }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100" style={{width: '18rem'}}>
        <img src={imagen} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text">
            <b>Edad: </b> {edad}<br/>
            <b>Tamaño: </b> {tamano}<br/>
            {descripcion}
          </p>
        </div>
      </div>
    </div>
  );
};

const TarjetaEventos = ({ imagen, nombre, descripcion, fecha }) => {
  return (
    <div className="row">
      <div className="card mb-3" style={{marginTop: '10px'}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={imagen} className="img-fluid rounded-start" alt="..."/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{nombre}</h5>
              <p className="card-text">
                {descripcion}<br/>
                <b>Fecha del evento: </b>{fecha}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeadSection = ({ logo, imagen1, imagen2, imagen3, titulo, descripcion, celular, instagram, facebook, cuenta, ciudad, estado }) => {
  return (
    <section className='Head'>
      <div className="container px-5">
        <div className="row gx-5 align-items-center">
          <div id="carouselExampleFade" className="carousel slide carousel-fade col-lg-6 order-1">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={imagen1} className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img src={imagen2} className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img src={imagen3} className="d-block w-100" alt="..."/>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="col-lg-6 order-2">
            <div className="p-5">
              <h2 className="display-4">
                <img src={logo} className="rounded-circle me-3" alt="Logo" style={{ width: '52px', height: '52px' }} />
                {titulo}
              </h2>
              <h5 className="font-weight-light">{descripcion}<i className="fas fa-paw" style={{ marginLeft: '10px'}}></i></h5>
              <h5 className="font-weight-light">
                <i className="bi bi-geo-alt-fill" style={{marginRight: '10px'}}></i>
                {ciudad} ,{estado}
              </h5>
              <div className="mt-4">
                <div className="mb-3">
                  <a href={`https://wa.me/${celular}`} className="btn btn-outline-success me-2">
                    <i className="bi bi-whatsapp"></i> WhatsApp
                  </a>
                  <a href={instagram} className="btn btn-outline-danger">
                    <i className="bi bi-instagram"></i> Instagram
                  </a>
                </div>
                <div className="mb-3">
                  <h5 className="font-weight-light">Cuenta de donaciones: {cuenta}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfilUsuarioRefugio;
