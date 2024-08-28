// Footer.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className=" text-white mt-5 p-4 text-center" style={{ backgroundColor: '#000108',}}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <h5>PetTracer</h5>
            <p>&copy; {new Date().getFullYear()} PetTrace. Todos los derechos reservados.</p>
            <p>Hecho con ❤️ por el equipo de PetTrace</p>
          </div>
          <div className="col-12 col-md-6">
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>Email: info@pettracer.com</li>
              <li>Teléfono: +1 234 567 890</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;