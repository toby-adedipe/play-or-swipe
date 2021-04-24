import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import StarRatingComponent from 'react-star-rating-component';

const AddForm = ({onSubmit, status, rating, handleClick}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="review-form">
      <div>
        <div className="title-group">
          <div className="form-group title-container">
            <label>Name of Movie {errors.title && <span className="error">Please add a movie title</span>}</label>
            <input
              type="text"
              {...register('title', {required: true})}
              className="title-input" 
            />
          </div>
          <div className="form-group year-container">
            <label>Release Year {errors.year && <span className="error">Please add a release year</span>}</label>
            <input
              type="text"
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
              {...register('genre', {required: true})}
              className="genre-input" 
            />
          </div>
          <div className="form-group location-container">
            <label>Industry {errors.location && <span className="error">Please add an industry</span>}</label>
            <select {...register("location")}>
              <option value="nigeria" >Nollywood</option>
              <option value="america">Hollywood</option>
              <option value="others">Others</option>
            </select>
          </div>
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
            />
          </div>
          <div className="poster">
            <label>Upload Poster </label>
            <input
              type="file" 
              {...register('image')}
            />
          </div>
        </div>
        <div className="rating-container">
          <StarRatingComponent
            name="rate"
            starCount = {5}
            value={rating}
            renderStarIcon={()=><ion-icon name="star" id="star-icon"></ion-icon>}
            starColor={"#EC1F41"}
            onStarClick={handleClick}
          />
        </div>
        <div className="submit-loader-conatainer">
          <input type="submit" className={"submit-btn"}  disabled={status} value={status?"Submitting":"Submit"} />
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

export default AddForm;