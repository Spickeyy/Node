import { RequestHandler } from 'express';
import mysql from 'mysql2/promise';
import { MovieModel } from '../types';
import config from '../../../config';

export const getMovies: RequestHandler<
    {},
    MovieModel[],
    {},
    {}
> = async (req, res) => {
    const mySqlConnection = await mysql.createConnection(config.db);
    const [movies] = await mySqlConnection.query<MovieModel[]>(`
    SELECT m.id, m.title, JSON_OBJECT('country', l.country) as location, m.price, m.rating, json_arrayagg(i.src) as images
    FROM images as i
    LEFT JOIN movies as m
    ON i.movieId = m.id
    LEFT JOIN locations as l
    ON m.locationId = l.id
    GROUP BY m.id;
    `);
    await mySqlConnection.end();

    res.status(200).json(movies);
  };
