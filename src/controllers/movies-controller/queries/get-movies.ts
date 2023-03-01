import { RequestHandler } from 'express';
import MovieService from '../../../services/movies-service';
import { MovieModel } from '../types';

export const getMovies: RequestHandler<
    {},
    MovieModel[],
    {},
    {}
> = async (req, res) => {
    const movies = await MovieService.getMovies();

    res.status(200).json(movies);
  };
