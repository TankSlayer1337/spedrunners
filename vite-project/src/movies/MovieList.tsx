import { MovieEntry } from "./movie-entry";

const MovieList = ({ movies }: { movies: MovieEntry[] }) => {

  const compare = (a: MovieEntry, b: MovieEntry): number => {
    if (a.created > b.created) {
      return -1;
    }
    if (a.created < b.created) {
      return 1;
    }
    return 0;
  }

  const movieItems = movies.sort(compare).map(movie =>
    <li key={movie.movieId}>
      <h3>{movie.title}</h3>
      <p>Vald av {movie.pickedBy}</p>
      <p>Lades till {movie.created}</p>
    </li>
  );

  return (
    <div>
      <h2>Filmer</h2>
      <ul>
        {movieItems}
      </ul>
    </div>
  )
}

export default MovieList;