import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Footer from './components/Footer'; 
import Refugios from './components/Refugios';
import Header from './components/Header';
import PresentRef from './components/PresentRef';
import RegistroPerros from './components/RegistroPerros'; // Importa el componente
import './App.css'; 

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  return (
    <Router>
      <div className="App">
        <Header onSignInClick={handleShowModal} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registro-perros" element={<RegistroPerros />} />
          <Route path="/refugios" element={<Refugios />} />
          <Route path="/refugio" element={<PresentRef/>} />
        </Routes>
        <Footer />
        <SignIn show={showModal} handleClose={handleCloseModal} />
      </div>
    </Router>
  );
}

export default App;

