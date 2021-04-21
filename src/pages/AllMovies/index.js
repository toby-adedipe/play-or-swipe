import { useState } from "react";
import { useEffect } from "react";
import AdminHeader from "../../components/AdminHeader";
import DisplayMovies from "../../containers/DisplayMovies";
import { getAllMovies } from "../../context/actions";

const AllMovies = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true)
    const fetchMovies = async()=>{
      try {
        const res = await getAllMovies()
        if(res.success){
          setMovies(res.data);
        }else{
          setError(res.error)
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    }
    fetchMovies();
  },[]);
  return (
    <>
      <AdminHeader />
      <div className="dashboard">
        <div className="dashboard-container">
          <p>{error && error}</p>
          <p>Here's a list of Approved movies</p>
          {
            loading
            ? <p>Loading Data</p>
            : (
                <div>
                  {
                    movies
                    ? movies.map(movie=><DisplayMovies data={movie} key={movie._id} />)
                    : null
                  }
                </div>
              )
            }
        </div>
      </div>
    </>
  );
};

export default AllMovies;