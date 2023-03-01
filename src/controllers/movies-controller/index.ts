import express from 'express';
import { getMovie } from './queries/get-movie';
import { getMovies } from './queries/get-movies';
import { createMovie } from './mutations/create-movie';
import { deleteMovie } from './mutations/delete-movie';
// import { updateMovie } from './mutations/update-movie';

const moviesRouter = express.Router();

moviesRouter.get('/', getMovies);
moviesRouter.get('/:id', getMovie);
moviesRouter.post('/', createMovie);
moviesRouter.delete('/:id', deleteMovie);
// moviesRouter.patch('/:id', updateMovie);

export default moviesRouter;
