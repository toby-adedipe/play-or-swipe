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
            </div>
        </div>
    );
};

export default Search;