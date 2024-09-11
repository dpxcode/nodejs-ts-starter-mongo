
import { Request, Response } from 'express';
import  { createdRes}  from '../../../helpers/v1/response.helper';
import {createUser } from './user.resource';

export const createOne = async (req: Request, res: Response) => {
    const body = req.body;
    const user = await createUser(body);
    createdRes('User created successfully', res, user);
};
