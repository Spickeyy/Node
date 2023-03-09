import mysql from 'mysql2/promise';
import config from '../../../config';
import { MovieViewModel } from '../types';

export const deleteMovie = async (id: string): Promise<void> => {
    const mySqlConnection = await mysql.createConnection(config.db);

    const preparedSql = `
      DELETE FROM images WHERE movieId = ?;
      DELETE from movies WHERE id = ?;
      `;
    const preparedSqlData = [id, id];

    await mySqlConnection.query<MovieViewModel[]>(preparedSql, preparedSqlData);

    mySqlConnection.end();
  };
