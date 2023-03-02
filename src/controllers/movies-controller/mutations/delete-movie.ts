import { RequestHandler } from 'express';
import { MovieModel } from '../types';
import MovieService from '../../../services/movies-service';

export const deleteMovie: RequestHandler<
    { id: string | undefined },
    MovieModel | ErrorResponse,
    {},
    {}
> = async (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
        res.status(400).json({ error: 'server setup error' });
        return;
    }

    try {
        const movie = await MovieService.getMovie(id);
        await MovieService.deleteMovie(id);

        res.status(200).json(movie);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'Request error' });
        }
    }
};
