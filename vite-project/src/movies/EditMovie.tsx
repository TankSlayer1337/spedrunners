import { AmplifyUser } from "@aws-amplify/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MovieEntry } from "./movie-entry";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { UpdateMovieRequest } from "./update-movie-request";
import { useState } from "react";
import { ApiUrlProvider } from "../api-url-provider";
import MovieForm from "./MovieForm";
import Spinner from "../spinner/Spinner";

const EditMovie = ({ user, movie, onEdit, setDisplayEdit }: { user: AmplifyUser, movie: MovieEntry, onEdit: Function, setDisplayEdit: Function }) => {
  const [request, setRequest] = useState<UpdateMovieRequest>({
    movieId: movie.movieId,
    title: movie.title,
    imdbLink: movie.imdbLink,
    pickedBy: movie.pickedBy
  });
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);

  const deleteMovie = async () => {
    try {
      const url = ApiUrlProvider.getApiUrl() + '/movies/' + movie.movieId;
      const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Movie deletion was unsuccessful.');
      }
    } catch (error) {
      console.error('Error: ', error);
    }

    onEdit();
  }

  const updateMovie = async () => {
    setAwaitingResponse(true);
    try {
      const url = ApiUrlProvider.getApiUrl() + '/movies/update';
      const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error('Update movie request was unsuccessful.');
      }
    } catch (error) {
      console.error('Error: ', error);
    }

    onEdit();
  }

  return (
    <div>
      <MovieForm request={request} setRequest={setRequest}></MovieForm>
      {awaitingResponse ? <Spinner></Spinner> :
      <>
        <button onClick={() => updateMovie()}>Update</button>
        <button onClick={() => deleteMovie()}>Delete <FontAwesomeIcon icon={faTrash} /></button>
        <button onClick={() => setDisplayEdit(false)}>Cancel</button>
      </>}
    </div>
  )
}

export default EditMovie;