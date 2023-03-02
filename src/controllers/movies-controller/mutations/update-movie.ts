import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import MovieService from '../../../services/movies-service';
import { MovieModel, PartialMovieData } from '../types';
import partialMovieDataValidationSchema from '../validation-schemas/partial-movie-data-validation-schema';

export const updateMovie: RequestHandler<
    { id: string | undefined },
    MovieModel | ErrorResponse,
    PartialMovieData,
    {}
> = async (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
        res.status(400).json({ error: 'server setup error' });
        return;
    }

    try {
        const partialMovieData = partialMovieDataValidationSchema.validateSync(
            req.body,
             { abortEarly: false },
        );

        const updatedMovie = await MovieService.updateMovie(id, partialMovieData);
            res.status(200).json(updatedMovie);
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
