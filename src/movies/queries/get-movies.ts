import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';
import MoviesModel from '../model';
import { MovieViewModel } from '../types';

export const getMovies: RequestHandler<
    {},
    MovieViewModel[] | ErrorResponse,
    {},
    {}
> = async (req, res) => {
    try {
        const movies = await MoviesModel.getMovies();
        res.status(200).json(movies);
    } catch (error) {
        const [status, errorResponse] = ErrorService.handleError(error);
        res.status(status).json(errorResponse);
    }
};
