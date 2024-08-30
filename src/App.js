import React, { useState, useEffect } from 'react';
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
import PerfilUsuario from './components/PerfilUsuario';
import RegistarEvento from './components/RegistrarEvento';
//import ReportModal from './components/Report';
import HomeUser from './components/HomeUser';
import Eventos from './components/Eventos';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showRegisterShelterModal, setShowRegisterShelterModal] = useState(false);
  const [showRegistrarEvento, setShowRegistrarEvento] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  const handleShowRegisterShelterModal = () => setShowRegisterShelterModal(true);
  const handleCloseRegisterShelterModal = () => setShowRegisterShelterModal(false);

  const handleShowRegistrarEvento = () => setShowRegistrarEvento(true);
  const handleCloseRegistrarEvento = () => setShowRegistrarEvento(false);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la aplicación
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
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
          onRegisterShelterClick={handleShowRegisterShelterModal}
          onRegistrarEventoClick={handleShowRegistrarEvento}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/registro-perros" element={<RegistroPerros />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/refugios" element={<Refugios />} />
          <Route path="/refugio" element={<PresentRef />} />
          <Route path='/perfil-refugio' element={<PerfilRefugio />} />
          <Route path='/registro-perros-refugios' element={<RegistroPerrosRefugios />} />
          <Route path='/perfil-usuario' element={<PerfilUsuario />} />
          <Route path='/home' element={<HomeUser />} />
          <Route path='/eventos' element={<Eventos />} />
        </Routes>
        <Footer />
        <SignIn show={showModal} handleClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} />
        <RegisterModal show={showRegisterModal} handleClose={handleCloseRegisterModal} />
        <RegisterShelterModal show={showRegisterShelterModal} handleClose={handleCloseRegisterShelterModal} />
        <RegistarEvento show={showRegistrarEvento} handleClose={handleCloseRegistrarEvento} />
      </div>
    </Router>
  );
}

export default App;
