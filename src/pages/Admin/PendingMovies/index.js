import { useEffect, useState } from 'react';
import AdminHeader from '../../../components/AdminHeader';
import DisplayMovies from '../../../containers/DisplayMovies';
import { useAuthDispatch, useAuthState} from '../../../context';
import { getPendingMovies } from '../../../context/actions';

const PendingMovies = () => {
  const dispatch = useAuthDispatch();
  const {token} = useAuthState();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);


  useEffect(()=>{
    const getMovies = async()=>{
      let payload = {
        token,
      }
      try {
        const res = await getPendingMovies(dispatch, payload)
        if(res.success){
          setMovies(res.data);
        }else{
          setError(res.error)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMovies();
  },[dispatch, token]);

  return (
    <>
      <AdminHeader />
      <div className="dashboard">
        <div className="dashboard-container">
          <p>{error && error}</p>
          <p style={{textAlign: 'center'}}>Here's a list of movies pending your approval</p>
          <div className="display-movies-container">
            {
              movies
              ? movies.map(movie=><DisplayMovies data={movie} key={movie._id} />)
              : null
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingMovies;
