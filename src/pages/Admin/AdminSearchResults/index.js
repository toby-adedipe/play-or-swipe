import { useContext } from "react";
import { Link } from "react-router-dom";

import AdminHeader from "../../../components/AdminHeader";
import Pagination from "../../../components/Pagination";
import AdminSearch from "../../../containers/AdminSearch";
import AdminSearchDiv from "../../../containers/AdminSearchDiv";
import AppContext from "../../../context/AppContext";

import './search-results.css'

const AdminSearchResults = () => {
  const {searchVal, results, response, page, setPage} = useContext(AppContext);

  const getTotalPages = ()=> Math.ceil(response.pagination.total/10);

  return (
    <>
      <AdminHeader />
      <AdminSearch />
      <div className="search-container">
        <div className="search-results">
          <p>Showing search results for "{searchVal}" </p>
          <AdminSearchDiv results={results} />
          <hr />
          <Link to="/add">
          <div className="add-movie">
            <div className="add-container">
              <div>
              <ion-icon name="add" id="add"></ion-icon>
              </div>
            </div>
            <div className="add-btn-desc">
              <p>Can't find your movie? Be the first to rate it</p>
            </div>
          </div>
          </Link>
          <div className="search-pagination">
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
        </div>
      </div>
    </>
  );
};

export default AdminSearchResults;