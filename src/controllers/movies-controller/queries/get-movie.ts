import { RequestHandler } from 'express';
import MovieService from '../../../services/movies-service';
import { MovieModel } from '../types';

export const getMovie: RequestHandler<
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
        res.status(200).json(movie);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'request error';
        res.status(404).json({ error: message });
    }
  };
