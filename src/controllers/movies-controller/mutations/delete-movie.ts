import { RequestHandler } from 'express';
import { MovieModel } from '../types';
import movies from '../movies-data';

export const deleteMovie: RequestHandler<
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

    const foundMovieIndex = movies.findIndex((movie) => movie.id === id);

    if (foundMovieIndex === -1) {
        res.status(400).json({ error: `movie was not found with id '${id}'` });
        return;
    }

    const [deletedMovie] = movies.splice(foundMovieIndex, 1);

    res.status(200).json(deletedMovie);
  };
