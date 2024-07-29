import React from 'react';
import './Tutorial.css';

function Tutorial() {
    return (
        <div className="tutorial-container">
            <h1>Tutorial de nuestra IA</h1>
            <p>Aprende a utilizar nuestra IA paso a paso con este tutorial en video.</p>
            <div className="video-container">
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/GUO10bS0vk0?si=D_kx8On8y7rJWXbk" // Reemplaza con el ID de tu video
                    title="Tutorial de nuestra IA"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="additional-info">
                <h2>Características</h2>
                <ul>
                    <li>Interfaz intuitiva y fácil de usar.</li>
                    <li>Acceso a información en tiempo real.</li>
                </ul>
                <h2>Preguntas Frecuentes</h2>
                <p><strong>¿Cómo puedo acceder a la IA?</strong></p>
                <p>Puedes acceder a la IA a través de nuestra página principal. Solo necesitas crear una cuenta y empezar a usarla.</p>
                <p><strong>¿Qué necesito para usar la IA?</strong></p>
                <p>Solo necesitas un dispositivo con acceso a internet y un navegador web compatible. Además de la imagen de la mascota que...
                  
                </p>
            </div>
        </div>
    );
}

export default Tutorial;
