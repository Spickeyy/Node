import { RequestHandler } from 'express';
import MovieModel from './movie-model';
import movies from './movies-data';

export const isMovieData = (
    potentialMovieData: Body | MovieData,
    ): potentialMovieData is MovieData => {
      const {
   title, price, rating, images, location,
      } = potentialMovieData;

    if (typeof title !== 'string') return false;
    if (typeof price !== 'string') return false;
    if (typeof rating !== 'number') return false;
    if (!Array.isArray(images)) return false;
    if (images.some((img) => typeof img !== 'string')) return false;
    if (location === null || typeof location !== 'object') return false;
    if (typeof location.country !== 'string') return false;

    return true;
  };

type MovieData = Omit<MovieModel, 'id'>;
type Body = PartialRecursive<MovieData>;

export const createMovie: RequestHandler<
    {},
    MovieModel | ResponseError,
    Body,
    {}
> = (req, res) => {
  const movieData = req.body;
  if (!isMovieData(movieData)) {
    res.status(400).json({ error: 'Incorrect data' });
    return;
  }

  const newMovie: MovieModel = { id: '5', ...movieData };
  movies.push(newMovie);
  res.status(201).json(newMovie);
};
