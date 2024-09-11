
import { Request, Response } from 'express';
import  ResponseHelper  from '../../../helpers/v1/response.helper';
const responseHelper = new ResponseHelper();
import {createUser } from './user.resource';

export const createOne = async (req: Request, res: Response) => {
    const body = req.body;
    const user = await createUser(body);
    responseHelper.created('User created successfully', res, user);
};
