import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useParams } from 'react-router';
import Form from '../../components/Form';
import { useAuthDispatch, useAuthState } from '../../context';
import { getMovie, updateMovie } from '../../context/actions';

import './AdminMovie.css';

const AdminMovie = () => {
  const {id} = useParams();
  const dispatch = useAuthDispatch();
  const { token, loading } = useAuthState();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
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


  const onSubmit = async(data)=>{
    setUpdating(true)
    const payload = {
      ...data,
      token,
      id,
    };

    try {
      await updateMovie(dispatch, payload)
      setUpdating(false)
    } catch (error) {
      setUpdating(false)
      setError(error);
    }
  }
  return (
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
              <Form data={movie} token={token} onSubmit={onSubmit} status={updating}/>
            </div>
          : null 
    }
    </div>
  );
};

export default AdminMovie;