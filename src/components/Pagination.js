const Pagination = ({page, setPage, getTotalPages, response}) => {

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
  

  return (
    <div className="pagination">
      <div className="back-btns">
        <button onClick={firstPage} className="prev-btn" disabled={!response.pagination.prev}>
          <ion-icon name="play-back"></ion-icon>
        </button>
        <button onClick={prev} className="prev-btn" disabled={!response.pagination.prev}>
        <ion-icon name="caret-back"></ion-icon>
          Prev
        </button> 
      </div>
      <p>Page {page} of {getTotalPages()}</p>
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
  );
};

export default Pagination;