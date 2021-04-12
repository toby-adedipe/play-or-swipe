import AppContext from '../../context/AppContext';
import { useContext, useEffect, useState } from "react";
import Movie from "../../components/Movie";
import './topRated.css';

import SearchResults from '../SearchResults';
import Search from '../../components/Search';

const TopRated = () => {
  const { top, searchVal } = useContext(AppContext);
  const [yearVal, setYearVal] = useState("");
  const [locationVal, setLocationVal] = useState("");
  const [filterOptions, setFilterOptions] = useState(false);
  const [filteredData, setFilteredData] = useState(top);

  useEffect(()=>{
    setFilteredData(top);
  }, [top]);

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
                        <option value="nigeria">Nigeria</option>
                        <option value="america">America</option>
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
                ? <div className="top-rated-movies"> 
                    {filteredData.map((item)=> 
                      <Movie key={item._id} data={item}/>)}
                  </div>
                :<p>Fetching movies...</p>
              }
            </div>
          </div>
        }
    </>
  );
};

export default TopRated;