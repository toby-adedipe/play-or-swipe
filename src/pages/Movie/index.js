import axios from "axios";
import { useEffect, useState  } from "react";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import { URL } from "../../config/url";
import { useAuthState } from "../../context";
import './movie.css';

const Movie = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {id} = useParams();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState(null);
  const user = useAuthState();

    const onSubmit = async(movie) => {
    let config = {
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json",
        "Accept": "*/*"
      }
    }

    let payload = {
      ...movie,
      user: user.userId,
      userName: user.user,
      movie: id,
    }
    try {
      let res = await axios.post(`${URL}/movies/${id}/reviews`, payload, config);
      if(res.movie.success){
        window.location.reload(false)
      }
    }catch (error) {
      setError(error.response.movie.error)
    }
  }; 
  useEffect(()=>{
    const fetchMovie = async()=>{
      setVisible(true)
      try{
        const movies = await axios.get(`${URL}/movies/${id}`)
        const reviews = await axios.get(`${URL}/movies/${id}/reviews`)
        if(movies.data.success){
          setMovie(movies.data.data)
        }
        if(reviews.data.success){
          setReviews(reviews.data.data)
        }
        return
      }catch(error){
        //setError(error.response.movie.error)
        console.log(error)
      }
      setVisible(false);
    };
    fetchMovie();
  }, [id]);

  return (
    <div className="movie-page">
    {
      error
      ?<p>{error}</p>
      : movie===null
        ?<div className="spinner-container">
            <Loader 
              type="TailSpin"
              color="#EC1F41"
              height={40}
              width={40}
              visible={visible}
            />
          </div>
        :(
          <div>
          <div >
            <div className="search-container">
              <div className="art-container">
                <img 
                  src={movie.img}
                  alt={movie.title}
                  className="search-results-image"
                />
              </div>
              <div className="search-movie-info">
                <p className="movie-title search-title">{movie.title} ({movie.year})</p>
                <p className="search-synopsis">{movie.synopsis}</p>
                <div className="search-rating-container">
                  <StarRatingComponent
                    name="rate"
                    editing={false}
                    starCount = {5}
                    value={movie.rating}
                    starColor={"#EC1F41"}
                  />
                  <p className="rating">{movie.rating}</p>
                </div>
              </div>
            </div>
          </div>
            <div>
            {
              reviews
              ? <div className="reviews-container">
                  <h3>Reviews</h3>
                  {reviews.map(item=>(
                    <div 
                      key={item._id}
                      className="reviews">
                      <img 
                        alt="avatar"
                        src={`https://ui-avatars.com/api/?color=ff0000&name=${item.userName.split(" ")[0]}+${item.userName.split(" ").length>1 ?item.userName.split(" ")[1] : " "}`}
                        className="review-avatar"
                      />
                      <div>
                        <p><b>{item.userName}</b></p>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              :null
            }
            
            </div>
            <form onSubmit={()=>handleSubmit(onSubmit)} className="review-form">
              <p>Leave a review {errors.password && <span className="error-message">Dont forget to add your password.</span>}</p>
              <textarea 
                name="text"
                className="year-input"
                type="text"
                {...register('text', { required: true })}
                cols="50"
                rows="6"
              />
              {
                !user.token
                ? <div>
                    <p>You have to login or sign up to post a review</p>
                    <div className="authbtn-container">
                      <Link to="/signup"><button className="signup-btn">Sign Up</button></Link>
                      <Link to="/login"><button className="login-btn">Log In</button></Link>
                    </div>
                </div>
              : <input type="submit" className={"submit-btn"} disabled={!user.token?true:false}/>
              }
            </form>            
          </div>
        )
    }
    </div>
  );
}

export default Movie;