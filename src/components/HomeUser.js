//Home para cuando un usuario inicia sesión

import React from 'react';
import './HomeUser.css';
import PubDogCard from './PubDogCard';

const HomeUser = () => {

    const images = [
        'https://www.infobae.com/new-resizer/Zi-z-Gb1A5Barig2D4iG_wVMblA=/1200x1200/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/YB6ALQWUQBB3LDJ6SCXGIK3224.jpg', // Imagen principal
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTYsw9QW3-LbeBGHDTe5vCaVOfePMHLvpb1Q&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3h3lw6f-d85hI2XAqYx8WTOWDqitAu9VzdfRlIidzioVjVfM7g8AJSAU0VCCFHB5DcM8&usqp=CAU', // Imagen superior derecha
    ];

    const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley";
    const userName = "Juan Perez"
    const userImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkg2EL6OenMycHAe49e2KKyLG7Tguoqz9wxkJFqOOA1H2l6QuQA9-BxcE5RPQ7ALa-mI&usqp=CAU"

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