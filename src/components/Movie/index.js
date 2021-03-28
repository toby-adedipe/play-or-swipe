import { useState } from 'react';

import './movie.css'
import StarRatingComponent from 'react-star-rating-component';
import Modal from '../Modal';

const Movie = ({ id, img, title, rating, genre, year, synopsis, ratingFrequency}) => {
    const [ showModal, setShowModal ] = useState(false);
    
    console.log(showModal);
    return (
        <div className="movieContainer" onClick={()=>setShowModal(true)}>
            <Modal 
                show={showModal} 
                setShowModal={setShowModal} 
                id={id}
                img={img} 
                title={title} 
                genre={genre}
                year={year}
                synopsis={synopsis}
                rating={rating}
                ratingFrequency={ratingFrequency}
            />
            <div>
              <img src={img} alt={title} className="movieArt"/>
              <p className="title">{title}</p>
              <div className="ratingContainer">
                <StarRatingComponent
                  name="rate"
                  editing={false}
                  starCount = {5}
                  value={rating}
                  starColor={"#EC1F41"}
                />
                <p className="rating">{rating}</p>
              </div>
            </div>
        </div>
    );
};

export default Movie;