import { useEffect, useState } from "react";
import Loader from 'react-loader-spinner';

import './topRated.css';

import Movie from "../../containers/Movie";
import Search from '../../containers/Search';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import { useAuthDispatch, useAuthState } from '../../context';
import { fetchTopMovies, filterTopMovies } from '../../context/actions';

const TopRated = () => {
  const [yearVal, setYearVal] = useState("");
  const [locationVal, setLocationVal] = useState("");
  const [filterOptions, setFilterOptions] = useState(false);
  const [filteredData, setFilteredData] = useState(null);

  const [response, setResponse] = useState(null);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(true);

  const dispatch = useAuthDispatch();
  const {errorMessage} = useAuthState();

  useEffect(()=>{
    const fetchData = async()=>{
      setVisible(true)
      const payload = {
        year: yearVal,
        location: locationVal,  
        page: page,
        limit: "",
        status: "approved",
      }
      let res;
      if(yearVal.length>0||locationVal.length>0){
        res = await filterTopMovies(dispatch, payload);
      }else{
        res = await fetchTopMovies(dispatch, payload);
      }
      if(res.success){
        setResponse(res);
        setFilteredData(res.data);
      } 
      setVisible(false)   
    }
    fetchData();
  }, [dispatch, page, yearVal, locationVal]);

  const submitFilter = async()=>{
    setVisible(true)
    const payload = {
      year: yearVal,
      location: locationVal,
      page,
      limit: "",
      status: "approved",
    }
    const res = await filterTopMovies(dispatch, payload);
    if(res.success){
      setResponse(res);
      console.log(res);
      setFilteredData(res.data);
    } 
    setVisible(false)   
  }

  const getTotalPages = ()=> Math.ceil(response.pagination.total/10);
  
  return (
    <>
      <Header />
      <Search />
      {
        <div className="top-rated-page">
          <div className="top-header-container">
            <p className="top-rated-h1">Top Rated Movies</p>
            <div onClick={()=>setFilterOptions(!filterOptions)}><ion-icon name="filter" id="filter-icon"></ion-icon></div>
          </div>
          {
            filterOptions
            ? <div className="filter-container">
                <div className="filter-options-container">
                  <div className="filter-options">
                    <p>Year: </p>
                    <select onChange={(element)=>setYearVal(element.target.value)} value={yearVal}>
                      <option value="" defaultValue></option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                      <option value="2016">2016</option>
                    </select>
                  </div>
                  <div className="filter-options">
                    <p>Industry: </p>
                    <select onChange={(element)=>setLocationVal(element.target.value)} value={locationVal}>
                      <option value="" defaultValue></option>
                      <option value="nigeria">Nollywood</option>
                      <option value="america">Hollywood</option>
                      <option value="others">Others</option>
                    </select>
                  </div>                
                </div>
                <button className="submit-btn" onClick={submitFilter}>Filter</button>
              </div>
            : null
          }
          <div>
            {
              visible
              ? <div className="top-spinner">
                  <Loader 
                    type="TailSpin"
                    color="#EC1F41"
                    height={40}
                    width={40}
                    visible={visible}
                  />
                </div>
              : filteredData
                ? (
                    <>
                      <p>{errorMessage && errorMessage}</p>
                      <div className="top-rated-movies"> 
                        {
                          filteredData.length>0
                          ?filteredData.map((item)=><Movie key={item._id} data={item}/>)
                          :<p>There are no movies here</p>
                        }
                      </div>
                      <div className="pagination-container">
                        {
                          response
                          ?<Pagination
                            response={response}
                            page={page}
                            setPage={setPage}
                            getTotalPages={getTotalPages}
                          />
                          : null
                        }
                      </div>
                    </>
                  )
                :null
            }
          </div>
        </div>
      }
    </>
  );
};

export default TopRated;