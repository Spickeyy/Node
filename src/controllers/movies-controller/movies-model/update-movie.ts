import mysql from 'mysql2/promise';
import config from '../../../config';
import { colonObjectQueryFormat } from '../../../services/my-sql';
import { MovieViewModel, PartialMovieData } from '../types';
import SQL from './sql';

export const updateMovie = async (
    id: string,
    movieData: PartialMovieData,
    ): Promise<MovieViewModel> => {
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
      
      ${SQL.SELECT}
      WHERE m.id = :id
      ${SQL.GROUP}
    `.trim();

    const bindings = {
      id,
      ...imagesBindings,
      ...movieData.location,
      title: movieData.title,
      rating: movieData.rating,
      price: movieData.price,
    };

    const [queryResultsArr] = await mySqlConnection.query<MovieViewModel[]>(preparedSql, bindings);
    const updatedMovie = queryResultsArr.at(-1) as MovieViewModel;

    await mySqlConnection.end();

    return updatedMovie;
  };
