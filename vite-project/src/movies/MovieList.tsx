import { AmplifyUser } from "@aws-amplify/ui";
import { useEffect, useState } from "react";
import { MovieEntry } from "./movie-entry";
import { ApiUrlProvider } from "../api-url-provider";
import Spinner from "../spinner/Spinner";

const MovieList = ({ user }: { user: AmplifyUser }) => {
  const [movies, setMovies] = useState<MovieEntry[]>([]);
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(true);

  const fetchMovies = async () => {
    setAwaitingResponse(true);
    try {
      const url = ApiUrlProvider.getApiUrl() + '/movies';
      const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Movie retrieval was unsuccessful.');
      }

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error: ', error);
    }

    setAwaitingResponse(false);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  const compare = (a: MovieEntry, b: MovieEntry): number => {
    if (a.created > b.created){
      return -1;
    }
    if (a.created < b.created){
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
      {awaitingResponse ? <Spinner></Spinner> :
        <ul>
          {movieItems}
        </ul>
      }
    </div>
  )
}

export default MovieList;