import { ChangeEvent } from "react";
import { AddMovieRequest } from "./interfaces/add-movie-request";

const MovieForm = <RequestType extends AddMovieRequest,>({ request, setRequest }: { request: RequestType, setRequest: Function }) => {
  const defaultUserNames: string[] = ['André', 'Elliot', 'John', 'Rodrigue'];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRequest({
      ...request,
      [event.target.name]: event.target.value
    });
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRequest({
      ...request,
      [event.target.name]: event.target.value
    });
  }

  const pickedByOptions = defaultUserNames.map(username =>
    <option key={username} value={username}>{username}</option>
  );

  return (
    <form>
      <label htmlFor="title">Titel: </label>
      <input
        value={request.title ?? ''}
        id="title"
        type="text"
        name="title"
        onChange={handleChange}></input><br></br>
      <label htmlFor="pickedBy">Vald av: </label>
      <select value={request.pickedBy} name="pickedBy" id="pickedBy" onChange={handleSelectChange}>
        {pickedByOptions}
      </select>
      <br></br>
      <label htmlFor="imdbLink">IMDb-länk: </label>
      <input
        value={request.imdbLink ?? ''}
        id="imdbLink"
        type="text"
        name="imdbLink"
        onChange={handleChange}></input><br></br>
    </form>
  )
}

export default MovieForm;