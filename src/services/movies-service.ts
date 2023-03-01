import mysql from 'mysql2/promise';
import config from '../config';
import { MovieModel } from '../controllers/movies-controller/types';

type MoviesQuerySettings = undefined | {
    movieId: string
};

type MoviesQueryResult<T extends MoviesQuerySettings> =
    T extends undefined ? MovieModel[] : MovieModel;

const MOVIES_QUERY_SQL_SELECT = `
SELECT 
    m.id, 
    m.title, 
    JSON_OBJECT('country', l.country) as location,
    m.price,
    m.rating,
    IF (COUNT(i.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(i.src)) as images
FROM images as i
LEFT JOIN movies as m
on i.movieId = m.id
LEFT JOIN locations as l
on m.locationId = l.id\n`;
const MOVIES_QUERY_SQL_GROUP = 'GROUP BY m.id;';
const MOVIES_QUERY_SQL_WHERE_ID = 'WHERE m.id = ?';

const MoviesQuery = async <T extends MoviesQuerySettings = undefined>(
    settings?: T,
    ) => {
        const mySqlConnection = await mysql.createConnection(config.db);
        let result: MovieModel | MovieModel[];

        if (settings === undefined) {
            const [movies] = await mySqlConnection.query<MovieModel[]>(
                [MOVIES_QUERY_SQL_SELECT, MOVIES_QUERY_SQL_GROUP].join('\n'),
            );

        result = movies;
        } else {
        const preparedSql = [
            MOVIES_QUERY_SQL_SELECT,
            MOVIES_QUERY_SQL_WHERE_ID,
            MOVIES_QUERY_SQL_GROUP,
        ].join('\n');
        const preparedSqlData = [settings.movieId];

        const [movies] = await mySqlConnection.query<MovieModel[]>(preparedSql, preparedSqlData);

        if (movies.length === 0) {
            throw new Error(`movie with id <${settings.movieId}> was not found`);
        }
        const [movie] = movies;

        result = movie;
    }
    await mySqlConnection.end();

    return result as MoviesQueryResult<T>;
};

const getMovies = async (): Promise<MovieModel[]> => {
    const movies = await MoviesQuery();

  return movies;
};

const getMovie = async (id: string): Promise<MovieModel> => {
    const movie = await MoviesQuery({ movieId: id });

    return movie;
};

const MovieService = {
    getMovie,
    getMovies,
};

export default MovieService;
