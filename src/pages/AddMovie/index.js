import axios from 'axios';
import { useState } from 'react';
import { storage } from '../../firebase';

import './addMovie.css';

const AddMovie = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = e =>{
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }
  }

  const URL = "http://localhost:5000/api/v1/movies"

  const resetInput = ()=>{
    setImage(null);
    setTitle("");
    setYear("");
    setGenre("");
    setSynopsis("");
    setError(null)
    setSuccess("Movie was successfully uploaded!!!")
    setLoading(false)
  }

  const handleUpload = ()=>{
    setLoading(true);
    if(title < 1){
      setError("Add a movie title")
    }else if(!image){
      const postInfo = async()=>{
        const res = await axios.post(URL, {
          title,
          year,
          genre,
          synopsis,
        })
        if(res.status === 200){
          resetInput();
        }
      }
      postInfo();
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
                const res = await axios.post(URL, {
                  title,
                  year,
                  genre,
                  synopsis,
                  img: url,
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
    <div>{
      loading
      ? <p>Uploading Information...</p>
      :       <div className="add-form">
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
        <div className="form-group genre-container">
          <label>Genre</label>
          <input type="text" onChange={(e)=>setGenre(e.target.value)} value={genre} className="genre-input" />
        </div>
        <div className="form-group">
          <label>Synopsis</label>
          <textarea  onChange={(e)=>setSynopsis(e.target.value)} value={synopsis} rows="4" column="50"/>
        </div>
        <div className="image-file">
          <label>Upload Image</label>
          <input type="file" onChange={handleChange} />
        </div>
        <button onClick={handleUpload} className="submit-btn">submit</button>
      </div>
    }
    </div>
  );
};

export default AddMovie;