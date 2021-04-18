import React from 'react';
import { withRouter } from 'react-router';
import { logout, useAuthDispatch, useAuthState} from '../../context';
import './dashboard.css'
const DashboardComp = ({history}) => {
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  const handleLogout = ()=>{
    logout(dispatch)
    history.push('/login')
  }
  return (
    <div className="dashboard">
      
      <div className="dashboard-container">
        <h3>Welcome {user.user}!!!</h3>
        <p>Here's a list of movies you've rated in the past</p>
        <button onClick={handleLogout} id="logout-btn"> <ion-icon name="exit-outline" id="logout-icon"></ion-icon> Logout</button>
      </div>
    </div>
  );
};

const Dashboard = withRouter(DashboardComp)
export default Dashboard;