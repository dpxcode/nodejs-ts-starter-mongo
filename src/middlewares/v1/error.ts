import winston from 'winston';
import 'express-async-errors';
import { Request, Response, NextFunction } from 'express';
import  ResponseHelper  from './../../helpers/v1/response.helper';
const responseHelper = new ResponseHelper();

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    responseHelper.exception("there was an error processing the request", res, { error: err.message});
};

export default errorMiddleware;