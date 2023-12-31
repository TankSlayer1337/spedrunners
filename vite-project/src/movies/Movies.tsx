import { AmplifyUser } from "@aws-amplify/ui";
import { useEffect, useState } from "react";
import { MovieEntry } from "./interfaces/movie-entry";
import { ApiUrlProvider } from "../api-url-provider";
import Spinner from "../spinner/Spinner";
import AddMovie from "./AddMovie";
import MovieList from "./list/MovieList";

const Movies = ({ user }: { user: AmplifyUser }) => {
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

  return (
    <>
      <AddMovie user={user!} onAdd={fetchMovies}></AddMovie>
      {awaitingResponse ? <Spinner></Spinner> :
        <MovieList user={user} movies={movies} onEdit={fetchMovies}></MovieList>
      }
    </>
  )
}

export default Movies;