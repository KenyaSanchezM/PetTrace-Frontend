import React, { useState, useEffect } from 'react';
import './HomeUser.css';
import PubDogCard from './PubDogCard';
import axios from 'axios';

const HomeUser = () => {
    const [dogs, setDogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token'); // Ajusta según tu lógica de almacenamiento de token
        const fetchDogs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/dog-predictions/', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Incluir el token en la cabecera
                    }
                });
                setDogs(response.data);
            } catch (error) {
                console.error('Error fetching dogs:', error);
                setError('Hubo un problema al cargar los datos de los perros.');
            }
        };

        fetchDogs();
    }, []);

    return (
        <div className="home-user">
            <div className="sidebar">
                <h4>Eventos con causa</h4>
                <hr />
                <div className="EventCardHome">
                    <h5>Adopta</h5>
                    <img src="https://www.dondeir.com/wp-content/uploads/2021/02/dale-hogar-estos-perrtios-gatitos-fundaciones.jpg" alt="Evento 1" className="event-image" />
                </div>
                <div className="EventCardHome">
                    <h5>Rifa</h5>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1hfCvVjMnvOqyiQ54L2uXaqWHvyUp0YVl6w&s" alt="Evento 2" className="event-image" />
                </div>
                <div className="EventCardHome">
                    <h5>Voluntariado</h5>
                    <img src="https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__medium/public/media/2019/07/22/voluntarios_animales.jpg" alt="Evento 3" className="event-image" />
                </div>
                <div className="view-more">
                    <a href="/eventos">Ver más</a>
                </div>
            </div>
            <div className='content'>
                <div className='publish'>
                    <i className="fa-solid fa-dog dog-icon"></i>
                    <button type="button" className="btn btn-outline-warning publish-button">Publicar Mascota</button>
                </div>
                <div className='card-container'>
                    {error && <p className="text-danger">{error}</p>}
                    {dogs.length > 0 ? (
                        dogs.map((dog) => (
                            <PubDogCard 
                                key={dog.id}
                                images={[dog.image]} 
                                text={dog.caracteristicas}
                                userName={dog.user.nombre}  // Utiliza el nombre del usuario del perfil del perro
                                userImage={dog.user.profile_image}  // Utiliza la imagen del usuario del perfil del perro
                            />
                        ))
                    ) : (
                        <p>No hay perros registrados.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeUser;
