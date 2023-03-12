import express, { RequestHandler } from 'express';
import authMiddleware from 'middlewares/auth-middleware';
import { getMovie } from './queries/get-movie';
import { getMovies } from './queries/get-movies';
import { createMovie } from './mutations/create-movie';
import { deleteMovie } from './mutations/delete-movie';
import { updateMovie } from './mutations/update-movie';

const moviesRouter = express.Router();

moviesRouter.get('/', getMovies);
moviesRouter.get('/:id', getMovie);

moviesRouter.post('/', authMiddleware, createMovie);
moviesRouter.delete('/:id', authMiddleware, deleteMovie as RequestHandler);
moviesRouter.patch('/:id', authMiddleware, updateMovie as RequestHandler);

export default moviesRouter;
