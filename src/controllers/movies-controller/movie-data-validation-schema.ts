import * as yup from 'yup';
import { MovieData } from './types';

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
  }).strict(true);

export default movieDataValidationSchema;
