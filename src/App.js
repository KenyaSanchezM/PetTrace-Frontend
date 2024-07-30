import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import RegisterModal from './components/RegisterModal';
import SignIn from './components/SignIn';
import Tutorial from './components/Tutorial';
import Footer from './components/Footer'; 
import Refugios from './components/Refugios';
import Header from './components/Header';
import PresentRef from './components/PresentRef';
import PerfilRefugio from './components/PerfilRefugio';
import RegistroPerrosRefugios from './components/RegistroPerrosRefugios';
import RegistroPerros from './components/RegistroPerros'; // Importa el componente
import './App.css'; 
import RegisterShelterModal from './components/RegisterShelterModal';
//import ReportModal from './components/Report';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  //const [showReportModal, setShowReportModal] = useState(false);
  const [showRegisterShelterModal, setShowRegisterShelterModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  //const handleShowReportModal = () => setShowReportModal(true);
  //const handleCloseReportModal = () => setShowReportModal(false);

  const handleShowRegisterShelterModal = () => setShowRegisterShelterModal(true);
  const handleCloseRegisterShelterModal = () => setShowRegisterShelterModal(false);

  return (
    <Router>
      <div className="App">
        <Header onSignInClick={handleShowModal} onRegisterClick={handleShowRegisterModal} onRegisterShelterClick={handleShowRegisterShelterModal}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/registro-perros" element={<RegistroPerros />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/refugios" element={<Refugios />} />
          <Route path="/refugio" element={<PresentRef/>} />
          <Route path='/perfil-refugio' element={<PerfilRefugio/>} />
          <Route path='/registro-perros-refugios' element={<RegistroPerrosRefugios/>} />
        </Routes>
        <Footer />
        <SignIn show={showModal} handleClose={handleCloseModal} />
        <RegisterModal show={showRegisterModal} handleClose={handleCloseRegisterModal} />
        
        <RegisterShelterModal show={showRegisterShelterModal} handleClose={handleCloseRegisterShelterModal} />
       </div>
    </Router>
  );
}

export default App;

