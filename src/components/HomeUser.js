import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './HomeUser.css';
import PubDogCard from './PubDogCard';
import RegistroPerros from './RegistroPerros';
import axios from 'axios';
import FiltrosRazas from './FiltrosRazas';

const HomeUser = () => {
    const [dogs, setDogs] = useState([]);
    const [error, setError] = useState(null);
    const [showRegistroModal, setShowRegistroModal] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const location = useLocation();
    const [filters, setFilters] = useState({
        breeds: [],
        colors: [],
        is_mine: null,
        sex: '',
        date: '',
        status: '', 
        estado: ''
    });

    const [errorEventos, setErrorEventos] = useState(null);
    const [eventos, setEventos] = useState([]);
    useEffect(() => {
        fetchUltimosEventos();
    }, []);

    const fetchUltimosEventos = async () => {
        const token = localStorage.getItem('access_token'); // Asegúrate de que el token esté almacenado correctamente
        try {
            const response = await axios.get('http://localhost:8000/api/ultimos-eventos/', {
                headers: {
                    'Authorization': `Bearer ${token}` // Incluye el token
                }
            });
            setEventos(response.data);
        } catch (error) {
            console.error('Error al obtener los últimos eventos:', error);
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({});


    const userType = localStorage.getItem('user_type');
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search');

        if (searchQuery) {
            const query = JSON.parse(decodeURIComponent(searchQuery));
            searchMatches(query);
        } else {
            fetchAllDogs();
        }
    }, [location.search]);

    const fetchAllDogs = async () => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.get('http://localhost:8000/api/dog-predictions/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setDogs(response.data);
        } catch (error) {
            setError('Hubo un problema al cargar los datos de los perros.');
        }
    };

    const searchMatches = async (query) => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.get('http://localhost:8000/api/search-matches/', {
                params: { search: JSON.stringify(query) },
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data && response.data.length > 0) {
                setDogs(response.data);
                setShowSearchResults(true);
            } else {
                setDogs([]);
                setShowSearchResults(false);
            }
        } catch (error) {
            setError('Hubo un problema al buscar coincidencias.');
        }
    };

    const handleFilterSubmit = (newFilters) => {
        setFilters(newFilters);
        filterDogs(newFilters);
    };

    const filterDogs = async (filters) => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.get('http://localhost:8000/api/dog-filter/', {
                params: {
                    breeds: filters.breeds.join(','),
                    colors: filters.colors.join(','),
                    is_mine: filters.is_mine === null ? null : filters.is_mine,  // Asegúrate de enviar null si is_mine es null
                    sex: filters.sex,
                    date: filters.date,
                    status: filters.status,
                    estado: filters.estado,
                    
                },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setDogs(response.data);
        } catch (error) {
            setError('Hubo un problema al filtrar los perros.');
        }
    };
    

    const getAbsoluteImageUrl = (url) => {
        if (!url) return 'public/images/temporal.jpeg';
        return url.startsWith('http://') || url.startsWith('https://') ? url : `http://localhost:8000${url}`;
    };

    return (
        <div className="home-user">
            <div className="sidebar" >
            <h4 ><a style={{textDecoration: 'none', color:'#000'} } href="/eventos">Eventos con causa</a></h4>
                <hr />
                {errorEventos ? (
                    <p>{errorEventos}</p>
                ) : (
                    eventos.map((evento) => (
                        <div className="EventCardHome" key={evento.id}>
                            <h5>{evento.nombre_evento}</h5>
                                <img
                                    src={evento.imagen_evento ? `http://localhost:8000${evento.imagen_evento}` : '/images/eventos.jpg'}
                                    alt={evento.nombre_evento}
                                    className="event-image"
                                />
                            <p><strong>Fecha:</strong> {evento.fecha_evento || 'Fecha no disponible'}</p>
                        </div>
                    ))
                )}
                <div className="view-more">
                    <a href="/eventos">Ver más</a>
                </div>
            </div>
            <div className='content'>
                <FiltrosRazas onFilterSubmit={handleFilterSubmit} />
                <div className='publish'>
                    <i className="fa-solid fa-dog dog-icon"></i>
                    {userType === 'user' && (
                        <button 
                            type="button" 
                            className="btn btn-outline-warning publish-button"
                            onClick={() => setShowRegistroModal(true)}
                        >
                            Publicar Mascota
                        </button>
                    )}
                </div>
                <div className='card-container'>
                    {error && <p className="text-danger">{error}</p>}
                    {!showSearchResults && dogs.length > 0 ? (
                        dogs.map(dog => (
                            <div key={dog.id} className="dog-card">
                                <PubDogCard 
                                    images={[
                                        getAbsoluteImageUrl(dog.image),
                                        getAbsoluteImageUrl(dog.profile_image1),
                                        getAbsoluteImageUrl(dog.profile_image2)
                                    ]}
                                    texts={[dog.caracteristicas, dog.nombre, dog.form_type, dog.estado,dog.ciudad,dog.direccion, dog.breeds,dog.id,dog.sexo]}
                                    userName={dog.user ? dog.user.nombre : 'Nombre no disponible'}
                                    userImage={dog.user ? getAbsoluteImageUrl(dog.user.profile_image) : 'default-image-url'}
                                    dogId={dog.id}
                                    userType={userType}
                                    userId={dog.user_id}
                                />
                            </div>
                        ))
                    ) : (
                        <p>...</p>
                    )}
                </div>
                {showSearchResults && (
                    <div className='search-results'>
                        
                        {dogs.length > 0 ? (
                            dogs.map(result => (
                                <PubDogCard 
                                    key={result.id}
                                    images={[
                                        getAbsoluteImageUrl(result.image),
                                        getAbsoluteImageUrl(result.profile_image1),
                                        getAbsoluteImageUrl(result.profile_image2)
                                    ]}
                                    texts={[result.caracteristicas, result.nombre, result.form_type, result.estado, result.ciudad, result.direccion, result.breeds,result.id,result.sexo]}
                                    userName={result.user ? result.user.nombre : 'Nombre no disponible'}
                                    userImage={result.user ? getAbsoluteImageUrl(result.user.profile_image) : 'default-image-url'}
                                    dogId={result.id}
                                    userType={userType}
                                    userId={result.user_id}
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
                handleClose={() => setShowRegistroModal(false)}
                user_id={userId}
            />
        </div>
    );
};

export default HomeUser;
