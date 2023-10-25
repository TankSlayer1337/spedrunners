import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MovieEntry } from "../interfaces/movie-entry";
import { faArrowUpRightFromSquare, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const DisplayMovie = ({ entry, setDisplayEdit }: { entry: MovieEntry, setDisplayEdit: Function }) => {
  return (
    <div>
      <h3>{entry.title}</h3>
      <p>Vald av {entry.pickedBy}</p>
      {entry.imdbLink && <a href={entry.imdbLink} target="_blank">IMDb <FontAwesomeIcon icon={faArrowUpRightFromSquare}></FontAwesomeIcon></a>}
      <p>Lades till {entry.created}</p>
      <button onClick={() => setDisplayEdit(true)}>Edit <FontAwesomeIcon icon={faPenToSquare} /></button>
    </div>
  )
}

export default DisplayMovie;