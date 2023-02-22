import { RequestHandler } from 'express';
import { MovieModel } from '../types';
import movies from '../movies-data';

export const getMovie: RequestHandler<
    { id: string | undefined },
    MovieModel | ResponseError,
    {},
    {}
> = (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
        res.status(400).json({ error: 'server setup error' });
        return;
    }

    const foundMovie = movies.find((movie) => movie.id === id);

    if (foundMovie === undefined) {
        res.status(400).json({ error: `movie was not found with id '${id}'` });
        return;
    }

    res.status(200).json(foundMovie);
  };
