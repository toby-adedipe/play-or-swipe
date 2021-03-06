import { useEffect, useState } from 'react';
import Loader from "react-loader-spinner";

import AdminHeader from '../../../components/AdminHeader';
import DisplayMovies from '../../../containers/DisplayMovies';
import { useAuthDispatch, useAuthState} from '../../../context';
import { fetchAllMovies } from '../../../context/actions';
import Pagination from "../../../components/Pagination";
import AdminSearch from '../../../containers/AdminSearch';

const PendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(true);

  const dispatch = useAuthDispatch();
  const {user, token, errorMessage} = useAuthState();

  useEffect(()=>{
    setVisible(true);
    const getMovies = async()=>{
      let payload = {
        token,
        page,
        status: 'pending'
      }
      const res = await fetchAllMovies(dispatch, payload);
      if(res.success){
        setResponse(res);
        setMovies(res.data);
      }else{
        setError(res.error)
      }
      setVisible(false);
    }
    getMovies();
  },[dispatch, token, page]);

  const getTotalPages = ()=> Math.ceil(response.pagination.total/10);

  return (
    <>
      <AdminHeader />
      <AdminSearch />
      <div className="dashboard">
        <div className="dashboard-container">
          <h3>Welcome {user}!!!</h3>
          <p>Here's a list of movies pending your approval</p>
          {
            visible
            ?<div className="top-spinner">
                <Loader 
                  type="TailSpin"
                  color="#EC1F41"
                  height={40}
                  width={40}
                  visible={visible}
                />
              </div>
            :(
              <>
                <p>{(error && error)||(errorMessage && errorMessage)}</p>
                <div className="pending-movies-container">
                  {
                    movies
                    ? movies.map(movie=><DisplayMovies data={movie} key={movie._id} />)
                    : null
                  }
                </div>
                {
                  response
                    ?<Pagination
                      response={response}
                      page={page}
                      setPage={setPage}
                      getTotalPages={getTotalPages}
                    />
                  : null
                  }
              </>
            )
          }
        </div>
      </div>
    </>
  );
};

export default PendingMovies;
