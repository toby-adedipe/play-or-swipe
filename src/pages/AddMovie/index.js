import axios from 'axios';
import { useState } from 'react';
import { storage } from '../../firebase';
import StarRatingComponent from 'react-star-rating-component';

import './addMovie.css';
import { URL } from '../../config/url';
import Header from '../../components/Header';

const AddMovie = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleClick = (nextValue, prevValue, name)=>{
		setRating(nextValue);
	}

  const handleChange = e =>{
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }
  }

  
  const resetInput = ()=>{
    setImage(null);
    setTitle("");
    setYear("");
    setGenre("");
    setSynopsis("");
    setError(null);
    setLocation("");
    setSuccess("Movie was successfully uploaded!!!")
    setLoading(false)
  }

  const handleUpload = ()=>{
    setLoading(true);
    if(title.length < 1){
      setError("Add a movie title")
      setLoading(false)
    }else if(!image){
      setError("Forgot to add an image?")
      setLoading(false)
    }else if(location.length< 1){
      setError("Please include a location")
      setLoading(false)
    }else{
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error =>{
          console.log(error);
        },
        ()=>{
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(async(url) => {
              const postInfo = async()=>{
                const res = await axios.post(`${URL}/movies`, {
                  title,
                  year,
                  genre,
                  synopsis,
                  location,
                  img: url,
                  rating: rating,
                  ratingFrequency: 0,
                })
                if(res.status === 200){
                  resetInput();
                }
              }
              postInfo();
            })
        }
      )
    }

  };

  const handleTitleInput= (val)=>{
    setTitle(val);
    setError(null);
    setSuccess(null)
  }

  return (
    <div className="add-page">
    {
      loading
      ? <p>Uploading Information...</p>
      : <div className="add-form">
        {
          error
          ? <p className="error">{error}</p>
          : null
        }
        {
          success
          ? <p className="success">{success}</p>
          : null
        }
        <Header />
        <h3>Add a movie</h3>
        <div className="title-group">
          <div className="form-group title-container">
            <label>Name of Movie</label>
            <input type="text" onChange={(e)=>handleTitleInput(e.target.value)} value={title} className="title-input" />
          </div>
          <div className="form-group year-container">
            <label>Release Date</label>
            <input type="text" onChange={(e)=>setYear(e.target.value)} value={year} className="year-input" />
          </div>
        </div>
        <div className="genre-location-group">
          <div className="form-group genre-container">
            <label>Genre</label>
            <input type="text" onChange={(e)=>setGenre(e.target.value)} value={genre} className="genre-input" />
          </div>
          <div className="form-group location-container">
            <label>Location</label>
            <select onChange={(element)=>setLocation(element.target.value)} value={location}>
              <option value="" defaultValue></option>
              <option value="nigeria" >Nigeria</option>
              <option value="america">America</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Synopsis</label>
          <textarea  onChange={(e)=>setSynopsis(e.target.value)} value={synopsis} rows="4" column="50"/>
        </div>
        <div className="image-file">
          <label>Upload Image</label>
          <input type="file" onChange={handleChange} />
        </div>
        <div className="star-rating-container">
          <p>Rate the movie: </p>
          <StarRatingComponent
            name="rate"
            starCount = {5}
            value={rating}
            renderStarIcon={()=><ion-icon name="star" id="star-icon"></ion-icon>}
            starColor={"#EC1F41"}
            onStarClick={handleClick}
          />
        </div>
        <button onClick={handleUpload} className="submit-btn">submit</button>
      </div>
    }
    </div>
  );
};

export default AddMovie;