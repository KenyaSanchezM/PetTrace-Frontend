//Presentación de todos los eventos

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Container, Modal, Button } from 'react-bootstrap';

const calcularTiempoTranscurrido = (fecha) => {
  const ahora = new Date();
  const diferenciaTiempo = Math.abs(ahora - fecha);
  const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
  
  if (diferenciaDias === 0) return "Publicado hoy";
  if (diferenciaDias === 1) return "Publicado hace 1 día";
  return `Publicado hace ${diferenciaDias} días`;
};

//Constantes para sacar la fecha de publicación
const fechaPublicacion = new Date('2024-08-04');  //variable que almacena la fecha obtenida de la fuente de datos.
const publicadoHace = calcularTiempoTranscurrido(fechaPublicacion);

const Eventos = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  // Función para abrir el modal con la información de la tarjeta seleccionada
  const handleCardClick = (info) => {
    setModalInfo(info);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleClose = () => setShowModal(false);

  const eventos = [
    {
      id: 1,
      img: 'https://www.dondeir.com/wp-content/uploads/2018/04/vuelve-adogtame-2018-una-feria-de-adopcion-canina-en-cdmx-02.jpg',
      titulo: 'Evento de adopción',
      descripcion: '¡Ven a nuestro evento de adopción y encuentra a tu nuevo mejor amigo!',
      ubicacion: 'Avenida Solidaridad 456',
      fecha: '24/08/2024',
      anfitrion: 'Patitas felices',
    },
    {
      id: 2,
      img: 'https://images.reporteindigo.com/wp-content/uploads/2023/06/adoptafest-santa-catarina.jpg',
      titulo: 'Evento de adopción',
      descripcion: '¡Ven a nuestro evento de adopción y encuentra a tu nuevo mejor amigo!',
      ubicacion: 'Avenida Solidaridad 456',
      fecha: '24/08/2024',
      anfitrion: 'Patitas felices',
    },
    // Agrega más eventos aquí si es necesario
  ];

  return (
    <div>
      {/* Head */}
      <header className="head">
        <div className="container">
          <div className="head-subheading">Conoce todos los </div>
          <div className="head-heading text-uppercase">Eventos </div>
        </div>
      </header>
      {/* Eventos */}
      <section className="page-section" id="services">
        <div className="container">
          <div className="text-center">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="btn-group me-3" role="group" style={{ marginLeft: '28px' }}>
                  <button type="button" className="btn btn-warning dropdown-toggle text-light" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: '#ff8700', borderColor: '#ff8700', width: '120px' }}>
                    Estado
                  </button>
                  <ul className="dropdown-menu">
                    {/* Opciones de Estado */}
                    <li><a className="dropdown-item" href="#">Aguascalientes</a></li>
                    <li><a className="dropdown-item" href="#">Baja California</a></li>
                    {/* ... Más opciones */}
                  </ul>
                </div>
                <div className="btn-group me-3" role="group">
                  <button type="button" className="btn btn-warning dropdown-toggle text-light" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: '#ff8700', borderColor: '#ff8700', width: '120px' }}>
                    Categoría
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Adopciones</a></li>
                    <li><a className="dropdown-item" href="#">Rifas</a></li>
                    <li><a className="dropdown-item" href="#">Voluntariado</a></li>
                    {/* Más categorías */}
                  </ul>
                </div>
              </div>
              <form className="d-flex" role="search">
                <input className="form-control me-2 rounded-pill shadow-sm" type="search" placeholder="Buscar" aria-label="Search" />
                <button className="btn rounded-pill btn-warning" type="submit" style={{ backgroundColor: '#ff8700', borderColor: '#ff8700' }}>
                  <i className="bi bi-search " style={{ color: '#fff' }}></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tarjetas de Eventos */}
      <Container className="mt-4">
        <div className='cont2'>
          <Row className="tarjetas d-flex justify-content-left">
          {eventos.map((evento) => (
              <Col md={4} className="mb-3" key={evento.id}>
                <div className="card" onClick={() => handleCardClick(evento)}>
                  <img src={evento.img} className="card-img-top" alt="perro"></img>
                  <div className="card-body">
                    <p className='p-name'>{evento.titulo}</p>
                    <p className='text'>
                      <strong>Ubicación:</strong> {evento.ubicacion} <br />
                      <strong>Fecha del evento: </strong>{evento.fecha} <i className="bi bi-calendar"></i><br />
                      <strong>Anfitrión:</strong> {evento.anfitrion} <br /><br />
                      {publicadoHace}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <p>No tienes eventos registrados.</p>
        </div>
      </Container>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalInfo.img} className="img-fluid" alt="Evento" />
          <p className='text'><br />{modalInfo.descripcion}</p>
          <p className='text'><strong>Ubicación:</strong> {modalInfo.ubicacion}<br />
          <strong>Fecha del evento:</strong> {modalInfo.fecha}<br />
          <strong>Anfitrión:</strong> {modalInfo.anfitrion}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>  

      {/* Estilos */}
      <style>
        {`
          header.head {
            position: relative;
            display: flex;
            padding-top: 10.5rem;
            padding-bottom: 6rem;
            text-align: center;
            color: #fff;
            background-image: url("/images/eventos.jpg");
            background-repeat: no-repeat;
            background-attachment: scroll;
            background-position: center center;
            background-size: cover;
            z-index: 1;
          }
          header.head::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5); /* Opacidad y color del degradado */
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)); /* Degradado */
            z-index: -1; 
          }
          
          header.head .head-subheading {
            font-size: 1.5rem;
            font-style: italic;
            line-height: 1.5rem;
            margin-bottom: 25px;
            font-family: "Roboto Slab", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          }
          header.head .head-heading {
            font-size: 3.25rem;
            font-weight: 700;
            line-height: 3.25rem;
            margin-bottom: 2rem;
            font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          }
          
          @media (min-width: 768px) {
            header.head {
              padding-top: 8rem;
              padding-bottom: 4.5rem;
            }
            
            header.head .head-subheading {
              font-size: 2.25rem;
              font-style: italic;
              line-height: 2.25rem;
              margin-bottom: 1rem;
            }
            header.head .head-heading {
              font-size: 3.5rem;
              font-weight: 700;
              line-height: 4.5rem;
              margin-bottom: 4rem;
            }
          }

          .btn-category {
            margin-left: 15px;
            border-radius: 5px;
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
            width: 21rem; 
            height: 30rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-15px); 
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2); 
        }
        .card-img-top {
            padding: 12px; 
            height: 245px; 
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
        @media (max-width: 768px){
          .tarjetas{
            flex-wrap: wrap;
            gap: 160px;
          }
        }
        @media (max-width: 1024px){
          .tarjetas{
            flex-wrap: wrap;
            gap: 160px;
          }
        }
        `}
      </style>
    </div>
  );
};

export default Eventos;
