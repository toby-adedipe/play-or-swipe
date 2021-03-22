import { useState } from "react";
import './search.css'
const Search = () => {
    const [val, setVal] = useState("");

    return (
        <div className="searchContainer">
            <div id="search">
                <input 
                    placeholder="Search for a movie"
                    value={val} 
                    onChange={(e)=>setVal(e.target.value)}
                />
                <ion-icon name="search-outline" id="searchIcon" onClick={()=>console.log("hi")}></ion-icon>
            </div>
        </div>
    );
};

export default Search;