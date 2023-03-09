import mysql from 'mysql2/promise';
import config from '../../../config';
import { colonObjectQueryFormat } from '../../../services/my-sql';
import { MovieViewModel, PartialMovieData } from '../types';
import SQL from './sql';

type PrepareSqlResult = [ string, Record<string, string>];

type PrepareSql = (
  movieData: PartialMovieData
  ) => PrepareSqlResult;

const prepareImagesSql: PrepareSql = (movieData) => {
  const bindingsOrNull = movieData.images?.reduce((prevBindings, img, i) => ({
    ...prevBindings,
    [`img${i + 1}`]: img,
  }), {} as Record<string, string>) ?? null;
  const shouldInsert = bindingsOrNull !== null;
  const shouldInsertImages = movieData.images !== undefined && movieData.images.length > 0;

  const sql = shouldInsert
    ? `
      DELETE FROM images 
      WHERE images.movieId = :id;
    
      ${shouldInsertImages ? `INSERT INTO images (src, movieId) VALUES
        ${Object.keys(bindingsOrNull).map((imgBinding) => `(:${imgBinding}, :id)`).join(',\n')};`
      : ''}
    ` : '';

    const bindings = bindingsOrNull ?? {};
  return [sql, bindings];
};

const prepateLocationSql: PrepareSql = (movieData) => {
  const sql = movieData.location !== undefined ? `
    INSERT INTO locations (country) VALUES
    (:country);` : '';
  const bindings = movieData.location ?? {};

    return [sql, bindings];
};

const prepateMovieSql: PrepareSql = (movieData) => {
  const propsSql = [
    movieData.title !== undefined ? 'title = :title' : null,
    movieData.rating !== undefined ? 'rating = :rating' : null,
    movieData.price !== undefined ? 'price = :price' : null,
    movieData.location !== undefined ? 'locationId = LAST_INSERT_ID()' : null,
  ].filter((setPropSql) => setPropSql !== null).join(',\n');

  const sql = propsSql.length > 0 ? `
    UPDATE movies SET
    ${propsSql}
    WHERE movies.id = :id;
    ` : '';

  const bindings: Record<string, string> = {};
    if (movieData.title !== undefined) bindings.title = movieData.title;
    if (movieData.rating !== undefined) bindings.rating = String(movieData.rating);
    if (movieData.price !== undefined) bindings.price = String(movieData.price);

  return [sql, bindings];
};

// const prepareSqlArr = [prepateMovieSql, prepateLocationSql, prepareImagesSql];

export const updateMovie = async (
    id: string,
    movieData: PartialMovieData,
    ): Promise<MovieViewModel> => {
    const mySqlConnection = await mysql.createConnection(config.db);
    mySqlConnection.config.queryFormat = colonObjectQueryFormat;

//     const [preparedSql, bindings] = prepareSqlArr.reduce<PreparationResult>(
//       ([prevSql, prevBindings], prepareSql) => {
//         const [sql, binds] = prepareSql(movieData);

//         return [
//           sql + prevSql,
//           { ...prevBindings, ...binds },
//         ];
//       },
//       [`${SQL.SELECT} WHERE m.id = :id ${SQL.GROUP}`, { id }],
// );

    const [imagesSql, imagesBindings] = prepareImagesSql(movieData);
    const [locationSql, locationBindings] = prepateLocationSql(movieData);
    const [movieSql, movieBindings] = prepateMovieSql(movieData);

    const preparedSql = `
      ${imagesSql}
      ${locationSql}
      ${movieSql}
      ${SQL.SELECT}
      WHERE m.id = :id
      ${SQL.GROUP}
    `.trim();

    const bindings = {
      id,
      ...imagesBindings,
      ...locationBindings,
      ...movieBindings,
    };

    const [queryResultsArr] = await mySqlConnection.query<MovieViewModel[]>(preparedSql, bindings);
    const updatedMovie = queryResultsArr.at(-1) as MovieViewModel;

    await mySqlConnection.end();

    return updatedMovie;
  };
