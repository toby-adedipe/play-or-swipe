import AppContext from '../../context/AppContext';
import { useContext, useEffect, useState } from "react";
import Movie from "../../containers/Movie";
import './topRated.css';

import SearchResults from '../SearchResults';
import Search from '../../containers/Search';
import Header from '../../components/Header';
import { fetchTopMovies } from '../../context/actions';
import { useAuthDispatch } from '../../context';
import Loader from 'react-loader-spinner';

const TopRated = () => {
  const { top, searchVal } = useContext(AppContext);
  const [yearVal, setYearVal] = useState("");
  const [response, setResponse] = useState(null);
  const [page, setPage] = useState(1);
  const [locationVal, setLocationVal] = useState("");
  const [filterOptions, setFilterOptions] = useState(false);
  const [filteredData, setFilteredData] = useState(top);
  const [visible, setVisible] = useState(false);
  const dispatch = useAuthDispatch();

  useEffect(()=>{
    const fetchData = async()=>{
      setVisible(true)
      const payload = {
        page: page,
      }
      const res = await fetchTopMovies(dispatch, payload);
      if(res.success){
        setResponse(res);
        setFilteredData(res.data);
      } 
      setVisible(false)   
    }
    fetchData();
  }, [top, dispatch, page]);

  const firstPage = ()=>{
    if(response.pagination.prev){
      setPage(1)
    }
  }
  const prev = ()=>{
    if(response.pagination.prev){
      setPage(response.pagination.prev.page)
    }
  }

  const next = ()=>{
    if(response.pagination.next){
      setPage(response.pagination.next.page)
    }
  }
  const lastPage = ()=>{
    let num = Math.ceil(response.pagination.total/10)
    if(response.pagination.next){
      setPage(num)
    }
  }
  

  const submitFilter = ()=>{
    const dataCopy = top;
    let newData;
    if (yearVal.length === 0 && locationVal.length > 0) {
      newData = dataCopy.filter((item)=>{
        return item.location === locationVal;
      })
    }else if (locationVal.length === 0 && yearVal.length > 0){
      newData = dataCopy.filter((item)=>{
        return item.year === yearVal;
      })
    } else if (locationVal.length > 0 && yearVal.length > 0){
      newData = dataCopy.filter((item)=>{
        return item.year === yearVal && item.location === locationVal;
      })
    }else{
      newData = top;
    }
    setFilteredData(newData);
  }

  return (
    <>
      <Header />
      <Search />
      {
        searchVal.length>0
        ? <SearchResults />
        : <div className="top-rated-page">
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
                filteredData
                ? (
                    <>
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
                      : <div className="top-rated-movies"> 
                          {filteredData.map((item)=> 
                            <Movie key={item._id} data={item}/>)}
                        </div>
                    }{
                      response.pagination
                      ?<div className="pagination">
                        <div className="back-btns">
                          <button onClick={firstPage} className="prev-btn" disabled={!response.pagination.prev}>
                            <ion-icon name="play-back"></ion-icon>
                          </button>
                          <button onClick={prev} className="prev-btn" disabled={!response.pagination.prev}>
                          <ion-icon name="caret-back"></ion-icon>
                            Prev
                          </button> 
                        </div>
                        <p>{page}</p>
                        <div className="forward-btns">
                          <button onClick={next} className="next-btn" disabled={!response.pagination.next}>
                            Next
                            <ion-icon name="caret-forward"></ion-icon>
                          </button>
                          <button onClick={lastPage} className="next-btn" disabled={!response.pagination.next}>
                            <ion-icon name="play-forward"></ion-icon>
                          </button>
                        </div>
                      </div>
                      : null
                    }
                    </>
                  )
                :<p>Fetching movies...</p>
              }
            </div>
          </div>
        }
    </>
  );
};

export default TopRated;