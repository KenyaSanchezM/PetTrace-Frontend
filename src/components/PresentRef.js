// Pagina que verá el usuario con la información del refugio, perritos en adopción y sus eventos y voluntariado

import React, { useState } from 'react';
import './PresentRef.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TarjetaPerros = ({imagen, nombre, edad, tamano, descripcion}) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
          <div className="card h-100" style={{ width: '18rem' }}>
            <div className="image-container" style={{ height: '200px', overflow: 'hidden' }}>
              <img
                src={imagen}
                className="card-img-top"
                alt="..."
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{nombre}</h5>
              <p className="card-text">
                <b>Edad: </b> {edad}
                <br />
                <b>Tamaño: </b> {tamano}
                <br />
                {descripcion}
              </p>
            </div>
          </div>
        </div>
      );

};

const TarjetaEventos = ({imagen, nombre, descripcion, fecha, ubicacion}) => {
    return(
        //Poner la fecha en la que se publicó o cuanto tiempo pasó desde su publicación
        <div className="row">
            <div className="card mb-3" style={{marginTop: '10px'}}>
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={imagen} className="img-fluid rounded-start" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{nombre} </h5>
                        <p className="card-text">{descripcion}<br/>
                            <b>Ubicación: </b>{ubicacion}<br/>
                            <b>Fecha del evento: </b>{fecha}
                        </p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

const HeadSection = ({logo, imagen1, imagen2, imagen3, titulo, descripcion, celular, instagram, facebook, cuenta, ciudad, estado}) => {
    const [activeButton, setActiveButton] = useState('');
    return(
        <div >
            <section className='Head'>
                <div className="container px-5">
                <div className="row gx-5 align-items-center">
                    <div id="carouselExampleInterval" class="carousel slide col-lg-6 order-1" data-bs-ride="carousel" >
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="3000">
                            <img src={imagen1} class="d-block w-100" alt="..."/>
                            </div>
                            <div class="carousel-item" data-bs-interval="3000">
                            <img src={imagen2} class="d-block w-100" alt="..."/>
                            </div>
                            <div class="carousel-item" >
                            <img src={imagen3} class="d-block w-100" alt="..."/>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className="col-lg-6 order-2 ">
                    <div className="p-5" style={{ borderRadius: '10px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', height: '420px'}}>
                        <h2 className="display-4"><img src={logo} className="rounded-circle me-3" alt="Logo" style={{ width: '52px', height: '52px' }} />{titulo}</h2>
                        <h5 className="font-weight-light">{descripcion}<i className="fas fa-paw" style={{ marginLeft: '10px'}}></i></h5>
                        <h5 className="font-weight-light"><i class="bi bi-geo-alt"></i> {ciudad}, {estado}</h5>
                        <h5 className="font-weight-light"><i class="bi bi-telephone" ></i> {celular}</h5>
                        <h5 className="font-weight-light"><i class="fa-solid fa-piggy-bank" ></i> {cuenta}</h5>
                        <a href={facebook}><i className="fa-brands fa-facebook" style={{ marginTop: '20px', fontSize: '1.5rem', color:'#070B83' }}></i></a>
                        <a href={instagram}><i className="fa-brands fa-instagram" style={{ marginTop: '20px', marginLeft:'20px', color: '#B817A9', fontSize: '1.5rem' }}></i></a>
                        <button className="btn btn-warning btn-match text-light" href="#services">Match</button>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <div className='AdditionalSection'>
                <div className="container px-5 mt-5">
                    <div className="row justify-content-center">
                        <button className={`btn-elect ${activeButton === 'perritos' ? 'active' : ''}`} onClick={() => setActiveButton('perritos')}>Perritos<i class="fa-solid fa-dog" style={{marginLeft: '10px'}}></i></button>
                        <button className={`btn-elect ${activeButton === 'eventos' ? 'active' : ''}`} onClick={() => setActiveButton('eventos')}>Eventos con Causa y Voluntariado</button>
                    </div>
                    <hr />
                    {activeButton === 'eventos' ? (
                        <div className='row'>
                            <TarjetaEventos
                                imagen = "https://www.diariodexalapa.com.mx/local/9mabtw-proyecto-permanente-de-esterilizacion-de-mascotas/ALTERNATES/LANDSCAPE_960/Proyecto-permanente-de-esterilizaci%C3%B3n-de-mascotas"
                                nombre = "Campaña de esterilización"
                                descripcion= "Trae a tu perro y asegúrate de que reciban atención médica de calidad de la mano de profesionales. Además, estaremos brindando pláticas informativas sobre el cuidado responsable de los animales y cómo podemos contribuir a un mejor futuro para ellos."
                                fecha = "24/08/2022"
                                ubicacion= "Calle Luna 123, Colonia Esperanza"
                            />
                            <TarjetaEventos
                                imagen = "https://static.mercadonegro.pe/wp-content/uploads/2022/12/01162745/WXEY6TVZ2RD2RKAZJB7U7JGXFU.jpg"
                                nombre = "Evento de Adopción"
                                descripcion= "¡Ven a nuestro evento de adopción y encuentra a tu nuevo mejor amigo! Tendremos muchos perritos buscando un hogar lleno de amor. Conoce a nuestras adorables mascotas, cada una con una historia única y lista para ser parte de tu familia."
                                fecha = "24/08/2022"
                                ubicacion= "Avenida Solidaridad 456"
                            />
                        </div>
                    ) : (
                        <div className='row'>
                            <TarjetaPerros
                                imagen="https://smylepets.com/wp-content/uploads/2021/07/perro-mestizo-mediano.webp "
                                nombre="Roxy"
                                edad="2 años"
                                tamano = "mediano"
                                descripcion= "Soy una cachorra llena de energía y amor. Me encanta jugar y siempre estoy buscando a alguien con quien compartir mis travesuras y caricias."
                            />
                            <TarjetaPerros
                                imagen="https://wl-genial.cf.tsp.li/resize/728x/jpg/3f9/338/0235fc55d28ecc98e84c084d11.jpg"
                                nombre="Tamal"
                                edad="5 años"
                                tamano = "mediano"
                                descripcion= "Soy un perro tranquilo y leal. Me encanta estar cerca de las personas, disfruto de los paseos largos y de acurrucarme en las tardes. ¡Estoy listo para ser tu mejor amigo!"
                            />
                            <TarjetaPerros
                                imagen="https://www.respetmascotas.com/posts/easset_upload_file32027_708883_e.jpg"
                                nombre="Foxy"
                                edad="8 años"
                                tamano = "grande"
                                descripcion= "Soy curiosa y dulce por naturaleza. Me gusta explorar y descubrir cosas nuevas, pero también disfruto de los momentos de calma y cariño."
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
  
  };

const PresentRef = () => {
    return(
        <div>
            <HeadSection
                imagen1 = "https://www.elsoldemexico.com.mx/metropoli/cdmx/q618ku-lomitos-perritos.jpg/ALTERNATES/LANDSCAPE_768/lomitos-perritos.jpg"
                imagen2 = "https://i0.wp.com/labcsa.org/wp-content/uploads/2022/09/10282995.jpg?resize=660%2C440&ssl=1"
                imagen3 = "https://www.infobae.com/new-resizer/P4Xs1ME2kw8U5kJZuDkum-VV_Sg=/768x432/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/BNVX4NZFPU7F3SUTAXLEJZDABM.jpg"
                titulo= "Buenos chicos"
                descripcion= "Somos una asociación con 220 perritos rescatados"
                cuenta = "5579 1002 9337 4193"
                celular ="3315689487"
                ciudad = "Guadalajara"
                estado = "Jal"
                instagram= "https://www.instagram.com/refugiobuenoschicos/?hl=es"
                logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT6oMpCjvMKVTempfv32Vjqzsfr2voIbav5A&s"
                facebook=""
            />
        </div>
    )
}
export default PresentRef