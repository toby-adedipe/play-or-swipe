import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useParams } from 'react-router';
import AdminHeader from '../../components/AdminHeader';
import Form from '../../components/Form';
import { URL } from '../../config/url';
import { useAuthDispatch, useAuthState } from '../../context';
import { getMovie } from '../../context/actions';
import { storage } from '../../firebase';

import './AdminMovie.css';

const AdminMovie = () => {
  const {id} = useParams();
  const dispatch = useAuthDispatch();
  const { token, loading } = useAuthState();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(()=>{
    const fetchMovie = async()=>{
      const payload = {
        token,
        id,
      }
      try{
        const res = await getMovie(dispatch, payload)
        if(res.success){
          setMovie(res.data);
        }else{
          console.log(res);
          //setError(res.error)
        }
      }catch(error){
        console.log(error);
      }
    }
    fetchMovie();
  }, [dispatch, token, id])

  async function updateMovie(dispatch, payload){

    let config = {
      headers: {
        "Authorization": `Bearer ${payload.token}`,
        "Content-Type": "application/json",
        "Accept": "*/*"
      }
    }
    
    try{
      if(payload.image.length>0){
        const image = payload.image[0];
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
                  const res = await axios.put(`${URL}/admin/movies/${payload.id}`, {
                    title: payload.title,
                    year: payload.year,
                    genre: payload.genre,
                    synopsis: payload.synopsis,
                    location: payload.location,
                    img: url,
                    rating: payload.rating,
                    status: payload.status,
                    ratingFrequency: payload.ratingFrequency,          
                  },  config);
                  if(res.data.success){
                    setSuccess(true)
                    setUpdating(false)
                  }else{
                    setSuccess(false)
                    setUpdating(false)
                  }
                }
                postInfo();
              })
          })
      }else{
        const res = await axios.put(`${URL}/admin/movies/${payload.id}`, {
          title: payload.title,
          year: payload.year,
          genre: payload.genre,
          synopsis: payload.synopsis,
          location: payload.location,
          rating: payload.rating,
          status: payload.status,
          ratingFrequency: payload.ratingFrequency,
        },  config)
        if(res.data.success){
          setSuccess(true)
          setUpdating(false)
        }else{
          setSuccess(false)
          setUpdating(false)
        }
      }
    }catch(error){
      setError(error.response.data.error);
      setUpdating(false)
    }
  }

  const onSubmit = async(data)=>{
    setUpdating(true)
    const payload = {
      ...data,
      token,
      id,
    };

    updateMovie(dispatch, payload)
    // try {
    //   await updateMovie(dispatch, payload)
    //   setUpdating(false)
    // } catch (error) {
    //   setUpdating(false)
    //   setError(error);
    // }
  }
  return (
    <>
      <AdminHeader />
      <div className="edit-page">
      {
        loading
        ? <div className="loader-container">
            <Loader 
              type="TailSpin"
              color="#EC1F41"
              height={40}
              width={40}
              visible={loading}
            />
          </div>
        :error
          ?<p>An error occured</p>
          :movie
            ? <div>
                <h3>Edit {movie.title}</h3>
                {
                  success
                  ? <p className="success">Movie successfully updated</p>
                  : null
                }
                <Form data={movie} token={token} onSubmit={onSubmit} status={updating}/>
              </div>
            : null 
      }
      </div>
    </>
  );
};

export default AdminMovie;