//Home para cuando un usuario inicia sesión

import React from 'react';
import './HomeUser.css';
import PubDogCard from './PubDogCard';

const HomeUser = () => {

    const images = [
        'https://c.pxhere.com/photos/a6/b7/husky_siberian_cute_animal_dog_face_looking_indoor-1089136.jpg!d', // Imagen principal
        'https://imageserve.babycenter.com/22/000/420/TLljxoX77Vu6CQOePXmyESyJolrXadG7_med.jpg',
        'https://www.huskysiberiano10.com/wp-content/uploads/2018/03/como-criar-husky-siberiano.jpg', // Imagen superior derecha
    ];

    const text = "Es un perro de talla grande con un collar azul. Tiene una marca distintiva en una de sus orejas. Es un poco miedoso, así que por favor, trátalo con paciencia y calma si lo ves. Es importante que regrese a casa, así que cualquier información sobre su paradero será muy apreciada.";
    const userName = "Luna Fuentes"
    const userImage = "https://s.cafebazaar.ir/images/icons/br.com.blackmountain.photo.blackwhite-2bef36db-306d-4b35-bdb5-c6170bf54348_512x512.webp"

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
                    <img src="https://editorial.aristeguinoticias.com/wp-content/uploads/2023/06/colonia-dogtores-refugio-perros-puebla-250623-2.jpg" alt="Evento 2" className="event-image" />
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
                    <button type="button" className="btn btn-outline-warning publish-button" >Publicar Mascota</button>
                </div>
                <div className='card-container'>
                    <PubDogCard 
                        images={images} 
                        text= {text}
                        userName= {userName}
                        userImage= {userImage}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeUser;