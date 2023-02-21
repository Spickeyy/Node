import { RequestHandler } from 'express';

type ResponseError = {
    error: string
};

type Movie = {
  id: number,
  title: string,
};

const movies: Movie[] = [
  { id: 1, title: 'Movie 1' },
  { id: 2, title: 'Movie 2' },
  { id: 3, title: 'Movie 3' },
  { id: 4, title: 'Movie 4' },
];

export const getMovies: RequestHandler<

    {},
    Movie[],
    {},
    {}

> = (req, res) => {
  res.status(200).json(movies);
};

export const createMovie: RequestHandler<

    {},
    Movie | ResponseError,
    { title: string | undefined },
    {}

> = (req, res) => {
  const title = req.body?.title;
  if (title === undefined) {
    res.status(400).json({ error: 'title is required in request body' });
    return;
  }

  const newMovie = { id: 5, title };
  movies.push(newMovie);
  res.status(201).json(newMovie);
};
