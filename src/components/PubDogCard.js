import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PubDogCard = ({ images, text, userImage, userName }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [showMenu, setShowMenu] = useState(false); 
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

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]);

    return (
        <div className="container mt-4">
            <div className="DogCard" style={{ width: '18rem'}}>
                {/* Sección del usuario */}
                <div className="user-info">
                    <div className='user-details'>
                        <img
                        src={userImage} // Imagen de perfil del usuario
                        alt="Usuario"
                        className="rounded-circle me-2"
                        style={{ width: '50px', height: '50px' }}
                        />
                        <span className="username">
                            <a className="user" href='/perfil-usaurio'>
                                {userName}
                            </a>
                        </span>
                    </div> 
                    <button className='settings' onClick={toggleMenu}><i className="fa-solid fa-ellipsis-vertical points"></i></button>
                    {/* Menú desplegable */}
                    {showMenu && (
                        <ul className="settings-menu" ref={menuRef}>
                            <li><a href="/perfilusuario">Ir al perfil</a></li>
                            <li><a href="/enviar-mensaje">Enviar mensaje</a></li>
                            <li><a href="/reportar-usuario">Reportar usuario</a></li>
                        </ul>
                    )}
                </div>
                <div className="row g-0">
                    {images.length === 1 && (
                        <div className="col-12">
                            <img
                                src={images[0]}
                                className="img-fluid"
                                alt="Main"
                                onClick={() => handleImageClick(images[0])}
                                style={{ cursor: 'pointer', width: '100%' }}
                            />
                        </div>
                    )}
                    {images.length === 2 && (
                        <div className="row g-0">
                            <div className="col-6">
                                <img
                                    src={images[0]}
                                    className="img-fluid"
                                    alt="Left"
                                    onClick={() => handleImageClick(images[0])}
                                    style={{ cursor: 'pointer', width: '100%' }}
                                />
                            </div>
                            <div className="col-6">
                                <img
                                    src={images[1]}
                                    className="img-fluid"
                                    alt="Right"
                                    onClick={() => handleImageClick(images[1])}
                                    style={{ cursor: 'pointer', width: '100%' }}
                                />
                            </div>
                        </div>
                    )}
                    {images.length === 3 && (
                        <>
                            <div className="col-8">
                                <img
                                    src={images[0]}
                                    className="img-fluid"
                                    alt="Main"
                                    onClick={() => handleImageClick(images[0])}
                                    style={{ cursor: 'pointer', height: '100%' }}
                                />
                            </div>
                            <div className="col-4 d-flex flex-column">
                                <img
                                    src={images[1]}
                                    className="img-fluid mb-2"
                                    alt="Top Right"
                                    onClick={() => handleImageClick(images[1])}
                                    style={{ cursor: 'pointer' }}
                                />
                                <img
                                    src={images[2]}
                                    className="img-fluid"
                                    alt="Bottom Right"
                                    onClick={() => handleImageClick(images[2])}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className="DogCard-body">
                    <p className="DogCard-text">{text}</p>
                    <div className='button-container'>
                        <Button variant="primary contact-button">Enviar mensaje</Button>
                    </div>
                </div>
            </div>

            {/* Modal for showing images */}
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
