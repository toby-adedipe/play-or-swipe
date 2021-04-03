import { useState } from 'react';

import './movie.css'
import StarRatingComponent from 'react-star-rating-component';
import Modal from '../Modal';

const Movie = ({ data }) => {
    const [ showModal, setShowModal ] = useState(false);
    
    return (
        <div className="movieContainer" >
            <Modal 
                show={showModal} 
                setShowModal={setShowModal} 
                data={data}
            />
            <div onClick={()=>setShowModal(true)}>
              <img src={data.img} alt={data.title} className="movieArt"/>
              <p className="title">{data.title}</p>
              <div className="ratingContainer">
                <StarRatingComponent
                  name="rate"
                  editing={false}
                  starCount = {5}
                  value={data.rating}
                  starColor={"#EC1F41"}
                />
                <p className="rating">{data.rating}</p>
              </div>
            </div>
        </div>
    );
};

export default Movie;