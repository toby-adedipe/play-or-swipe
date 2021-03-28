import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "../../components/Movie";
import './popular.css';

const TopRated = () => {
  const [popular, setPopular] = useState(null);
  const URL = "http://localhost:5000/api/v1/movies"

  useEffect(()=>{
    fetchData()
  }, []);

  const fetchData = async()=>{
    const res = await axios.get(URL)
    const filtered = filterPopular(res.data.data);
    setPopular(filtered)
  }

  const filterPopular= (data)=>{
    //console.log(data);
    const newData = data.filter((item)=>{
      return item.rating > 4.0;
    })
    return newData;
  }

  return (
      <div className="popular-page">
        <p className="popular-h1">Popular Movies</p>
          {
            popular
            ? <div className="popular-movies"> 
                {popular.map(({_id, genre, rating, synopsis, title, year, img,})=> <Movie key={_id} id={_id} genre={genre} title={title} rating={rating} synopsis={synopsis} year={year} img={img}/>)}
              </div>
            :<p>Fetching movies...</p>
          }
      </div>
  );
};

export default TopRated;