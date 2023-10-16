import { AmplifyUser } from "@aws-amplify/ui";
import { ChangeEvent, FormEvent, useState } from "react";
import { ApiUrlProvider } from "../api-url-provider";
import { AddMovieRequest } from "./add-movie-request";
import Spinner from "../spinner/Spinner";

const AddMovie = ({ user }: { user: AmplifyUser }) => {
  const defaultUserNames: string[] = ['André', 'Elliot', 'John', 'Rodrigue'];
  const [form, setForm] = useState<AddMovieRequest>({
    title: '',
    pickedBy: defaultUserNames[0]
  });
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  const addMovie = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error('Add movie request was unsuccessful.');
      }
    } catch (error) {
      console.error('Error: ', error);
    }

    setAwaitingResponse(false);
  }

  const pickedByOptions = defaultUserNames.map(username =>
    <option key={username} value={username}>{username}</option>
  );

  return (
    <div>
      <h4>Lägg till film</h4>
      <form onSubmit={addMovie}>
        <label htmlFor="pickedBy">Vald av: </label>
        <select name="pickedBy" id="pickedBy" onChange={handleSelectChange}>
          {pickedByOptions}
        </select>
        <br></br>
        <label htmlFor="title">Titel: </label>
        <input
          id="title"
          type="text"
          name="title"
          onChange={handleChange}></input><br></br>
        <label htmlFor="imdbLink">IMDb-länk: </label>
        <input
          id="imdbLink"
          type="text"
          name="imdbLink"
          onChange={handleChange}></input><br></br>
        {awaitingResponse ? <Spinner></Spinner> : <button type="submit">Lägg till</button>}
      </form>
    </div>
  )
}

export default AddMovie;