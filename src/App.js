import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Register from './components/Register';
import Shelters from './components/Shelters';
import Footer from './components/Footer'; 
import Header from './components/Header';// Asegúrate de que la ruta del import sea correcta
import './App.css'; // Asegúrate de importar el CSS
import RegistroPerros from './components/RegistroPerros'; // Importa el componente

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container py-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/shelters" element={<Shelters />} />
            <Route path="/registro-perros" element={<RegistroPerros />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

