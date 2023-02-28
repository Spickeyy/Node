import { RequestHandler } from 'express';
import mysql from 'mysql2/promise';
import { MovieModel } from '../types';
import config from '../../../config';

export const getMovie: RequestHandler<
    { id: string | undefined },
    MovieModel | ResponseError,
    {},
    {}
> = async (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
        res.status(400).json({ error: 'server setup error' });
        return;
    }
    const mySqlConnection = await mysql.createConnection(config.db);
    const [movies] = await mySqlConnection.query<MovieModel[]>(`
        SELECT m.id, m.title, JSON_OBJECT('country', l.country) as location, m.price, m.rating, json_arrayagg(i.src) as images
        FROM images as i
        LEFT JOIN movies as m
        ON i.movieId = m.id
        LEFT JOIN locations as l
        ON m.locationId = l.id
        WHERE m.id = ${id}
        GROUP BY m.id;
    `);
    await mySqlConnection.end();

    if (movies.length === 0) {
        res.status(404).json({ error: `movie with id <${id}> was not found` });
        return;
    }

    res.status(200).json(movies[0]);
  };
