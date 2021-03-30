import PropTypes from 'prop-types';
import SearchMovie from '../SearchMovie';

const SearchDiv = ({results}) => {
  return (
    <div>
      {
        results.length>0
        ? results.map((item)=><SearchMovie data={item} key={item._id}/>)
        : null
      }
    </div>
  );
};

SearchDiv.defaultProps ={
  results: []
}

SearchDiv.propTypes = {
  results: PropTypes.array.isRequired,
}

export default SearchDiv;