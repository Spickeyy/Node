import express from 'express';
import { createMovie, getMovies } from '../controllers/movies-controller';

const moviesRauter = express.Router();

moviesRauter.get('/', getMovies);
moviesRauter.post('/', createMovie);

export default moviesRauter;
