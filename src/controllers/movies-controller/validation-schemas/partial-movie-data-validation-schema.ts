import * as yup from 'yup';
import { PartialMovieData } from '../types';

const partialMovieDataValidationSchema: yup.ObjectSchema<PartialMovieData> = yup.object({

    title: yup.string()
      .min(2, 'title must have at least 2 symbols')
      .max(32, 'title can\'t have more than 32 symbols'),

    price: yup.number()
      .positive('price must be positive')
      .test(
        'isPrice',
        'incorrect price format',
       (val) => {
        if (val === undefined) return true;
        return Number(val.toFixed(2)) === val;
       },
  ),

    rating: yup.number()
      .positive('rating must be positive')
      .min(1, 'rating must be at least 1')
      .max(5, 'rating must can\'t be more than 5'),

    images: yup.array(yup.string().required())
      .min(1, 'images must have at least one image'),

    location: yup
      .object({
        country: yup.string()
          .required('location.title is required')
          .min(1, 'location.title must be at least 1')
          .max(5, 'location.title must can\'t be more than 5'),
    }),
  }).strict(true);

export default partialMovieDataValidationSchema;
