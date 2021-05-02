import StarRatingComponent from 'react-star-rating-component';
import { useState, useContext } from "react";
import Loader from 'react-loader-spinner'
import { Link } from "react-router-dom";

import "./modal.css";

import AppContext from "../../context/AppContext";
import { useAuthState, useAuthDispatch } from "../../context";
import { updateUser } from "../../context/actions";

const Modal = ({data, show, setShowModal}) => {
	const [persRating, setPersRating] = useState(0);
	const [share, setShare] = useState(false);
	const [visible, setVisible] = useState(false);
	const [error, setError] = useState(null);

	const dispatch = useAuthDispatch();
	const { userId, token } = useAuthState();
	const { currentCookie } = useContext(AppContext);

	const showHideClassName = show ? " modal display-block" : "modal display-none";

	const handleClick = (nextValue, prevValue, name)=>{
		setPersRating(nextValue);
	}

	const sendRate = async()=>{
		setVisible(true)
		let newRating = (((data.ratingFrequency*data.rating)+persRating)/(data.ratingFrequency+1)).toFixed(2);

		let payload = {
			ratingFrequency: data.ratingFrequency+1,
			cookieToken: currentCookie,
			movieId: data._id,
			rating: newRating,
			token,
			userId,
		}

		let res = await updateUser(dispatch, payload);
		if(res.success){
			setShare(true)
		}else{
			setError(res.error)
		}
		setVisible(false)
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
			{
				!share
				?(
					<div className="modal-main">
						<div className="header-container">
							<ion-icon name="close-outline" id="close-btn" onClick={()=>setShowModal(false)}></ion-icon>
								<p className="h3">Rate this film</p>
						</div>
						<p className="error">{error && error}</p>
						<div className="movie-info">
							<Link to={`/movies/${data._id}`}><img src={data.img} alt={data.title} className="movieArt"/></Link>
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
				):(
					<div className="modal-main">
						<div className="header-container">
							<ion-icon name="close-outline" id="close-btn" onClick={()=>setShowModal(false)}></ion-icon>
								<p className="h3">Share your rating</p>
						</div>
						<div className="movie-info">
							<img src={data.img} alt={data.title} className="movieArt"/>
							<div className="info-container">
								<div className="rating-container">
									<StarRatingComponent
										name="rate"
										starCount = {5}
										value={persRating}
										renderStarIcon={()=><ion-icon name="star" id="share-star-icon"></ion-icon>}
										starColor={"#EC1F41"}
									/>
								</div>
								<p className="share-p">Share on:</p>
								<a 
									href={`https://twitter.com/intent/tweet?hashtags=${data.title}&hashtags=movies&original_referer=https%3A%2F%2Fplayorswipe%2F&ref_src=twsrc%5Etfw&text=I%20just%20gave%20${data.title}%20a%20rating%20of%20${persRating}%2C%20what%20do%20you%20think%3F&tw_p=tweetbutton&url=https%3A%2F%2Fplayorswipe.com&via=PlayOrSwipe`} target="_blank" rel="noreferrer">
									<div className="twitter-container">
										<ion-icon name="logo-twitter" id="twitter-logo"></ion-icon>
										<div className="twitter">
											<p>Twitter</p>
										</div>
									</div>
								</a>
								<div className="share-p">
									<p>Or Leave a comment</p>
									<Link to={`/movies/${data._id}`}><button className="submit-btn">Comment</button></Link>
								</div>
							</div>
						</div>
					</div>
				)
			}
		</div>
	);
};

export default Modal;