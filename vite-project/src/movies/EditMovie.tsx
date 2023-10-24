import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MovieEntry } from "./movie-entry";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const EditMovie = ({ movie, onDelete, setDisplayEdit }: { movie: MovieEntry, onDelete: Function, setDisplayEdit: Function}) => {
  return (
    <div>
      <button onClick={() => onDelete(movie.movieId)}>Delete <FontAwesomeIcon icon={faTrash} /></button>
      <button onClick={() => setDisplayEdit(false)}>Cancel</button>
    </div>
  )
}

export default EditMovie;