import { AmplifyUser } from "@aws-amplify/ui";
import { useState } from "react";
import { ApiUrlProvider } from "../api-url-provider";
import { AddMovieRequest } from "./add-movie-request";
import Spinner from "../spinner/Spinner";
import MovieForm from "./MovieForm";

const AddMovie = ({ user, onAdd }: { user: AmplifyUser, onAdd: Function }) => {
  const defaultUserNames: string[] = ['André', 'Elliot', 'John', 'Rodrigue'];
  const [request, setRequest] = useState<AddMovieRequest>({
    title: '',
    pickedBy: defaultUserNames[0]
  });
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);

  const addMovie = async () => {
    setAwaitingResponse(true);
    try {
      const url = ApiUrlProvider.getApiUrl() + '/movies';
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
        throw new Error('Add movie request was unsuccessful.');
      }
    } catch (error) {
      console.error('Error: ', error);
    }

    setRequest({title: '', pickedBy: defaultUserNames[0], imdbLink: ''});
    setAwaitingResponse(false);
    onAdd();
  }

  return (
    <div>
      <h4>Lägg till film</h4>
      <MovieForm request={request} setRequest={setRequest}></MovieForm>
      {awaitingResponse ? <Spinner></Spinner> : <button onClick={addMovie}>Lägg till</button>}
    </div>
  )
}

export default AddMovie;