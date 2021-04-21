import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import './AdminHeader.css';

const AdminHeader = () => {
  const location = useLocation();
  const style = {
   color: '#EC1F41', fontWeight: 'bold'
  }
  const active = (link)=> location.pathname === link;

  return (
    <div className="admin-header">
      <Link to='/admin/dashboard' style={active('/admin/dashboard')?style:null}>Home</Link>
      <Link to='/admin/movies' style={active('/admin/movies')?style:null}>Approved Movies</Link>
      <Link to="/admin/pending" style={active('/admin/pending')?style:null}>Pending Movies</Link>
    </div>
  );
};

export default AdminHeader;