import { RequestHandler } from 'express';
import MoviesModel from '../movies-model';
import { MovieViewModel } from '../types';

export const getMovies: RequestHandler<
    {},
    MovieViewModel[],
    {},
    {}
> = async (req, res) => {
    const movies = await MoviesModel.getMovies();

    res.status(200).json(movies);
  };
