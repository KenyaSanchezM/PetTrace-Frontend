// Pagina que verá el usuario con la información del refugio, perritos en adopción y sus eventos y voluntariado

import React, { useState } from 'react';
import './PresentRef.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TarjetaPerros = ({imagen, nombre, edad, tamano, descripcion}) => {
    return(
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div class="card h-100" style={{width: '18rem'}}>
                <img src={imagen} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">{nombre}</h5>
                    <p class="card-text">
                        <b>Edad: </b> {edad}<br/>
                        <b>Tamaño: </b> {tamano}<br/>
                        {descripcion}
                    </p>
                </div>
            </div>
        </div>
    );

};

const TarjetaEventos = ({imagen, nombre, descripcion, fecha}) => {
    return(
        //Poner la fecha en la que se publicó o cuanto tiempo pasó desde su publicación
        <div className="row">
            <div className="card mb-3" style={{marginTop: '10px'}}>
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={imagen} className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{nombre} </h5>
                        <p className="card-text">{descripcion}<br/>
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
        <div>
            <section className='Head'>
                <div className="container px-5">
                <div className="row gx-5 align-items-center">
                    <div id="carouselExampleFade" class="carousel slide carousel-fade col-lg-6 order-1">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                            <img src={imagen1} class="d-block w-100" alt="..."/>
                            </div>
                            <div class="carousel-item">
                            <img src={imagen2} class="d-block w-100" alt="..."/>
                            </div>
                            <div class="carousel-item">
                            <img src={imagen3} class="d-block w-100" alt="..."/>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className="col-lg-6 order-2">
                    <div className="p-5">
                        <h2 className="display-4"><img src={logo} className="rounded-circle me-3" alt="Logo" style={{ width: '52px', height: '52px' }} />{titulo}</h2>
                        <h5 className="font-weight-light">{descripcion}<i className="fas fa-paw" style={{ marginLeft: '10px'}}></i></h5>
                        <h5 className="font-weight-light"><i class="bi bi-geo-alt" style={{color: '#ff8700'}}></i> {ciudad}, {estado}</h5>
                        <h5 className="font-weight-light"><i class="bi bi-telephone" style={{color: '#ff8700'}}></i> {celular}</h5>
                        <h5 className="font-weight-light"><i class="fa-solid fa-piggy-bank" style={{color: '#ff8700'}}></i> {cuenta}</h5>
                        <a href={facebook}><i class="fa-brands fa-facebook" style={{ marginTop: '20px', color: '#ff8700', fontSize: '1.5rem' }}></i></a>
                        <a href={instagram}><i class="fa-brands fa-instagram" style={{ marginTop: '20px', marginLeft:'20px', color: '#ff8700', fontSize: '1.5rem' }}></i></a>
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
                                imagen = "https://www.tiendanimal.es/articulos/wp-content/uploads/2020/09/senderismo-perro-1200x900.jpg"
                                nombre = "Evento de Adopción"
                                descripcion= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis libero ac velit pretium, ut sodales neque vulputate. Nulla cursus turpis quam, at lacinia dui ultrices et. Nulla luctus venenatis sem nec placerat. Suspendisse sed mattis diam. Nunc ultrices ex ac pellentesque condimentum. Donec aliquam, ipsum quis tristique feugiat,"
                                fecha = "24/08/2022"
                            />
                            <TarjetaEventos
                                imagen = "https://www.tiendanimal.es/articulos/wp-content/uploads/2020/09/senderismo-perro-1200x900.jpg"
                                nombre = "Evento de Adopción"
                                descripcion= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis libero ac velit pretium, ut sodales neque vulputate. Nulla cursus turpis quam, at lacinia dui ultrices et. Nulla luctus venenatis sem nec placerat. Suspendisse sed mattis diam. Nunc ultrices ex ac pellentesque condimentum. Donec aliquam, ipsum quis tristique feugiat,"
                                fecha = "24/08/2022"
                            />
                        </div>
                    ) : (
                        <div className='row'>
                            <TarjetaPerros
                                imagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwWRH-oXGeRDRQxDcmt1EgAt-FzSg_qAQFBA&s"
                                nombre="Roxy"
                                edad="2 años"
                                tamano = "mediano"
                                descripcion= "Soy una perrita activa, juguetona y amorosa"
                            />
                            <TarjetaPerros
                                imagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwWRH-oXGeRDRQxDcmt1EgAt-FzSg_qAQFBA&s"
                                nombre="Roxy"
                                edad="2 años"
                                tamano = "mediano"
                                descripcion= "Soy una perrita activa, juguetona y amorosa"
                            />
                            <TarjetaPerros
                                imagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwWRH-oXGeRDRQxDcmt1EgAt-FzSg_qAQFBA&s"
                                nombre="Roxy"
                                edad="2 años"
                                tamano = "mediano"
                                descripcion= "Soy una perrita activa, juguetona y amorosa"
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
                imagen1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz1TGpr1fd7bC7qZer2p4bXnMdYyZxBb_ryA&s"
                imagen2 = "https://i0.wp.com/labcsa.org/wp-content/uploads/2022/09/10282995.jpg?resize=660%2C440&ssl=1"
                imagen3 = "https://www.eloccidental.com.mx/incoming/x11dqk-refugio-buenos-chicos-instagram-2.jpeg/alternates/FREE_720/Refugio%20Buenos%20Chicos%20Instagram%20(2).jpeg"
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



