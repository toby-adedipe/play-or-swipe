import "./modal.css";
import StarRatingComponent from 'react-star-rating-component';

const Modal = ({setShowModal, show, title, rating, year, genre, img, synopsis, newRating, setNewRating}) => {
    const showHideClassName = show ? " modal display-block" : "modal display-none";

    const onStarClick = (nextValue, prevValue, name)=>{
        setNewRating(nextValue)
    }

    return (
        <div className={showHideClassName}>
            <div className="modal-main">
                <div className="headerContainer">
                    <p className="h3">Rate this film</p>
                </div>
                <div className="movie-info">
                    <img src={img} alt={title} className="movieArt"/>
                    <div>
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
                        value={newRating}
                        renderStarIcon={()=><ion-icon name="star" id="star-icon"></ion-icon>}
                        starColor={"#EC1F41"}
                        onStarClick={onStarClick}
                        
                    />
                    <button onClick={()=>setShowModal(false)} className="rate-btn">Rate</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;