import Loader from 'react-loader-spinner'
import { useAuthState } from "../../context";
import './DeleteModal.css'
const DeleteModal = ({deleteMovie, title, show, setShowModal}) => {
  const { loading } = useAuthState();
	const showHideClassName = show ? " modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div className="close-btn-container" onClick={()=>setShowModal(false)}>
          <ion-icon name="close-circle-outline" id="close-delete-btn"></ion-icon>
        </div>
        <div className="delete-modal-content">
          <h3>Are you sure you want to Delete "{title}"</h3>
          <div className="btn-container">
            <button className="edit-btn" onClick={deleteMovie}>
              <ion-icon name="thumbs-up-outline" id="yes-btn"></ion-icon>          
              Yes
            </button>
            <button className="delete-btn" onClick={()=>setShowModal(false)}>
              <ion-icon name="thumbs-down-outline" id="no-btn"></ion-icon>          
              No
            </button>
          </div>
        </div>    
        <Loader 
        type="TailSpin"
        color="#EC1F41"
        height={20}
        width={20}
        visible={loading}
      />
      </div>
    </div>
  );
};

export default DeleteModal;
