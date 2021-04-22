import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";


const Form = ({data, onSubmit, status}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="review-form">
      <div>
        <div className="title-group">
          <div className="form-group title-container">
            <label>Name of Movie {errors.title && <span className="error">Please add a movie title</span>}</label>
            <input
              type="text"
              defaultValue={data.title} 
              {...register('title', {required: true})}
              className="title-input" 
            />
          </div>
          <div className="form-group year-container">
            <label>Release Year {errors.year && <span className="error">Please add a release year</span>}</label>
            <input
              type="text"
              defaultValue={data.year} 
              {...register('year', {required: true})}
              className="year-input" 
            />
          </div>
        </div>
        <div className="genre-location-group">
          <div className="form-group genre-container">
            <label>Genre {errors.genre && <span className="error">Please add a genre</span>}</label>
            <input
              type="text"
              defaultValue={data.genre} 
              {...register('genre', {required: true})}
              className="genre-input" 
            />
          </div>
          <div className="form-group location-container">
            <label>Industry {errors.location && <span className="error">Please add an industry</span>}</label>
            <select {...register("location")} defaultValue={data.location}>
              <option value="nigeria" >Nollywood</option>
              <option value="america">Hollywood</option>
            </select>
          </div>
        </div>
        <div className="form-group">
            <label>Status {errors.location && <span className="error">Please choose the status of the movie</span>}</label>
            <select {...register("status")} defaultValue={data.status}>
              <option value="approved" >Approved</option>
              <option value="pending" defaultValue>Pending</option>
              <option value="disapproved">Disapproved</option>
            </select>
          </div>
        <div className="form-group">
          <label>Synopsis {errors.synopsis && <span className="error">Please add a synopsis</span>}</label>
          <textarea 
            name="text"
            className="year-input"
            type="text"
            {...register('synopsis', { required: true })}
            cols="50"
            rows="6"
            defaultValue={data.synopsis}
          />
        </div>
        <div className="poster">
          <label>Change Poster? </label>
          <img 
            src={data.img}
            alt={data.title}
            className="search-results-image"
          />
          <input
            type="file" 
            {...register('image')}
          />
        </div>
        </div>
        <div className="submit-loader-conatainer">
          <input type="submit" className={"submit-btn"} />
          <Loader 
            type="TailSpin"
            color="#EC1F41"
            height={20}
            width={20}
            visible={status}
          />
        </div>
    </form>
  );
};

export default Form;