// Home.js
import React from 'react';
import { Card, Container, Row, Col, Carousel } from 'react-bootstrap';


const TarjetaPerdidos = ({imagen, nombre, caracteristicas, estado }) => {
  return (
      <div className="col-sm-12 col-md-6 col-lg-4 mb-4" style={{ height: '450px', marginTop: '20px'}}>
        <div className="card h-100" style={{ width: '22rem' }}>
          <div className="image-container" style={{ height: '250px', overflow: 'hidden' }}>
            <img
              src={imagen}
              className="card-img-top"
              alt="..."
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{nombre}</h5>
            <p className="card-text" style={{color: '#3f3f3f'}}>
              <strong>{estado}</strong>
              <br />
              {caracteristicas}
            </p>
          </div>
        </div>
      </div>
    );

};

function Home() {
  return (
    <div>
      {/* Head */}
      <header className="head">
        <div className="container">
          <div className="head-subheading">Encuentra a tu mascota mucho más rápido con nuestra</div>
          <div className="head-heading text-uppercase">Inteligencia Artificial </div>
        </div>
      </header>

      <Container className="py-5">
        {/* Segunda sección - Carrusel de React-Bootstrap */}
        <div className="section">
          <h2 className="section-title">¡Ayudálos a volver a casa!</h2>
          <Carousel id="carouselPerros">
            {/* Primer grupo de 3 tarjetas */}
            <Carousel.Item id='CarruselPerros'>
              <div className='row'>
                <TarjetaPerdidos 
                  imagen="https://wl-genial.cf.tsp.li/resize/728x/jpg/3f9/338/0235fc55d28ecc98e84c084d11.jpg"
                  nombre="Tamal"
                  estado="Perdido"
                  caracteristicas= "Soy un perro tranquilo y leal. Me encanta estar cerca de las personas, disfruto de los paseos largos y de acurrucarme en las tardes. ¡Estoy listo para ser tu mejor amigo!"
                />
                <TarjetaPerdidos
                  imagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCowggemriktOyf9Z4oonATWVQGIDWVPQMEA&s"
                  nombre="Perro perdido 2"
                  estado="Perdido"
                  caracteristicas="Es un perro juguetón y energético, ideal para familias activas." 
                />
                <TarjetaPerdidos
                  imagen="https://i.pinimg.com/originals/10/84/dc/1084dcdc104964d42df8f31d25a16d81.jpg"
                  nombre="Perro perdido 3"
                  estado="Perdido"
                  caracteristicas="Tiene una mancha en la pata derecha, es muy dócil y amigable."
                />
              </div>
            </Carousel.Item>
            {/* Segundo grupo de 3 tarjetas */}
            <Carousel.Item id='CarruselPerros'>
              <div className='row'>
                <TarjetaPerdidos
                  imagen="https://i.pinimg.com/474x/c1/20/c3/c120c32d4255479eb59219f9d6f85f87.jpg"
                  nombre="Perro perdido 4"
                  estado="Perdido"
                  caracteristicas="Es pequeño, de color negro, y se asusta fácilmente."
                />
                <TarjetaPerdidos
                  imagen="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=1200,height=1200,fit=cover/article/main-picture/5ed69b045e42e229833431.jpg"
                  nombre="Perro perdido 5"
                  estado="Perdido"
                  caracteristicas="Es un perro grande, muy cariñoso y amigable con los niños."
                />
                <TarjetaPerdidos
                  imagen="https://wl-genial.cf.tsp.li/resize/728x/jpg/d70/7e6/c944a3545da3f8ffec3c7987b3.jpg"
                  nombre="Perro perdido 6"
                  estado="Perdido"
                  caracteristicas="Tiene una correa roja y es muy juguetón."
                />
              </div>
            </Carousel.Item>
          </Carousel>
        </div>

      {/* Segunda sección */}
      <div className="section">
        <h2 className="section-title">Registra a tu mascota y nuestra IA hará el resto</h2>
        <div>
          <img src="/images/FormularioProv.png" alt="Imagen de registro de mascotas" className="section-image" />
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
