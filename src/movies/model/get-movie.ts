import mysql from 'mysql2/promise';
import config from 'config';
import { NotFoundError } from 'services/error-service';
import { MovieViewModel } from '../types';
import SQL from './sql';

export const getMovie = async (id: string): Promise<MovieViewModel> => {
    const mySqlConnection = await mysql.createConnection(config.db);

    const preparedSql = `
    ${SQL.SELECT}
    WHERE m.id = ?
    ${SQL.GROUP};
    `;

    const preparedSqlData = [id];
    const [movies] = await mySqlConnection.query<MovieViewModel[]>(preparedSql, preparedSqlData);

    mySqlConnection.end();

    if (movies.length === 0) {
      throw new NotFoundError(`movie with id <${id}> was not found`);
    }

    return movies[0];
  };
