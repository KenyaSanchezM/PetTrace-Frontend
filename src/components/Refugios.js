//Presentación de refugios
import React from 'react';
import './Refugios.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Tarjeta = ({imagen, titulo, texto, enlace, estado,ciudad}) => {
  return(
    <div className="col-12 col-sm-6 col-md-4 mb-4 mt-4">
      <div className="card tarjeta" onClick={() => window.location.href = enlace}>
      <img src={imagen} className="card-img-top" style={{width: '100%', height: '100%'}} alt={titulo} />
        <div className="card-img-overlay d-flex flex-column justify-content-end p-3">
        <h5 className="card-title">{titulo}</h5>
          <hr className="title-underline" />
        </div>
        <div className="card-body">
          <p className="card-text">{texto}<br/><br/>{ciudad}, {estado}</p>
        </div>
      </div>
    </div>
  );

};

const Refugios = () => {


    return(
      <div className='contenedor-refugios'>
        {/* Masthead */}
        <header className="masthead">
          <div className="container">
            {/*<div className="masthead-subheading">Conoce acerca de nuestros</div>*/}
            <div className="masthead-heading text-uppercase">Refugios</div>
            <a className="btn btn-warning btn-xl text-light" href="#services">Haz Match</a>
          </div>
        </header>
        {/* Refugios */}
        <section className="page-section" id="services">
          <div className="container">
            <div className="text-center">
              <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="btn-filter btn-group me-3" role="group">
                      <button type="button" className="btn btn-warning dropdown-toggle text-light" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: '#ff8700', borderColor: '#ff8700', width: '120px'}}>
                        Estado
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item"  href="#">Aguascalientes</a></li>
                        <li><a className="dropdown-item" href="#">Baja California</a></li>
                        <li><a className="dropdown-item"  href="#">Baja California Sur</a></li>
                        <li><a className="dropdown-item" href="#">Campeche</a></li>
                        <li><a className="dropdown-item"  href="#">Coahuila</a></li>
                        <li><a className="dropdown-item" href="#">Colima</a></li>
                        <li><a className="dropdown-item" href="#">Chiapas</a></li>
                        <li><a className="dropdown-item" href="#">Chihuahua</a></li>
                        <li><a className="dropdown-item" href="#">Durango</a></li>
                        <li><a className="dropdown-item" href="#">Distrito Federal</a></li>
                        <li><a className="dropdown-item" href="#">Guanajuato</a></li>
                        <li><a className="dropdown-item" href="#">Guerrero</a></li>
                        <li><a className="dropdown-item" href="#">Hidalgo</a></li>
                        <li><a className="dropdown-item" href="#">Jalisco</a></li>
                        <li><a className="dropdown-item" href="#">México</a></li>
                        <li><a className="dropdown-item" href="#">Michoacán</a></li>
                        <li><a className="dropdown-item" href="#">Morelos</a></li>
                        <li><a className="dropdown-item" href="#">Nayarit</a></li>
                        <li><a className="dropdown-item" href="#">Oaxaca</a></li>
                        <li><a className="dropdown-item" href="#">Quintana Roo</a></li>
                        <li><a className="dropdown-item" href="#">San Luis Potosí</a></li>
                        <li><a className="dropdown-item" href="#">Sonora</a></li>
                        <li><a className="dropdown-item" href="#">Yucatán</a></li>
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
            <div className=" tarjetas row text-center mt-5">
              <Tarjeta
                imagen="https://www.hogarmania.com/archivos/202011/cosas-donar-refugio-animales-portada-668x400x80xX-1.jpg"
                titulo="Buenos Chicos"
                texto="Refugio dedicado a brindar amor y hogar a perros en busca de una segunda oportunidad."
                enlace = "/refugio"
                estado = "CDMX"
                ciudad = "Perro"
              />
              <Tarjeta
                imagen="https://cdn.unotv.com/images/2023/12/refugio-animales-140859-1024x576.jpg"
                titulo="Dejando Huellitas"
                texto="Comprometidos en rescatar y encontrar familias amorosas para perros necesitados."
              />
              <Tarjeta
                imagen="https://www.elsoldetlaxcala.com.mx/incoming/mc3rhk-albergue-de-perros/ALTERNATES/LANDSCAPE_960/Albergue%20de%20perros"
                titulo="Patitas Felices"
                texto="Ofrecemos esperanza y un nuevo hogar a perros abandonados"
              />
              <Tarjeta
                imagen="https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/wesauslaoz5kkprwrkjg"
                titulo="Patitas Felices"
                texto="Un refugio seguro donde los perros encuentran amor y cuidado"
              />
            </div>
          </div>
        </section>
      </div>
          
    );
};
export default Refugios