import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import { MovieViewModel, MovieData } from '../types';
import movieDataValidationSchema from '../validation-schemas/movie-data-validation-schema';
import MoviesModel from '../model';

export const createMovie: RequestHandler<
  {},
  MovieViewModel | ErrorResponse,
  MovieData,
  {}
> = async (req, res) => {
  try {
    const movieData: MovieData = movieDataValidationSchema
      .validateSync(req.body, { abortEarly: false });

    const createdMovie = await MoviesModel.createMovie(movieData);

    res.status(201).json(createdMovie);
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
