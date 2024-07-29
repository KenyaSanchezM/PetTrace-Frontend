//Presentación de refugios... Página con los refugios registrados en el sitio web

import React, { useEffect, useRef } from 'react';
import './Refugios.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './Header';

const Tarjeta = ({imagen, titulo, texto, enlace}) => {
  return(
    //<img src={imagen} className="card-img-top" alt={titulo} />  Codigo para poner la imagen
    <div className="col-12 col-sm-6 col-md-4 mb-4 mt-4">
      <div className="card tarjeta" onClick={() => window.location.href = enlace}>
      <img src="https://i0.wp.com/despertarmexico.com/wp-content/uploads/2023/12/refigio-de-perritos-pide-apoyo1.jpg?resize=1024%2C768&ssl=1" className="card-img-top" style={{width: '100%', height: '100%'}} alt="..." />
        <div className="card-img-overlay d-flex flex-column justify-content-end p-3">
          <h5 className="card-title">{titulo}</h5>
          <hr className="title-underline" />
        </div>
        <div className="card-body">
          <p className="card-text">{texto}</p>
        </div>
      </div>
    </div>
  );

};

const Refugios = () => {
    const mainNavRef = useRef(null);
    const navbarTogglerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
        if (mainNavRef.current) {
            if (window.scrollY === 0) {
            mainNavRef.current.classList.remove('navbar-shrink');
            } else {
            mainNavRef.current.classList.add('navbar-shrink');
            }
        }
        };

        const handleNavItemClick = () => {
        if (navbarTogglerRef.current && window.getComputedStyle(navbarTogglerRef.current).display !== 'none') {
            navbarTogglerRef.current.click();
        }
        };

        window.addEventListener('scroll', handleScroll);

        if (mainNavRef.current) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
        }

        const responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link'));
        responsiveNavItems.forEach((item) => {
        item.addEventListener('click', handleNavItemClick);
        });

        // Initial call to set navbar shrink state
        handleScroll();

        return () => {
        window.removeEventListener('scroll', handleScroll);
        responsiveNavItems.forEach((item) => {
            item.removeEventListener('click', handleNavItemClick);
        });
        };
    }, []);
    return(
    <div>
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
                  <p className="mb-1 me-2 text-uppercase" style={{ fontFamily: 'inherit' }}>Filtrar por estado:</p>
                  <div className="btn-group me-3" role="group">
                    <button type="button" className="btn btn-warning dropdown-toggle text-light" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: '#ff8700', borderColor: '#ff8700' }}>
                      Selecciona
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item"  href="#">Jalisco</a></li>
                      <li><a className="dropdown-item" href="#">CDMX</a></li>
                      <li><a className="dropdown-item"  href="#">Jalisco</a></li>
                      <li><a className="dropdown-item" href="#">CDMX</a></li>
                      <li><a className="dropdown-item"  href="#">Jalisco</a></li>
                      <li><a className="dropdown-item" href="#">CDMX</a></li>
                    </ul>
                  </div>
                </div>
                <form className="d-flex" role="search">
                  <input className="form-control me-2 rounded-pill shadow-sm" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn rounded-pill btn-warning" type="submit" style={{ backgroundColor: '#ff8700', borderColor: '#ff8700' }}>
                    <i className="bi bi-search " style={{ color: '#fff' }}></i>
                  </button>
                </form>
            </div>
          </div>
          <div className="row text-center mt-5">
            <Tarjeta
              imagen="https://via.placeholder.com/300"
              titulo="Buenos Chicos"
              texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in placerat urna."
              enlace = "/refugio"
              /*Falta poner el enlace*/
            />
            <Tarjeta
              imagen="https://via.placeholder.com/300"
              titulo="Dejando Huellitas"
              texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in placerat urna."
            />
            <Tarjeta
              imagen="https://via.placeholder.com/300"
              titulo="Patitas Felices"
              texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in placerat urna."
            />
            <Tarjeta
              imagen="https://via.placeholder.com/300"
              titulo="Patitas Felices"
              texto="Algunos textos de ejemplo para construir el título de la tarjeta y hacer que el contenido de la tarjeta sea más extenso."
            />
          </div>
        </div>
      </section>
    </div>
          
    )
}
export default Refugios