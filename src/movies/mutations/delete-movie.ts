import { RequestHandler } from 'express';
import ErrorService, { ForbiddenError, ServerSetupError } from 'services/error-service';
import UserModel from 'models/user-model';
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
        if (req.authData === undefined) throw new ServerSetupError();
        const user = await UserModel.getUserByEmail(req.authData.email);
        const movie = await MoviesModel.getMovie(id);

        if (user.role !== 'ADMIN' && user.id !== movie.user.id) throw new ForbiddenError();

        await MoviesModel.deleteMovie(id);

        res.status(200).json(movie);
    } catch (err) {
        const [status, errorResponse] = ErrorService.handleError(err);
        res.status(status).json(errorResponse);
    }
};
