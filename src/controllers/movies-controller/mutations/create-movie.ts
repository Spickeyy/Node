import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import mysql from 'mysql2/promise';
import { MovieModel, MovieData } from '../types';
import movieDataValidationSchema from '../validation-schemas/movie-data-validation-schema';
import config from '../../../config';

type CreateMovieQueryResult =
[
    mysql.ResultSetHeader,
    mysql.ResultSetHeader,
    mysql.ResultSetHeader,
    mysql.ResultSetHeader,
    MovieModel[],
  ];

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

    const preparedSql = `
        INSERT INTO locations (country) VALUES
        (?);

        INSERT INTO movies (title, price, rating, locationId) VALUES
        (?, ?, ?, LAST_INSERT_ID());

        SET @movieId = LAST_INSERT_ID();

        INSERT INTO images (src, movieId) VALUES
        ${movieData.images.map(() => '(?, @movieId)').join(',\n')};

        SELECT m.id, m.title, JSON_OBJECT('country', l.country) as location, m.price, m.rating, json_arrayagg(i.src) as images
        FROM images as i
        LEFT JOIN movies as m
        ON i.movieId = h.id
        LEFT JOIN  locations as l
        ON m.locationId = l.id
        WHERE m.id = @movieId
        GROUP BY m.id;
    `;
    const preparedSqlData = [
      movieData.location.country,
      movieData.title,
      movieData.price,
      movieData.rating,
      ...movieData.images,
    ];

    const [queryResultsArr] = await mySqlConnection.query(preparedSql, preparedSqlData);
    const [createdMovie] = (queryResultsArr as CreateMovieQueryResult)[4];

    await mySqlConnection.end();

    res.status(201).json(createdMovie);
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
