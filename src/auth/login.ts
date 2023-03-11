import { RequestHandler } from 'express';
import { AuthBodyPartial, AuthSuccessResponse } from './types';

export const login: RequestHandler<
    {},
    AuthSuccessResponse | ErrorResponse,
    AuthBodyPartial,
    {}

> = (req, res) => {
    const credentials = req.body;

    res.status(200).json(req.body as AuthSuccessResponse);
};
