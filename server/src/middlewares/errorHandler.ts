import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { MongoError } from 'mongodb';
import { StatusCodes } from '../constants/statusCodes';

const errorHandler = (
    err: Error.ValidationError | ErrorRequestHandler | MongoError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const defaultError = {
        // @ts-ignore
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        // @ts-ignore
        msg: err.message || 'Something went wrong, try again later',
    };

    res.status(defaultError.statusCode).json({ message: defaultError.msg });
};

export { errorHandler };
