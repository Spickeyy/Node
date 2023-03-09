import { RequestHandler } from 'express';
import ErrorService, { ServerSetupError } from 'services/error-service';
import MoviesModel from '../model';
import { MovieViewModel, PartialMovieData } from '../types';
import partialMovieDataValidationSchema from '../validation-schemas/partial-movie-data-validation-schema';

export const updateMovie: RequestHandler<
    { id: string | undefined },
    MovieViewModel | ErrorResponse,
    PartialMovieData,
    {}
> = async (req, res) => {
    const { id } = req.params;

    try {
      if (id === undefined) throw new ServerSetupError();
      const partialMovieData = partialMovieDataValidationSchema.validateSync(
          req.body,
          { abortEarly: false },
        );

      const updatedMovie = await MoviesModel.updateMovie(id, partialMovieData);
        res.status(200).json(updatedMovie);
  } catch (err) {
      const [status, errorResponse] = ErrorService.handleError(err);
        res.status(status).json(errorResponse);
  }
};
