import PropTypes from 'prop-types';
import AdminSearchMovie from '../AdminSearchMovie';

const AdminSearchDiv = ({results}) => {
  return (
    <div>
      {
        results.length>0
        ? results.map((item)=><AdminSearchMovie data={item} key={item._id}/>)
        : null
      }
    </div>
  );
};

AdminSearchDiv.defaultProps ={
  results: []
}

AdminSearchDiv.propTypes = {
  results: PropTypes.array.isRequired,
}

export default AdminSearchDiv;