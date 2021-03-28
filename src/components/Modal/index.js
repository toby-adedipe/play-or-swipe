import "./modal.css";
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";
import { useState } from "react";

const Modal = ({id, setShowModal, show, title, rating, year, genre, img, synopsis, ratingFrequency}) => {
    const showHideClassName = show ? " modal display-block" : "modal display-none";
    const [persRating, setPersRating] = useState(rating);

    const URL = `http://localhost:5000/api/v1/movies/${id}`

    const onStarClick = (nextValue, prevValue, name)=>{
        setPersRating(nextValue);
    }
    const sendRate = async()=>{
        let newRating = (((ratingFrequency*rating)+persRating)/(ratingFrequency+1)).toFixed(2);
        const res = await axios.put(URL, {
            rating: newRating,
            ratingFrequency: ratingFrequency+1,
        })
        console.log(res);
        setShowModal(false);
        console.log(show);
    }

    return (
        <div className={showHideClassName}>
            <div className="modal-main">
                <div className="header-container">
                    <ion-icon name="close-outline" id="close-btn" onClick={()=>setShowModal(false)}></ion-icon>
                    <p className="h3">Rate this film</p>
                </div>
                <div className="movie-info">
                    <img src={img} alt={title} className="movieArt"/>
                    <div className="info-container">
                        <div className="title-container">
                            <p className="movie-title">{title}</p>
                            <p className="movie-genre">{genre} | <span>{year}</span></p>
                            <hr/>
                        </div>
                        <div className="synopsis-container">
                            <p className="synopsis-header">Synopsis</p>
                            <p className="synopsis-content">{synopsis}</p>
                        </div>
                    </div>
                </div>
                <hr className="big-hr"/>
                <div className="rating-container">
                    <StarRatingComponent
                        name="rate"
                        starCount = {5}
                        value={persRating}
                        renderStarIcon={()=><ion-icon name="star" id="star-icon"></ion-icon>}
                        starColor={"#EC1F41"}
                        onStarClick={onStarClick}
                    />
                    <button onClick={sendRate} className="rate-btn">Rate</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;