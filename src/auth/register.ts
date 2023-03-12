import { RequestHandler } from 'express';
import { AuthSuccessResponse, RegistrationData } from './types';

export const register: RequestHandler<
    {},
    AuthSuccessResponse | ErrorResponse,
    Partial<RegistrationData>,
    {}
> = async (req, res) => {
    const registrationData = req.body;

    res.status(200).json(registrationData as AuthSuccessResponse);
};
