import * as yup from 'yup';

const locationSchema = yup
  .object({
    country: yup.string()
      .required('location.title is required')
      .min(2, 'location.title must have at least 2 symbols')
      .max(32, 'location.title can\'t have more than 32 symbols'),
  });

export default locationSchema;
