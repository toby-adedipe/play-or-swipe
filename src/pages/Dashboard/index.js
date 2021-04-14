import React from 'react';
import { withRouter } from 'react-router';
import { logout, useAuthDispatch, } from '../../context';

const DashboardComp = ({history}) => {
  const dispatch = useAuthDispatch();

  const handleLogout = ()=>{
    logout(dispatch)
    history.push('/login')
  }
  return (
    <div>
      Dashboard
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const Dashboard = withRouter(DashboardComp)
export default Dashboard;