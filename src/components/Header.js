import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../Logo.png'; // Ajusta la ruta según tu estructura de proyecto
import './Header.css';

const Header = ({ onSignInClick, onRegisterClick, onRegisterShelterClick, onRegistrarEventoClick }) => {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('mainNav');
      if (window.scrollY > 50) {
        nav.classList.add('navbar-shrink');
      } else {
        nav.classList.remove('navbar-shrink');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand" href="#page-top">
          <img src={logo} alt="Logo" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i className="fas fa-bars ms-1"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={onSignInClick}>
                Iniciar Sesión
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={onRegisterClick}>
                Registrarse
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={onRegisterShelterClick}>
                Registrar refugio
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#" onClick={onRegistrarEventoClick}>
                Registrar evento 
              </a>
            </li>*/}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="refugiosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Refugios
              </a>
              <ul className="dropdown-menu" aria-labelledby="refugiosDropdown">
                <li><a className="dropdown-item" href="/refugio1">Match de perritos</a></li>
                <li><a className="dropdown-item" href="/refugios">Conocer refugios</a></li>
                <li><a className="dropdown-item" href="/refugio3">Eventos con causa</a></li>
              </ul>
            </li>
            {/*<li className="nav-item">
              <a className="nav-link" href="/about">Acerca de nosotros</a>
            </li>*/}
            <li className="nav-item">
              <a className="nav-link" href="/refugios">Nuestra IA</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contáctanos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/perfil-usuario"><i className="bi bi-person-circle"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

