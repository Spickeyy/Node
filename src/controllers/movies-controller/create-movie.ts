import { RequestHandler } from 'express';
import * as yup from 'yup';
import MovieModel from './movie-model';
import movies from './movies-data';

type MovieData = Omit<MovieModel, 'id'>;

const movieDataValidationSchema: yup.ObjectSchema<MovieData> = yup.object({
  title: yup.string()
    .required('title is required')
    .min(2, 'title must have at least 2 symbols')
    .max(32, 'title can\'t have more than 32 symbols'),
  price: yup.number()
   .required('price is required')
    .positive('price must be positive')
    .test(
      'isPrice',
      'incorrect price format',
     (val) => Number(val.toFixed(2)) === val,
  ),
  rating: yup.number()
    .required('rating is required')
    .positive('rating must be positive')
    .min(1, 'rating must be at least 1')
    .max(5, 'rating must can\'t be more than 5'),
  images: yup.array(yup.string().required())
    .required('images are required')
    .min(1, 'images must have at least one image'),
  location: yup
    .object({
      country: yup.string()
        .required('location.title is required')
        .min(1, 'location.title must be at least 1')
        .max(5, 'location.title must can\'t be more than 5'),
  })
  .required('location is required'),
});

export const isMovieData = (
    potentialMovieData: PartialMovieData | MovieData,
    ): potentialMovieData is MovieData => {
      try {
        movieDataValidationSchema.validateSync(potentialMovieData);
        return true;
      } catch (error) {
        return false;
      }
  };

type PartialMovieData = PartialRecursive<MovieData>;

export const createMovie: RequestHandler<
    {},
    MovieModel | ResponseError,
    PartialMovieData,
    {}
> = (req, res) => {
  const movieData = req.body;
  if (!isMovieData(movieData)) {
    res.status(400).json({ error: 'Incorrect data' });
    return;
  }

  const newMovie: MovieModel = { id: '5', ...movieData };
  movies.push(newMovie);
  res.status(201).json(newMovie);
};
