import "./modal.css";
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";
import { useState, useContext } from "react";
import Loader from 'react-loader-spinner'
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import { URL } from "../../config/url";

const Modal = ({data, show, setShowModal}) => {
	const showHideClassName = show ? " modal display-block" : "modal display-none";
	const [persRating, setPersRating] = useState(0);
	const [share, setShare] = useState(false);
	const [visible, setVisible] = useState(false);

	const { currentCookie } = useContext(AppContext);

	const handleClick = (nextValue, prevValue, name)=>{
		setPersRating(nextValue);
	}

	const sendRate = async()=>{
		setVisible(true)
		let newRating = (((data.ratingFrequency*data.rating)+persRating)/(data.ratingFrequency+1)).toFixed(2);
		try{
			await axios.put(`${URL}/movies/${data._id}`, {
				rating: newRating,
				ratingFrequency: data.ratingFrequency+1,
				cookieToken: currentCookie,
			})
			setShare(true);
		}catch(error){
			//HANDLE THIS ERROR
			console.log(error);
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
									href={"http://twitter.com/share?url=https://fervent-noyce-1eb50f.netlify.app/&amp;text=I+gave+"+data.title+"+a+rating+of+"+persRating+"+Rate+It+Here?&amp;"} target="_blank" rel="noreferrer">
									<div className="twitter-container">
										<ion-icon name="logo-twitter" id="twitter-logo"></ion-icon>
										<div className="twitter">
											<p>Twitter</p>
										</div>
									</div>
								</a>
								{/* <div className="facebook-container">
									<ion-icon name="logo-facebook" id="facebook-logo"></ion-icon>
									<div className="facebook">
										<p> Facebook</p>
									</div>
								</div> */}
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