import React from 'react';
import './NuestraIA.css'; // Asegúrate de tener estilos adecuados

const AIProcessView = () => {
    return (
        <div className="ai-process-container">
            <h1>¿Cómo funciona nuestra IA?</h1>
            <p>Te llevamos a través del proceso de cómo nuestra inteligencia artificial trabaja para ayudarte a encontrar a tu perrito.</p>

            <div className="step">
                <h2>Paso 1: Recolección de Datos</h2>
                <p>Nuestra IA comienza recopilando imagenes de perros de entre 72 razas disponibles, encontrando patrones entre sus caracteristicas.</p>
                <img src="\images\1.png" alt="Recolección de datos" className="step-image" />
            </div>

            <div className="step">
                <h2>Paso 2: Análisis de Características</h2>
                <p>Una vez que tenemos los datos, nuestra IA analiza las características de cada perro para entender mejor sus atributos.</p>
                <img src="\images\2.png" alt="Análisis de características" className="step-image" />
            </div>

            <div className="step">
                <h2>Paso 3: Algoritmos de Coincidencia</h2>
                <p>Utilizamos algoritmos avanzados para comparar tus preferencias con las características de los perros, buscando las mejores coincidencias.</p>
                <img src="\images\3.png" alt="Algoritmos de coincidencia" className="step-image" />
            </div>

            <div className="step">
                <h2>Paso 4: Presentación de Resultados</h2>
                <p>Finalmente, nuestra IA te presenta una lista de perros que coinciden con la imagen de tu Mascota.</p>
                <img src="\images\4.png" alt="Presentación de resultados" className="step-image" />
            </div>

            <div className="step">
                <h2>Paso 5: Feedback</h2>
                <p>Tu feedback es importante. Haznos saber tus opiniones para poder mejorar nuestra IA.</p>
                <img src="\images\5.png" alt="Feedback y aprendizaje" className="step-image" />
            </div>

            <footer>
                <p>¡Gracias por confiar en nosotros para encontrar tu compañero perfecto!</p>
            </footer>
        </div>
    );
};

export default AIProcessView;
