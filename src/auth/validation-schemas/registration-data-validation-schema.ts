import * as yup from 'yup';
import { RegistrationData } from '../types';

const registrationDataValidationSchema: yup.ObjectSchema<RegistrationData> = yup.object({
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

    passwordConfirmation: yup.string()
        .required('Password must be confirmed')
        .oneOf([yup.ref('password')], 'passwords must match'),

    name: yup.string()
        .required('Name is required')
        .min(2, 'Name must have at least 2 symbols')
        .max(32, 'Name can\'t have more than 32 symbols'),

    surname: yup.string()
        .required('Surname is required')
        .min(2, 'Surname must have at least 2 symbols')
        .max(32, 'Surname can\'t have more than 32 symbols'),

}).strict(true);

export default registrationDataValidationSchema;
