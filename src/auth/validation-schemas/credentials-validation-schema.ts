import * as yup from 'yup';
import { Credentials } from '../types';

const credentialsValidationSchema: yup.ObjectSchema<Credentials> = yup.object({
email: yup.string()
    .required('Email is required')
    .email('Incorrect email format'),

password: yup.string()
    .required('Password is required')
    .min(2, 'Password must have at least 2 symbols')
    .max(32, 'Password can\'t have more than 32 symbols')
    .matches(/[A-Z]{1}/, 'Password must have at least one capital letter')
    .matches(/[a-z]{1}/, 'Password must have at least one lower case letter')
    .matches(/[0-9]{1}/, 'Password must have at least one digit')
    .matches(/[#?!@$%^&*-]{1}/, 'Password must have at least one special symbol'),

}).strict(true);

export default credentialsValidationSchema;
