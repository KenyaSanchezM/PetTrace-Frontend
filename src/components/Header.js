import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.css';

const Header = () => {
  const mainNavRef = useRef(null);
  const navbarTogglerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainNavRef.current) {
        if (window.scrollY > 50) {
          mainNavRef.current.classList.add('navbar-shrink');
        } else {
          mainNavRef.current.classList.remove('navbar-shrink');
        }
      }
    };

    const handleNavItemClick = () => {
      if (navbarTogglerRef.current && window.getComputedStyle(navbarTogglerRef.current).display !== 'none') {
        navbarTogglerRef.current.click();
      }
    };

    window.addEventListener('scroll', handleScroll);

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

  return (
    <nav ref={mainNavRef} className="navbar navbar-expand-lg navbar-dark " id="mainNav">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#page-top">
          <span className="ms-2">PetTrace</span>
        </a>
        <button
          ref={navbarTogglerRef}
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
            <li className="nav-item">
              <a className="nav-link" href="/">Inicio</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="refugiosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Refugios
              </a>
              <ul className="dropdown-menu" aria-labelledby="refugiosDropdown">
                <li><a className="dropdown-item" href="/refugio1">Match de perritos</a></li>
                <li><a className="dropdown-item" href="/refugios">Conocer refugios</a></li>
                <li><a className="dropdown-item" href="/eventos">Eventos con causa</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">Acerca de nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/refugios">Nuestra IA</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contáctanos</a>
            </li>
            <li className="nav-item profile">
              <a className="nav-link profile-link" href="/perfilusuario">
                <i className="bi bi-person-circle"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
