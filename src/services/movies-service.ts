import mysql from 'mysql2/promise';
import config from '../config';
import { MovieModel, MovieData, PartialMovieData } from '../controllers/movies-controller/types';
import { colonObjectQueryFormat } from './my-sql';

type CreateMovieQueryResult = [
    mysql.ResultSetHeader,
    mysql.ResultSetHeader,
    mysql.ResultSetHeader,
    mysql.ResultSetHeader,
    MovieModel[],
  ];

  const SQL_SELECT = `
  SELECT 
    m.id, 
    m.title, 
    JSON_OBJECT('country', l.country) as location,
    m.price, 
    m.rating, 
    IF(COUNT(i.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(i.src)) as images
  FROM movies as m
  LEFT JOIN images as i
  ON i.movieId = m.id
  LEFT JOIN  locations as l
  ON m.locationId = l.id`;
  const SQL_GROUP = 'GROUP BY m.id;';
  const SQL_WHERE_ID = 'WHERE m.id = ?';

  const getMovies = async (): Promise<MovieModel[]> => {
    const mySqlConnection = await mysql.createConnection(config.db);

    const sql = [SQL_SELECT, SQL_GROUP].join('\n');
    const [movies] = await mySqlConnection.query<MovieModel[]>(sql);

    mySqlConnection.end();

    return movies;
  };

  const getMovie = async (id: string): Promise<MovieModel> => {
    const mySqlConnection = await mysql.createConnection(config.db);

    const preparedSql = [SQL_SELECT, SQL_WHERE_ID, SQL_GROUP].join('\n');
    const preparedSqlData = [id];
    const [movies] = await mySqlConnection.query<MovieModel[]>(preparedSql, preparedSqlData);

    mySqlConnection.end();

    if (movies.length === 0) {
      throw new Error(`movie with id <${id}> was not found`);
    }

    return movies[0];
  };

  const createMovie = async (movieData: MovieData): Promise<MovieModel> => {
    const mySqlConnection = await mysql.createConnection(config.db);

    const preparedSql = `
      INSERT INTO locations (country) VALUES 
      (?);
      
      INSERT INTO movies (title, price, rating, locationId) VALUES
      (?, ?, ?, LAST_INSERT_ID());
      SET @movieId = LAST_INSERT_ID();
      
      INSERT INTO images (src, movieId) VALUES
      ${movieData.images.map(() => '(?, @movieId)').join(',\n')};
      ${SQL_SELECT}
      WHERE m.id = @movieId
      ${SQL_GROUP};
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

    return createdMovie;
  };

  const updateMovie = async (id: string, movieData: PartialMovieData): Promise<MovieModel> => {
    const mySqlConnection = await mysql.createConnection(config.db);
    mySqlConnection.config.queryFormat = colonObjectQueryFormat;

    // Images SQL
    const imagesBindings = movieData.images?.reduce((prevBindings, img, i) => ({
      ...prevBindings,
      [`img${i + 1}`]: img,
    }), {} as Record<string, string>) ?? null;
    const shouldAddNewImages = movieData.images !== undefined && movieData.images.length > 0;
    const imagesUpdatePreparedSql = imagesBindings !== null
      ? `
        DELETE FROM images 
        WHERE images.movieId = :id;
      
        ${shouldAddNewImages ? `INSERT INTO images (src, movieId) VALUES
          ${Object.keys(imagesBindings).map((imgBinding) => `(:${imgBinding}, :id)`).join(',\n')};`
        : ''}
      ` : '';

    // Location SQL
    const locationExist = movieData.location !== undefined;
    const locationInsertSql = locationExist ? `
      INSERT INTO locations (country) VALUES
      (:country);` : '';

    // Property SQL
    const movieSetPropsSql = [
      movieData.title !== undefined ? 'title = :title' : null,
      movieData.rating !== undefined ? 'rating = :rating' : null,
      movieData.price !== undefined ? 'price = :price' : null,
      locationExist ? 'locationId = LAST_INSERT_ID()' : null,
    ].filter((setPropSql) => setPropSql !== null).join(',\n');

    const preparedSql = `
      ${imagesUpdatePreparedSql}
      ${locationInsertSql}
      ${movieSetPropsSql.length > 0 ? `
      UPDATE movies SET
        ${movieSetPropsSql}
        WHERE movies.id = :id;
      ` : ''}
      SELECT 
        m.id, 
        m.title,
        JSON_OBJECT('country', l.country) as location,
        m.price, 
        m.rating, 
        IF(COUNT(i.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(i.src)) as images
      FROM movies as m
      LEFT JOIN images as i
      ON i.movieId = m.id
      LEFT JOIN  locations as l
      ON m.locationId = l.id
      WHERE m.id = :id
      GROUP BY m.id;
    `.trim();

    const bindings = {
      id,
      ...imagesBindings,
      ...movieData.location,
      title: movieData.title,
      rating: movieData.rating,
      price: movieData.price,
    };

    const [queryResultsArr] = await mySqlConnection.query<MovieModel[]>(preparedSql, bindings);
    const updatedMovie = queryResultsArr.at(-1) as MovieModel;

    await mySqlConnection.end();

    return updatedMovie;
  };

  const deleteMovie = async (id: string): Promise<void> => {
    const mySqlConnection = await mysql.createConnection(config.db);

    const preparedSql = `
      DELETE FROM images WHERE movieId = ?;
      DELETE from movies WHERE id = ?;
      `;
    const preparedSqlData = [id, id];

    await mySqlConnection.query<MovieModel[]>(preparedSql, preparedSqlData);

    mySqlConnection.end();
  };

  const MovieService = {
    getMovie,
    getMovies,

    createMovie,
    updateMovie,
    deleteMovie,
  };

  export default MovieService;
