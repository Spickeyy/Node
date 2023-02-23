import * as yup from 'yup';
import { PartialMovieData } from '../types';
import imagesSchema from './property-schemas/images-schema';
import locationSchema from './property-schemas/location-schema';
import priceSchema from './property-schemas/price-schema';
import ratingSchema from './property-schemas/rating-schema';
import titleSchema from './property-schemas/title-schema';

const partialMovieDataValidationSchema: yup.ObjectSchema<PartialMovieData> = yup.object({
  title: titleSchema,
  price: priceSchema(),
  rating: ratingSchema,
  images: imagesSchema,
  location: locationSchema,
}).strict(true);

export default partialMovieDataValidationSchema;
