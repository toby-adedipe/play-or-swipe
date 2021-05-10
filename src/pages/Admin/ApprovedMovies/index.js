import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import './Approved.css';

import AdminHeader from "../../../components/AdminHeader";
import DisplayMovies from "../../../containers/DisplayMovies";
import { useAuthDispatch, useAuthState } from '../../../context';
import { fetchAllMovies } from "../../../context/actions";
import Pagination from "../../../components/Pagination";
import AdminSearch from "../../../containers/AdminSearch";

const ApprovedMovies = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [page, setPage] = useState(1);

  const dispatch = useAuthDispatch();
  const {errorMessage} = useAuthState();

  useEffect(()=>{
    setLoading(true)
    const fetchMovies = async()=>{
      const payload ={
        page,
        status: "approved"
      }
      const res = await fetchAllMovies(dispatch, payload);
      if(res.success){
        setResponse(res);
        setMovies(res.data);
      } 
      setLoading(false)
    }
    fetchMovies();
  },[dispatch, page]);

  const getTotalPages = ()=> Math.ceil(response.pagination.total/10);

  return (
    <>
      <AdminHeader />
      <div className="dashboard">
        <AdminSearch />
        <div className="dashboard-container">
          <p style={{textAlign: 'center'}}>Here's a list of Approved movies</p>
          {
            loading
            ? <div className="top-spinner">
                <Loader 
                  type="TailSpin"
                  color="#EC1F41"
                  height={40}
                  width={40}
                  visible={loading}
                />
              </div>
            : (
                <>
                  <p>{errorMessage && errorMessage}</p>
                  <div className="display-movies-container">
                    {
                      movies
                      ? movies.map(movie=><DisplayMovies data={movie} key={movie._id} />)
                      : <p>There are no movies here</p>
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

export default ApprovedMovies;