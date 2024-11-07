import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom

const PubDogCard = ({ images, texts, userImage, userName, dogId, userType,userId}) => {
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [isMarked, setIsMarked] = useState(null);  // Estado para manejar la selección
    const menuRef = useRef(null);

    const handleImageClick = (image) => {
        setModalImage(image);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleCloseMenu = () => setShowMenu(false);

    const toggleMenu = (event) => {
        event.stopPropagation();  
        setShowMenu(!showMenu);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                handleCloseMenu();
            }
        };

        if (showMenu) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]);

    const handleMarkAsMine = async (dogId) => {
        console.log("dogId:", dogId);
        const token = localStorage.getItem('access_token');
        console.log("Token de autenticación:", token);
    
        try {
            const response = await axios.post(`http://localhost:8000/api/mark-dog/${dogId}/`, {
                is_marked: true,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }                
            });
            console.log('Perro marcado correctamente:', response.data);
            setIsMarked(true);  // Actualiza el estado
        } catch (error) {
            console.error('Error al marcar como "Es mi mascota":', error);
        }
        window.location.reload();
    };
    

    const handleMarkAsNotMine = async (dogId) => {
    try {
        const token = localStorage.getItem('access_token');
        await axios.post(`http://localhost:8000/api/mark-dog/${dogId}/`, {
            is_marked: false,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,  // JWT token si lo estás usando
            },
        });
        setIsMarked(false);
    } catch (error) {
        console.error('Error al marcar como "No es mi mascota":', error);
    }
    window.location.reload();
};

  
return (
    <div className="container mt-4">
        <div className="DogCard" style={{ width: '18rem', position: 'relative' }}>
            <div className="user-info">
                <div className='user-details'>
                    <img
                        src={userImage || 'default-image-url'}
                        alt="Usuario"
                        className="rounded-circle me-2"
                        style={{ width: '50px', height: '50px' }}
                    />
                    <span className="username">
                    <Link className="user" to={`/ir-perfil-usuario/${userId}`}>
                        {userName || 'Nombre no disponible'}
                    </Link>
                    </span>
                </div>
                <button className='settings' onClick={toggleMenu}>
                    <i className="fa-solid fa-ellipsis-vertical points"></i>
                </button>
                {/* Menú desplegable */}
                {showMenu && (
                        <ul className="settings-menu" ref={menuRef} >
                            <li><Link to={`/ir-perfil-usuario/${userId}`}>Ir al perfil</Link></li>
                            {/* <li><a href="/enviar-mensaje">Enviar mensaje</a></li>
                            <li><a href="/reportar-usuario">Reportar usuario</a></li>*/}
                        </ul>
                    )}
            </div>
            <div className="row g-0">
                {images.map((img, index) => (
                    <div key={index} className="col-6">
                        <img
                            src={img}
                            className="img-fluid"
                            alt={`Imagen ${index + 1}`}
                            onClick={() => handleImageClick(img)}
                            style={{ cursor: 'pointer', width: '100%' }}
                        />
                    </div>
                ))}
            </div>
            <div className="DogCard-body">
                <div className="dog-details">
                    <p><strong>Nombre:</strong> {texts[1] || 'No disponible'}</p>
                    <p><strong>Estatus:</strong> {texts[2] || 'No disponible'}</p>
                    <p><strong>Características:</strong> {texts[0] || 'No disponible'}</p>
                    <p><strong>Estado:</strong> {texts[3] || 'No disponible'}</p>
                    <p><strong>Ciudad:</strong> {texts[4] || 'No disponible'}</p>
                    <p><strong>Calles:</strong> {texts[5] || 'No disponible'}</p>
                    <p><strong>Razas:</strong> {texts[6] || 'No disponible'}</p>
                    <p><strong>Sexo:</strong> {texts[8] || 'No disponible'}</p>
                </div>
                <div className='button-container'>
                {/*
                <Button variant="primary" className="contact-button"title="Envía un mensaje">
                    <i className="fa-solid fa-envelope"></i> 
                </Button>*/}

                </div>


                {/* Mostrar botones solo si el userType no es 'shelter' */}
               
                {userType !== 'shelter' && (
                    <div className='mark-buttons'>
                    <Button
                      variant="success"
                      onClick={() => handleMarkAsMine(dogId)}
                      disabled={isMarked === true}
                      title="Marcar como mío"
                      className="mx-2"  // Clase para agregar margen
                    >
                      <i className="fa-solid fa-thumbs-up"></i>
                    </Button>
                  
                    <Button
                      style={{ backgroundColor: '#e57373', borderColor: '#e57373' }}
                      onClick={() => handleMarkAsNotMine(dogId)}
                      disabled={isMarked === false}
                      title="No es mío"
                      className="mx-2"  // Clase para agregar margen
                    >
                      <i className="fa-solid fa-thumbs-down"></i>
                    </Button>
                  </div>
                  
                  
                )}
            </div>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                {modalImage && <img src={modalImage} alt="Large view" className="img-fluid" />}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    </div>

    

);
   
};

export default PubDogCard;
