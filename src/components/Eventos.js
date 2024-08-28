//Presentación de todos los eventos

import React from 'react';
import './eventos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Eventos = () => {
    return(
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
                    <div className="btn-group me-3" role="group" style={{marginLeft: '28px'}}>
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
                    <div className="btn-group me-3" role="group">
                      <button type="button" className="btn btn-warning dropdown-toggle text-light" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: '#ff8700', borderColor: '#ff8700', width: '120px' }}>
                          Categoría
                      </button>
                      <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">Adopciones</a></li>
                          <li><a className="dropdown-item" href="#">Rifas con causa</a></li>
                          <li><a className="dropdown-item" href="#">Esterilización</a></li>
                          <li><a className="dropdown-item" href="#">Recaudación</a></li>
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
      </div>
      
    );
};
export default Eventos;