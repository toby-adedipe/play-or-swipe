import { useState } from 'react';

import './movie.css'
import StarRatingComponent from 'react-star-rating-component';
import Modal from '../Modal';

const Movie = ({ img, title, rating, genre, year, synopsis, }) => {
    const [ showModal, setShowModal ] = useState(false);
    const [ newRating, setNewRating ] = useState(rating);
    
    return (
        <div>
            <Modal 
                show={showModal} 
                setShowModal={setShowModal} 
                img={img} 
                title={title} 
                genre={genre}
                year={year}
                synopsis={synopsis}
                rating={rating}
                newRating={newRating}
                setNewRating={setNewRating}
            />
            <div className="movieContainer" onClick={()=>setShowModal(true)}>
            <img src={img} alt={title} className="movieArt"/>
            <p className="title">{title}</p>
            <div className="ratingContainer">
                <StarRatingComponent
                    name="rate"
                    editing={false}
                    starCount = {5}
                    value={newRating}
                    starColor={"#EC1F41"}
                />
                <p className="rating">{newRating}</p>
            </div>
            </div>
        </div>
    );
};

export default Movie;