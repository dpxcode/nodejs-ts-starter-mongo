import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import  { badRequestRes }  from '../../../helpers/v1/response.helper';
import { findUserByEmail } from './user.resource';

export const validateCreateUser = async(req: Request, res: Response, next: NextFunction) => {
    
    // Define the validation rules
    await check('name')
        .notEmpty()
        .withMessage('Name is required')
        .run(req);
    await check('email')
        .isEmail()
        .withMessage('Email is invalid')
        .run(req);
    await check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .run(req);

    // Validate and return error if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        badRequestRes('Validation failed', res, errors.array());
    }

    // check if email already exists in the database
    const user = await findUserByEmail(req.body.email);
    if (user) {
        badRequestRes('invalid data', res, {
            error: "Email already exists"
        });
    }
    
    next();
}
