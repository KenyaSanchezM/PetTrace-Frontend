// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Logo.jpg'; // Ajusta la ruta según tu estructura de proyecto

const Header = ({ onSignInClick, onRegisterClick, onRegisterShelterClick }) => {
  return (
    <header style={{ backgroundColor: '#8CAF6D', color: '#FBFCF2', padding: '10px 20px', maxWidth: '100%' }}>
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
              <a className="navbar-brand" href="/">
                <img src={logo} alt="Logo de PetTracer" className="logo" style={{ width: '100px', height: 'auto' }} />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/">Inicio</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/about">Acerca de nosotros</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/create">Crear</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/contact">Contáctanos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/shelters">Refugios</a>
                  </li>
                  <li className="nav-item">
                  <a className="nav-link" style={{ cursor: 'pointer' }} onClick={onSignInClick}>
                      Iniciar Sesión
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" style={{ cursor: 'pointer' }} onClick={onRegisterClick} >
                      Regístrate
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" style={{ cursor: 'pointer' }} onClick={onRegisterShelterClick} >
                      Registrar refugio
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
  );
};

export default Header;
