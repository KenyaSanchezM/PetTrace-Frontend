// Footer.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
  return (
    <footer className=" text-white mt-5 p-4 text-center" style={{ backgroundColor: '#1f273b',}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 text-center">
            <h5  >PetTrace</h5>
            <p style={{textAlign:'center'}}>&copy; {new Date().getFullYear()} PetTrace. Todos los derechos reservados.
              <br/>Hecho con ❤️ por el equipo de PetTrace
              <br/>Correo: info@pettracer.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;