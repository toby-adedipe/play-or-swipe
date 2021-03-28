import { useState, useEffect } from 'react';
import axios from 'axios';
import Categories from '../../components/Categories';

const HomePage = () => {
    const [popular, setPopular] = useState(null);
    const [top, setTop] = useState(null)
    const URL = "http://localhost:5000/api/v1/movies"
  
    useEffect(()=>{
      fetchData()
    }, []);
  
    const fetchData = async()=>{
      const res = await axios.get(URL)
      const filtered = filterPopular(res.data.data);
      setPopular(filtered)
      setTop(filtered);
    }
  
    const filterPopular= (data)=>{
      //console.log(data);
      const newData = data.filter((item)=>{
        return item.rating > 4.0;
      })
      return newData;
    }  

    return (
        <>{
            popular === null || top === null
            ? <p>Fetching Data...</p>
            : <div>
                <Categories category="Top Rated Movies" link="/top-rated" data={top} />
                <Categories category="Popular Movies" link="/popular" data={popular} />
            </div>
        }
        </>
    );
};

export default HomePage;