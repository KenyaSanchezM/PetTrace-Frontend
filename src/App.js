import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import RegisterModal from './components/RegisterModal';
import SignIn from './components/SignIn';
import Tutorial from './components/Tutorial';
import Footer from './components/Footer'; 
import Header from './components/Header';
import './App.css'; 
import RegistroPerros from './components/RegistroPerros';
//import ReportModal from './components/Report';
import RegisterShelterModal from './components/RegisterShelterModal';
import Refugios from './components/Refugios';
import PerfilUsuario from './components/PerfilUsuario';
import RegistarEvento from './components/RegistrarEvento';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  //const [showReportModal, setShowReportModal] = useState(false);
  const [showRegisterShelterModal, setShowRegisterShelterModal] = useState(false);
  const [showRegistrarEvento, setShowRegistrarEvento] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  //const handleShowReportModal = () => setShowReportModal(true);
  //const handleCloseReportModal = () => setShowReportModal(false);

  const handleShowRegisterShelterModal = () => setShowRegisterShelterModal(true);
  const handleCloseRegisterShelterModal = () => setShowRegisterShelterModal(false);

  const handleShowRegistrarEvento = () => setShowRegistrarEvento(true);
  const handleCloseRegistrarEvento = () => setShowRegistrarEvento(false);

  return (
    <Router>
      <div className="App">
        <Header onSignInClick={handleShowModal} onRegisterClick={handleShowRegisterModal} onRegisterShelterClick={handleShowRegisterShelterModal} onRegistrarEventoClick={handleShowRegistrarEvento}/>
        <main className="container py-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/registro-perros" element={<RegistroPerros />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/refugios" element={<Refugios />} />
            <Route path='/perfilusuario' element={<PerfilUsuario />} />
          </Routes>
        </main>
        <Footer />
        <SignIn show={showModal} handleClose={handleCloseModal} />
        <RegisterModal show={showRegisterModal} handleClose={handleCloseRegisterModal} />
        <RegisterShelterModal show={showRegisterShelterModal} handleClose={handleCloseRegisterShelterModal} />
        <RegistarEvento show={showRegistrarEvento} handleClose={handleCloseRegistrarEvento} />
      </div>
    </Router>
  );
}

export default App;

