import "./modal.css";
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";
import { useState } from "react";
import Loader from 'react-loader-spinner'

const Modal = ({data, show, setShowModal}) => {
	const showHideClassName = show ? " modal display-block" : "modal display-none";
	const [persRating, setPersRating] = useState(0);
	const [visible, setVisible] = useState(false);
	const URL = `https://play-or-swipe.herokuapp.com/api/v1/movies/${data._id}`

	const handleClick = (nextValue, prevValue, name)=>{
		setPersRating(nextValue);
	}
	const sendRate = async()=>{
		setVisible(true)
		let newRating = (((data.ratingFrequency*data.rating)+persRating)/(data.ratingFrequency+1)).toFixed(2);
		await axios.put(URL, {
			rating: newRating,
			ratingFrequency: data.ratingFrequency+1,
		})
		setVisible(false)
		setShowModal(false);
	}

    return (
        <div className={showHideClassName}>
				{
					visible
					? <div className="spinner-container">
							<Loader 
								type="TailSpin"
								color="#EC1F41"
								height={40}
								width={40}
								visible={visible}
							/>
						</div>
					:null
				}
					<div className="modal-main">
                <div className="header-container">
                    <ion-icon name="close-outline" id="close-btn" onClick={()=>setShowModal(false)}></ion-icon>
                    <p className="h3">Rate this film</p>
                </div>
                <div className="movie-info">
                    <img src={data.img} alt={data.title} className="movieArt"/>
                    <div className="info-container">
                        <div className="title-container">
                            <p className="movie-title">{data.title}</p>
                            <p className="movie-genre">{data.genre} | <span>{data.year}</span></p>
                            <hr/>
                        </div>
                        <div className="synopsis-container">
                            <p className="synopsis-header">Synopsis</p>
                            <p className="synopsis-content">{data.synopsis}</p>
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
                        onStarClick={handleClick}
                    />
                    <button onClick={sendRate} className="rate-btn">Rate</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;