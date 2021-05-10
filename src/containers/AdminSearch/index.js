import { useForm } from "react-hook-form";
import { useAuthDispatch } from "../../context";
import { withRouter } from "react-router";
import { useContext, useState } from "react";
import Loader from "react-loader-spinner";

import './search.css'
import { searchAdminMovies } from "../../context/actions";
import AppContext from "../../context/AppContext";

const SearchComp = ({history}) => {
  const { setSearchVal, setResults, page, setResponse } = useContext(AppContext);
  const { register, handleSubmit } = useForm();
  const dispatch = useAuthDispatch();
  const [visible, setVisible] = useState(false);

  const onSubmit = async(data) => {
    setVisible(true)
    let payload = {
      ...data,
      page,
    };
    let res = await searchAdminMovies(dispatch, payload);
    if(res.success){
      setVisible(false)
      setSearchVal(data.search)
      setResults(res.data)
      setResponse(res)
      history.push('/search-results')
    }
    return;
  };

  return (
      <div className="searchContainer">
          <div>
            <form id="search" onSubmit={handleSubmit(onSubmit)}>
              <input 
                placeholder="Search for a movie"
                {...register('search')}
              />
              {
                visible
                ? <Loader 
                    type="TailSpin"
                    color="#EC1F41"
                    height={16}
                    width={16}
                    visible={visible}
                  />
                : <button type="submit" id="search-btn">
                    <ion-icon name="search-outline" id="searchIcon"></ion-icon>
                  </button>
              }
              
            </form>
          </div>
      </div>
  );
};

const AdminSearch = withRouter(SearchComp)
export default AdminSearch;