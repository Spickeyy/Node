import * as yup from 'yup';
import { Credentials } from '../types';

const credentialsValidationSchema: yup.ObjectSchema<Credentials> = yup.object({
    email: yup.string()
        .required('Email is required')
        .email('Incorrect email format'),

    password: yup.string()
        .required('Password is required'),

}).strict(true);

export default credentialsValidationSchema;
