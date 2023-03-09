import { RequestHandler } from 'express';
import ErrorService, { ServerSetupError } from 'services/error-service';
import MoviesModel from '../model';
import { MovieViewModel } from '../types';

export const getMovie: RequestHandler<
    { id: string | undefined },
    MovieViewModel | ErrorResponse,
    {},
    {}
> = async (req, res) => {
    const { id } = req.params;

    try {
        if (id === undefined) throw new ServerSetupError();
        const movie = await MoviesModel.getMovie(id);

        res.status(200).json(movie);
    } catch (error) {
        const [status, errorResponse] = ErrorService.handleError(error);
        res.status(status).json(errorResponse);
    }
  };
