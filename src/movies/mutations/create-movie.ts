import { RequestHandler } from 'express';
import ErrorService, { ServerSetupError } from 'services/error-service';
import UserModel from 'models/user-model';
import { MovieViewModel, PartialMovieBody } from '../types';
import movieDataValidationSchema from '../validation-schemas/movie-data-validation-schema';
import MoviesModel from '../model';

export const createMovie: RequestHandler<
  {},
  MovieViewModel | ErrorResponse,
  PartialMovieBody,
  {}
> = async (req, res) => {
  try {
    const movieData = movieDataValidationSchema
      .validateSync(req.body, { abortEarly: false });

    if (req.authData === undefined) throw new ServerSetupError();
    const user = await UserModel.getUserByEmail(req.authData.email);

    const createdMovie = await MoviesModel.createMovie({ ...movieData, userId: user.id });

    res.status(201).json(createdMovie);
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
      res.status(status).json(errorResponse);
  }
};
