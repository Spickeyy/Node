import { RequestHandler } from 'express';
import ErrorService from 'services/error-service';
import { createAuthSuccessResponse } from './helpers/create-auth-success-response';
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
        const { passwordConfirmation, ...registrationData } = registrationDataValidationSchema
            .validateSync(req.body, { abortEarly: false });

        const emailAvailable = await UserModel.emailAvailable(registrationData.email);
        if (!emailAvailable) throw new Error(`This email '${registrationData.email}' is already in use`);

        const user = await UserModel.createUser(registrationData);

        const authSuccessResponse = createAuthSuccessResponse(user);
            res.status(200).json(authSuccessResponse);
    } catch (err) {
        const [status, errorResponse] = ErrorService.handleError(err);
            res.status(status).json(errorResponse);
    }
};
