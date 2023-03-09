import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';
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
    const [status, errorResponse] = ErrorService.handleError(err);
        res.status(status).json(errorResponse);
  }
};
