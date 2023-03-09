import { RequestHandler } from 'express';
import ErrorService, { ServerSetupError } from 'services/error-service';
import { MovieViewModel } from '../types';
import MoviesModel from '../model';

export const deleteMovie: RequestHandler<
    { id: string | undefined },
    MovieViewModel | ErrorResponse,
    {},
    {}
> = async (req, res) => {
    const { id } = req.params;

    try {
        if (id === undefined) throw new ServerSetupError();
        const movie = await MoviesModel.getMovie(id);
        await MoviesModel.deleteMovie(id);

        res.status(200).json(movie);
    } catch (err) {
        const [status, errorResponse] = ErrorService.handleError(err);
        res.status(status).json(errorResponse);
    }
};
