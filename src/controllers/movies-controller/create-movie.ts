import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import createId from 'uniqid';
import { MovieModel, MovieData } from './types';
import movies from './movies-data';
import movieDataValidationSchema from './movie-data-validation-schema';

export const createHouse: RequestHandler<
  {},
  MovieModel | ResponseError,
  MovieData,
  {}
> = (req, res) => {
  try {
    const movieData = movieDataValidationSchema.validateSync(req.body, { abortEarly: false });
    const newMovie: MovieModel = { id: createId(), ...movieData };
    movies.push(newMovie);

    res.status(201).json(newMovie);
  } catch (err) {
    if (err instanceof ValidationError) {
      const manyErrors = err.errors.length > 1;
      res.status(400).json({
        error: manyErrors ? 'Validation errors' : err.errors[0],
        errors: manyErrors ? err.errors : undefined,
      });
    } else if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Request error' });
    }
  }
};
