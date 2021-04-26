import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import AdminHeader from '../../../components/AdminHeader';
import DisplayMovies from '../../../containers/DisplayMovies';
import { logout, useAuthDispatch, useAuthState} from '../../../context';
import { getPendingMovies } from '../../../context/actions';

const AdminDashboardComponent = ({history}) => {
  const dispatch = useAuthDispatch();
  const {user, token} = useAuthState();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  
  const handleLogout = ()=>{
    logout(dispatch)
    history.push('/login')
  }

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
          <h3>Welcome {user}!!!</h3>
          <p>{error && error}</p>
          <p>Here's a list of movies pending your approval</p>
          <div>
            {
              movies
              ? movies.map(movie=><DisplayMovies data={movie} key={movie._id} />)
              : null
            }
          </div>
          <button onClick={handleLogout} id="logout-btn"> <ion-icon name="exit-outline" id="logout-icon"></ion-icon> Logout</button>
        </div>
      </div>
    </>
  );
};

const AdminDashboard = withRouter(AdminDashboardComponent);
export default AdminDashboard;