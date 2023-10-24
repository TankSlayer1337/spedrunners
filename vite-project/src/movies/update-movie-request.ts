import { AddMovieRequest } from "./add-movie-request";

export interface UpdateMovieRequest extends AddMovieRequest {
  movieId: string
}