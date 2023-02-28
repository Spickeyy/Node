import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import mysql from 'mysql2/promise';
import { MovieModel, MovieData } from '../types';
import movieDataValidationSchema from '../validation-schemas/movie-data-validation-schema';
import config from '../../../config';

export const createMovie: RequestHandler<
  {},
  MovieModel | ResponseError,
  MovieData,
  {}
> = async (req, res) => {
  try {
    const movieData: MovieData = movieDataValidationSchema
      .validateSync(req.body, { abortEarly: false });

    const mySqlConnection = await mysql.createConnection(config.db);
    const sql = `
        INSERT INTO locations (country) VALUES
        ('${movieData.location.country}');

        INSERT INTO movies (title, price, rating, locationId) VALUES
        ('${movieData.title}', ${movieData.price}, ${movieData.rating}, LAST_INSERT_ID());

        INSERT INTO images (src, movieId) VALUES
        ${movieData.images.map((img) => `('${img}', LAST_INSERT_ID())`).join(',\n')};
    `;

    console.log(sql);

    const queryResponse = await mySqlConnection.query<mysql.ResultSetHeader>(sql);

    console.log(queryResponse);

    await mySqlConnection.end();

    res.status(201).json({} as MovieModel);
  } catch (err) {
    if (err instanceof ValidationError) {
      const manyErrors = err.errors.length > 1;
      res.status(400).json({
        error: manyErrors ? 'Validation errors' : err.errors[0],
        errors: manyErrors ? err.errors : undefined,
      });
    } else if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Request error' });
    }
  }
};
