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
    <div className="admin-header-container">
      <div className="admin-header">
        <Link to="/">Home</Link>
        <Link to='/admin/dashboard' style={active('/admin/dashboard')?style:null}>Dashboard</Link>
        <Link to='/admin/movies' style={active('/admin/movies')?style:null}>Approved</Link>
        <Link to="/admin/pending" style={active('/admin/pending')?style:null}>Pending</Link>
        <Link to="/admin/add" style={active('/admin/add')?style:null}>Add </Link>
      </div>
    </div>
  );
};

export default AdminHeader;