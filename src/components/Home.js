import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Carousel } from 'react-bootstrap';
import axios from 'axios';

const TarjetaPerdidos = ({ image, nombre, caracteristicas, form_type }) => {
  const defaultImage = "/path/to/default_image.jpg"; // Imagen predeterminada

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 mb-4" style={{ height: '450px', marginTop: '20px' }}>
      <div className="card h-100" style={{ width: '22rem' }}>
        <div className="image-container" style={{ height: '250px', overflow: 'hidden' }}>
          <img
            src={image ? `http://localhost:8000${image}` : defaultImage}
            className="card-img-top"
            alt={nombre ? nombre : "Nombre no disponible"}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{nombre ? nombre : "Sin nombre"}</h5>
          <p className="card-text" style={{ color: '#3f3f3f' }}>
            <strong>{form_type}</strong>
            <br />
            {caracteristicas}
          </p>
        </div>
      </div>
    </div>
  );
};


const getAbsoluteImageUrl = (url) => {
  if (!url) return 'public/images/temporal.jpeg';
  return url.startsWith('http://') || url.startsWith('https://') ? url : `http://localhost:8000${url}`;
};

function Home() {
  const [perros, setPerros] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/perros-perdidos/')
      .then(response => {
        console.log(response.data); // Verifica qué datos se están recibiendo
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPerros(response.data);
        } 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  

  const firstGroup = perros.slice(0, 3);
  const secondGroup = perros.slice(3, 6);

  console.log(firstGroup, secondGroup); // Verifica que haya elementos

  if (perros.length === 0) {
    return <div>No hay perros disponibles en este momento.</div>;
  }

  return (
    <div>
      {/* Head */}
      <header className="head">
        <div className="container">
          <div className="head-subheading">Encuentra a tu mascota mucho más rápido con nuestra</div>
          <div className="head-heading text-uppercase">Inteligencia artificial</div>
        </div>
      </header>

      <Container className="py-5">
        {/* Segunda sección - Carrusel de React-Bootstrap */}
        <div className="section">
          <h2 className="section-title">¡Ayudálos a volver a casa!</h2>
          <Carousel id="carouselPerros">
            <Carousel.Item>
              <Row>
                {firstGroup.map(perro => (
                  <TarjetaPerdidos 
                    key={perro.id} 
                    image={perro.image} 
                    nombre={perro.nombre} 
                    caracteristicas={perro.caracteristicas} 
                    form_type={perro.form_type} 
                  />
                ))}
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>
                {secondGroup.map(perro => (
                  <TarjetaPerdidos 
                    key={perro.id} 
                    image={perro.image} 
                    nombre={perro.nombre} 
                    caracteristicas={perro.caracteristicas} 
                    form_type={perro.form_type} 
                  />
                ))}
              </Row>
            </Carousel.Item>
          </Carousel>
        </div>
        


      {/* Segunda sección */}
      <div className="section">
        <h2 className="section-title">Registra a tu mascota y nuestra IA hará el resto</h2>
        <div>
          <img src="/images/IA.png" alt="Imagen de registro de mascotas" className="section-image" />
        </div>
      </div>

      {/* Tercera sección */}
      <div className="section">
        <h2 className="section-title">Conoce los refugios</h2>
        <div className="container" style={{marginTop: '25px'}}>
          <div className="row text-center">
            <div className="col-6 col-md-3 mb-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT6oMpCjvMKVTempfv32Vjqzsfr2voIbav5A&s" 
                className="imagen-refugio rounded-circle" alt="Refugio 1" 
                style={{ width: '120px', height: '120px'}} 
              />
              <p style={{textAlign: 'center'}}>Refugio 1</p>
            </div>
            <div className="col-6 col-md-3 mb-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT6oMpCjvMKVTempfv32Vjqzsfr2voIbav5A&s" 
                className="imagen-refugio rounded-circle" alt="Refugio 2" 
                style={{ width: '120px', height: '120px' }} 
              />
              <p style={{textAlign: 'center'}} >Refugio 2</p>
            </div>
            <div className="col-6 col-md-3 mb-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT6oMpCjvMKVTempfv32Vjqzsfr2voIbav5A&s" 
                className="imagen-refugio rounded-circle" alt="Refugio 3" 
                style={{ width: '120px', height: '120px' }} 
              />
              <p style={{textAlign: 'center'}}>Refugio 3</p>
            </div>
            <div className="col-6 col-md-3 mb-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT6oMpCjvMKVTempfv32Vjqzsfr2voIbav5A&s" 
                className="imagen-refugio rounded-circle" alt="Refugio 4" 
                style={{ width: '120px', height: '120px' }} 
              />
              <p style={{textAlign: 'center'}}>Refugio 4</p>
            </div>
            <div className="col-6 col-md-3 mb-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT6oMpCjvMKVTempfv32Vjqzsfr2voIbav5A&s" 
                className="imagen-refugio rounded-circle" alt="Refugio 4" 
                style={{ width: '120px', height: '120px' }} 
              />
              <p style={{textAlign: 'center'}}>Refugio 5</p>
            </div>
          </div>
        </div>
      </div>
    </Container>

    
    <style>
    <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    />


{`.section-title {
    text-align: center;
    margin-bottom: 2rem;
}

  
.section-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
}
  
.card-title {
    text-align: center;
}

.card-custom {
    width: 100%;
    max-width: 350px; /* Ajusta el valor según el tamaño deseado */
    margin: auto; /* Para centrar la card dentro de su contenedor */
}
  
.section-image {
    width: 100%;
    max-width: 700px; /* Ajusta el valor según el tamaño deseado */
    display: block;
    margin: 0 auto; /* Centra la imagen horizontalmente */
  }
  
.section-title {
  text-align: center;
  margin-top: 0px; /* Espacio superior */
  margin-bottom: 40px; /* Espacio inferior */
}

.section {
  margin-top: 0px; /* Espacio superior */
  margin-bottom: 40px; /* Espacio inferior */
}

header.head {
  position: relative;
  display: flex;
  padding-top: 10.5rem;
  padding-bottom: 6rem;
  text-align: center;
  color: #fff;
  background-image: url("https://image.ondacero.es/clipping/cmsimages01/2023/02/09/FF2B1D9A-C795-4CE6-99E3-FB1FB9841BE8/imagen-archivo-varios-perros-parque_103.jpg");
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center center;
  background-size: cover;
  z-index: 1;
  height: 500px;
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
  
`}

    </style>
  </div>
  );
}

export default Home;
