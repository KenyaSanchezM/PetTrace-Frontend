import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.css';
import axios from 'axios';


const Header = ({ isAuthenticated, onSignInClick, onLogoutClick, onRegisterClick }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return; // Si no hay token, no hacemos la solicitud
      try {
        const response = await axios.get('http://localhost:8000/api/perfil-usuario/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response.data); // Agregar para verificar la respuesta
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      }
    };
    fetchUserData();
  }, []);

  const getProfileLink = () => {
    const userType = localStorage.getItem('user_type'); // Obtenemos el tipo de usuario
    if (userType === 'shelter') {
      return '/perfil-refugio';
    } else {
      return '/perfil-usuario';
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" id="mainNav">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#page-top">
          <span className="ms-2"><img src="/perrazo.png" alt="Logo" /> PetTrace</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fas fa-bars ms-1"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
            {!isAuthenticated ? (
              <li className="nav-item">
                <a className="nav-link" href="/">Pagina principal</a>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/home">Inicio</a>
              </li>
            )}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="refugiosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Refugios
              </a>
              <ul className="dropdown-menu" aria-labelledby="refugiosDropdown">
                <li><a className="dropdown-item" href="/refugios">Conocer refugios</a></li>
                <li><a className="dropdown-item" href="/eventos">Eventos con causa</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/NuestraIA">Nuestra IA</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contáctanos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">Acerca de nosotros</a>
            </li>
            <li className="nav-item dropdown profile">
              {userData ? (
              <a className="nav-link dropdown-toggle profile-link" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img 
                  src={`http://localhost:8000${userData.user.profile_image}`} 
                  alt="Foto de perfil"
                  className="rounded-circle" 
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
                />
              </a>
              ) : (
                <a className="nav-link dropdown-toggle profile-link" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person-circle"></i>
              </a>
              )}
              <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                {isAuthenticated ? (
                  <>
                    <li><a className="dropdown-item" href={getProfileLink()}>Mi perfil</a></li>
                    <li><button className="dropdown-item" onClick={onLogoutClick}>Cerrar sesión</button></li>
                  </>
                ) : (
                  <>
                    <li><button className="dropdown-item" onClick={onSignInClick}>Iniciar sesión</button></li>
                    <li><a className="dropdown-item" href="#" onClick={onRegisterClick}>Registrarse</a></li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

