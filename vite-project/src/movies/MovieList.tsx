import { AmplifyUser } from "@aws-amplify/ui";
import { MovieEntry } from "./movie-entry";
import MovieListItem from "./MovieListItem";

const MovieList = ({ user, movies, onEdit }: { user: AmplifyUser, movies: MovieEntry[], onEdit: Function }) => {
  const compareCreated = (a: MovieEntry, b: MovieEntry): number => {
    if (a.created > b.created) {
      return -1;
    }
    if (a.created < b.created) {
      return 1;
    }
    return 0;
  }

  const movieItems = movies.sort(compareCreated).map(movie =>
    <li key={movie.movieId}>
      <MovieListItem user={user} entry={movie} onEdit={onEdit}></MovieListItem>
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