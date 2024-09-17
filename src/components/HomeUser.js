import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation
import './HomeUser.css';
import PubDogCard from './PubDogCard';
import RegistroPerros from './RegistroPerros';
import axios from 'axios';

const HomeUser = () => {
    const [dogs, setDogs] = useState([]);
    const [error, setError] = useState(null);
    const [showRegistroModal, setShowRegistroModal] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const location = useLocation(); // Obtén la ubicación actual para manejar parámetros de búsqueda

    const handleShowRegistroModal = () => setShowRegistroModal(true);
    const handleCloseRegistroModal = () => setShowRegistroModal(false);

    const userType = localStorage.getItem('user_type'); // Obtén el tipo de usuario desde localStorage
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search');
        
        if (searchQuery) {
            const query = JSON.parse(decodeURIComponent(searchQuery));
            searchMatches(query);
        } else {
            fetchAllDogs();  // Si no hay búsqueda, muestra todas las publicaciones
        }
    }, [location.search]);
    
    
    const fetchAllDogs = async () => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.get('http://localhost:8000/api/dog-predictions/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Verifica las URLs de las imágenes
            console.log(response.data.map(dog => ({
                image: getAbsoluteImageUrl(dog.image),
                profile_image1: getAbsoluteImageUrl(dog.profile_image1),
                profile_image2: getAbsoluteImageUrl(dog.profile_image2),
                userImage: dog.user ? getAbsoluteImageUrl(dog.user.profile_image) : 'default-image-url'
            })));
            setDogs(response.data); // Muestra todas las publicaciones
        } catch (error) {
            console.error('Error fetching dogs:', error);
            setError('Hubo un problema al cargar los datos de los perros.');
        }
    };
    
    

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            const query = JSON.parse(decodeURIComponent(searchQuery));
            searchMatches(query);  // Realiza la búsqueda con las razas proporcionadas
        }
    }, [location.search]);
    
    const searchMatches = async (dog) => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.get('http://localhost:8000/api/search-matches/', {
                params: {
                    breeds: JSON.stringify(dog.breeds),
                    colors: JSON.stringify(dog.color)  // Enviar también el filtro de colores
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.data && response.data.length > 0) {
                setDogs(response.data);  // Actualiza el estado con los resultados filtrados
            } else {
                setDogs([]);  // Si no hay resultados, muestra un array vacío
            }
        } catch (error) {
            console.error('Error searching matches:', error);
            setError('Hubo un problema al buscar coincidencias.');
        }
    };
    
    
    const resetSearchResults = () => {
        setShowSearchResults(false);
        setSearchResults([]);
    };

    const getAbsoluteImageUrl = (url) => {
        // Si la URL ya tiene un dominio, no añadir el prefijo
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        // Si la URL es relativa, añadir el dominio base
        return `http://localhost:8000${url}`;
    };
    

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
                    {userType === 'user' && ( // Mostrar solo si el tipo de usuario es 'user'
                        <button 
                            type="button" 
                            className="btn btn-outline-warning publish-button"
                            onClick={handleShowRegistroModal}
                        >
                            Publicar Mascota
                        </button>
                    )}
                </div>
                <div className='card-container'>
                    {error && <p className="text-danger">{error}</p>}
                    {!showSearchResults && dogs.length > 0 ? (
                        dogs.map((dog) => (
                            <div key={dog.id} className="dog-card">
                                <PubDogCard 
                                    images={[
                                        getAbsoluteImageUrl(dog.image),
                                        getAbsoluteImageUrl(dog.profile_image1),
                                        getAbsoluteImageUrl(dog.profile_image2)
                                    ]}
                                    texts={[dog.caracteristicas, dog.nombre, dog.form_type, dog.ubicacion, dog.breeds]}
                                    userName={dog.user ? dog.user.nombre : 'Nombre no disponible'}
                                    userImage={dog.user ? getAbsoluteImageUrl(dog.user.profile_image) : 'default-image-url'}
                                    onSearchMatches={() => searchMatches(dog)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No hay perros registrados.</p>
                    )}
                </div>
                {/* Mostrar resultados filtrados de la búsqueda */}
                    {showSearchResults && (
                        <div className='search-results'>
                            <h3>Resultados de la búsqueda:</h3>
                            {searchResults.length > 0 ? (
                                searchResults.map((result) => (
                                    <PubDogCard 
                                        key={result.id}
                                        images={[
                                            getAbsoluteImageUrl(result.image),
                                            getAbsoluteImageUrl(result.profile_image1),
                                            getAbsoluteImageUrl(result.profile_image2)
                                        ]}
                                        texts={[result.caracteristicas, result.nombre, result.form_type, result.ubicacion, result.breeds]}
                                        userName={result.user ? result.user.nombre : 'Nombre no disponible'}
                                        userImage={result.user ? getAbsoluteImageUrl(result.user.profile_image) : 'default-image-url'}
                                    />
                                ))
                            ) : (
                                <p>No se encontraron coincidencias.</p>
                            )}
                        </div>
                    )}
            </div>
            <RegistroPerros 
                show={showRegistroModal} 
                handleClose={handleCloseRegistroModal}
                user_id={userId}
            />
        </div>
    );
};

export default HomeUser;
