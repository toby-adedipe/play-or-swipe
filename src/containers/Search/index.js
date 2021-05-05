import { useForm } from "react-hook-form";
import { useAuthDispatch } from "../../context";
import { withRouter } from "react-router";
import { useContext } from "react";

import './search.css'
import { searchMovies } from "../../context/actions";
import AppContext from "../../context/AppContext";

const SearchComp = ({history}) => {
  const { setSearchVal, setResults, page, setResponse } = useContext(AppContext);
  const { register, handleSubmit } = useForm();
  const dispatch = useAuthDispatch();

  const onSubmit = async(data) => {
    let payload = {
      ...data,
      page,
    };
    let res = await searchMovies(dispatch, payload);
    if(res.success){
      setSearchVal(data.search)
      setResults(res.data)
      setResponse(res)
      history.push('/search')
    }
    return
  };

  return (
      <div className="searchContainer">
          <div>
            <form id="search" onSubmit={handleSubmit(onSubmit)}>
              <input 
                placeholder="Search for a movie"
                {...register('search')}
              />
              <button type="submit" id="search-btn">
                <ion-icon name="search-outline" id="searchIcon"></ion-icon>
              </button>
            </form>
          </div>
      </div>
  );
};

const Search = withRouter(SearchComp)
export default Search;