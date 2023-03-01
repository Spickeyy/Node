import { RequestHandler } from 'express';
import { MovieModel } from '../types';

export const deleteMovie: RequestHandler<
    { id: string | undefined },
    MovieModel | ErrorResponse,
    {},
    {}
> = (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
        res.status(400).json({ error: 'server setup error' });
        return;
    }

    // if (foundMovieIndex === -1) {
    //     res.status(400).json({ error: `movie was not found with id '${id}'` });
    //     return;
    // }

    res.status(204).json({} as MovieModel);
  };
