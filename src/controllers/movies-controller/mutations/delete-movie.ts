import { RequestHandler } from 'express';
import { MovieViewModel } from '../types';
import MoviesModel from '../movies-model';

export const deleteMovie: RequestHandler<
    { id: string | undefined },
    MovieViewModel | ErrorResponse,
    {},
    {}
> = async (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
        res.status(400).json({ error: 'server setup error' });
        return;
    }

    try {
        const movie = await MoviesModel.getMovie(id);
        await MoviesModel.deleteMovie(id);

        res.status(200).json(movie);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'Request error' });
        }
    }
};
