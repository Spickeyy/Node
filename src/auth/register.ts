import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';
import UserModel from './model';
import { AuthSuccessResponse, RegistrationData } from './types';
import registrationDataValidationSchema from './validation-schemas/registration-data-validation-schema';

export const register: RequestHandler<
    {},
    AuthSuccessResponse | ErrorResponse,
    Partial<RegistrationData>,
    {}
> = async (req, res) => {
    try {
        const registrationData = registrationDataValidationSchema.validateSync(req.body, {
            abortEarly: false,
        });

        const user = await UserModel.createUser({
            email: registrationData.email,
            password: registrationData.password,
            name: registrationData.name,
            surname: registrationData.surname,

        });

        res.status(200).json(user as unknown as AuthSuccessResponse);
    } catch (err) {
        const [status, errorResponse] = ErrorService.handleError(err);
        res.status(status).json(errorResponse);
    }
};
