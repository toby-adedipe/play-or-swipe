import { useState, useEffect } from 'react';
import axios from 'axios';

import { useAuthDispatch, useAuthState } from '../../../context';
import AddForm from '../../../components/AddForm';
import { getCurrentUser } from '../../../context/actions';
import { storage } from '../../../firebase';
import { URL } from '../../../config/url';
import AdminHeader from '../../../components/AdminHeader';

const AdminAdd = () => {
  const dispatch = useAuthDispatch();
  const [error, setError] = useState(null);
  const { token } = useAuthState();
  const [rating, setRating] = useState(0);
  const [ratingFrequency, setRatingFrequency] = useState(0);
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(()=>{
    let payload = {
      token,
    }
    const getMe = async()=>{
      try{
        let res = await getCurrentUser(dispatch, payload);
        if(res.success){
          setStatus(res.data.role);
        }
      }catch(error){
        setStatus('anon')
      }
    }
    getMe();
  }, [dispatch, token]);

  const handleClick = (nextValue, prevValue, name)=>{
		setRating(nextValue);
    setRatingFrequency(1);
	}

  async function addMovie(dispatch, payload){

    let config = {
      headers: {
        "Authorization": `Bearer ${payload.token}`,
        "Content-Type": "application/json",
        "Accept": "*/*"
      }
    }
    const isAdmin = payload.status === 'admin';
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
                  const res = await axios.post(`${URL}/admin/movies`, {
                    title: payload.title,
                    year: payload.year,
                    genre: payload.genre,
                    synopsis: payload.synopsis,
                    location: payload.location,
                    img: url,
                    rating: payload.rating,
                    status: isAdmin?'approved':'pending',
                    ratingFrequency: payload.ratingFrequency,          
                  },  config);
                  if(res.data.success){
                    setSuccess(true)
                    setLoading(false)
                  }else{
                    setSuccess(false)
                    setLoading(false)
                  }
                }
                postInfo()
              })
          })
      }else{
        const res = await axios.post(`${URL}/admin/movies`, {
          title: payload.title,
          year: payload.year,
          genre: payload.genre,
          synopsis: payload.synopsis,
          location: payload.location,
          rating: payload.rating,
          status: isAdmin?'approved':'pending',
          ratingFrequency: payload.ratingFrequency,
        },  config)
        if(res.data.success){
          setSuccess(true)
          setLoading(false)
        }else{
          setSuccess(false)
          setLoading(false)
        }
      }
    }catch(error){
      setError(error.response.data.error);
      setLoading(false)
    }
  }

  const onSubmit = async(data, e)=>{
    setLoading(true)
    const payload = {
      ...data,
      token,
      status,
      rating,
      ratingFrequency,
    };
    addMovie(dispatch, payload)
    e.target.reset();
  }

  return (
    <>
      <AdminHeader />
      <div className="add-page">
      {
        <div className="add-form">
          {
            error
            ? <p className="error">{error}</p>
            : null
          }
          {
            success
            ? <p className="success">Movie successfully added</p>
            : null
          }
          <h3>Add a movie</h3>
          <AddForm
            onSubmit={onSubmit} 
            status={loading} 
            handleClick={handleClick}
            rating={rating}
          />
        </div>
      }
      </div>
    </>
  );
};

export default AdminAdd;