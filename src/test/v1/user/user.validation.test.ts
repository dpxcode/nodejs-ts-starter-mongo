import { validateCreateUser } from '../../../resources/v1/user/user.validation';    
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

describe('User Validation', () => {
    it('should validate user creation request', async () => {
        const req = {
            body: { name: 'John Doe', email: 'john@example.com', password: 'password123' }
        } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;

        await validateCreateUser(req, res, next);
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(true);
        expect(next).toHaveBeenCalled();
    });

    // Add more test cases as needed
});