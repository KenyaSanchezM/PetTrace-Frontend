import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const PubDogCard = ({ images, texts, userImage, userName, dogId }) => {
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

    const handleMarkAsMine = async () => {
        try {
            await axios.post(`http://localhost:8000/api/mark-dog/${dogId}/`, { is_marked: true });
            setIsMarked(true);
        } catch (error) {
            console.error('Error al marcar como "Es mi mascota":', error);
        }
    };

    const handleMarkAsNotMine = async () => {
        try {
            await axios.post(`http://localhost:8000/api/mark-dog/${dogId}/`, { is_marked: false });
            setIsMarked(false);
        } catch (error) {
            console.error('Error al marcar como "No es mi mascota":', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="DogCard" style={{ width: '18rem' }}>
                <div className="user-info">
                    <div className='user-details'>
                        <img
                            src={userImage || 'default-image-url'}
                            alt="Usuario"
                            className="rounded-circle me-2"
                            style={{ width: '50px', height: '50px' }}
                        />
                        <span className="username">
                            <a className="user" href='/perfil-usuario'>
                                {userName || 'Nombre no disponible'}
                            </a>
                        </span>
                    </div> 
                    <button className='settings' onClick={toggleMenu}><i className="fa-solid fa-ellipsis-vertical points"></i></button>
                    {showMenu && (
                        <ul className="settings-menu" ref={menuRef}>
                            <li><a href="/perfilusuario">Ir al perfil</a></li>
                            <li><a href="/enviar-mensaje">Enviar mensaje</a></li>
                            <li><a href="/reportar-usuario">Reportar usuario</a></li>
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
                        <p><strong>Estatus:</strong> {texts[2] || 'No disponible'}</p>
                        <p><strong>Nombre:</strong> {texts[1] || 'No disponible'}</p>
                        <p><strong>Características:</strong> {texts[0] || 'No disponible'}</p>
                        <p><strong>Ubicación:</strong> {texts[3] || 'No disponible'}</p>
                        <p><strong>Razas:</strong> {texts[4] || 'No disponible'}</p>
                    </div>
                    <div className='button-container'>
                        <Button variant="primary" className="contact-button">Enviar mensaje</Button>
                    </div>
                    <div className='mark-buttons'>
                        <Button variant="success" onClick={handleMarkAsMine} disabled={isMarked === true}>
                            Es mi mascota
                        </Button>
                        <Button variant="danger" onClick={handleMarkAsNotMine} disabled={isMarked === false}>
                            No es mi mascota
                        </Button>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                </Modal.Header>
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
