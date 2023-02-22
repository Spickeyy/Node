import { RequestHandler } from 'express';
import { MovieModel } from './types';
import movies from './movies-data';

export const getMovies: RequestHandler<
    {},
    MovieModel[],
    {},
    {}
> = (req, res) => {
    res.status(200).json(movies);
  };
