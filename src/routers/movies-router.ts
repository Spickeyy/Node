import express from 'express';
import {

    getMovies,
    getMovie,

    createMovie,
    deleteMovie,
    updateMovie,
} from '../controllers/movies-controller';

const moviesRauter = express.Router();

moviesRauter.get('/', getMovies);
moviesRauter.get('/:id', getMovie);

moviesRauter.post('/', createMovie);
moviesRauter.patch('/:id', updateMovie);
moviesRauter.delete('/:id', deleteMovie);

export default moviesRauter;
