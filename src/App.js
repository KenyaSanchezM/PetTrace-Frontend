import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
import PerfilUsuario from './components/PerfilUsuario';
import RegistrarEvento from './components/RegistrarEvento';
//import ReportModal from './components/Report';
import HomeUser from './components/HomeUser';
import Eventos from './components/Eventos';
import IrPerfilUser from './components/IrPerfilUser';
import NuestraIA from './components/NuestraIA'
import MatchForm from './components/MatchForm'
import MatchResults from './components/MatchResults';


function App() {
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMatchForm, setShowMatchForm] = useState(false);


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  const handleShowMatchForm = () => setShowMatchForm(true);
  const handleCloseMatchForm = () => setShowMatchForm(false);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la aplicación
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_type');
    setIsAuthenticated(false);
    window.location.href = '/'; // Redirigir al inicio después de cerrar sesión
  };

  // Función para actualizar la autenticación tras iniciar sesión exitosamente
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    handleCloseModal();
  };

  return (
    <Router>
      <div className="App">
        <Header
          isAuthenticated={isAuthenticated}
          onSignInClick={handleShowModal}
          onLogoutClick={handleLogout}
          onRegisterClick={handleShowRegisterModal}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/registro-perros" element={<RegistroPerros />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/NuestraIA" element={<NuestraIA />} />
          <Route path="/refugios" element={<Refugios />} />
          <Route path="/refugio" element={<PresentRef />} />
          <Route path='/perfil-refugio' element={<PerfilRefugio />} />
          <Route path='/registro-perros-refugios' element={<RegistroPerrosRefugios />} />
          <Route path='/perfil-usuario' element={<PerfilUsuario />} />
          <Route path='/home' element={<HomeUser />} />
          <Route path='/eventos' element={<Eventos />} />
          <Route path="/ir-perfil-usuario/:userId" element={<IrPerfilUser />} />
          <Route path="/api/ir-perfil-refugio/:id" element={<PresentRef />} />
          <Route path='/registro-eventos' element={<RegistrarEvento />} />
          <Route path="/api/match" element={<MatchForm />} />
          <Route path="/match-resultados" element={<MatchResults />} />

        </Routes>
        <Footer />
        <SignIn show={showModal} handleClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} />
        <RegisterModal show={showRegisterModal} handleClose={handleCloseRegisterModal} />
        <RegistarEvento show={showRegistrarEvento} handleClose={handleCloseRegistrarEvento} />
        <MatchForm show={showMatchForm} handleClose={handleCloseMatchForm} />
      </div>
    </Router>
  );
}

export default App;
