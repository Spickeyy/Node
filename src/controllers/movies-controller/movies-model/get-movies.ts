import mysql from 'mysql2/promise';
import config from 'config';
import { MovieViewModel } from '../types';
import SQL from './sql';

export const getMovies = async (): Promise<MovieViewModel[]> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const sql = `
  ${SQL.SELECT}
  ${SQL.GROUP}
  `;
  const [movies] = await mySqlConnection.query<MovieViewModel[]>(sql);

  mySqlConnection.end();

  return movies;
};
