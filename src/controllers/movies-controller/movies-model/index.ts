import { getMovie } from './get-movie';
import { getMovies } from './get-movies';
import { createMovie } from './create-movie';
import { updateMovie } from './update-movie';
import { deleteMovie } from './delete-movie';

const MoviesModel = {
    getMovie,
    getMovies,

    createMovie,
    updateMovie,
    deleteMovie,
  };

  export default MoviesModel;
