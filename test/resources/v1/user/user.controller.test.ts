import { Request, Response } from 'express';
import { createOne } from '../../../../src/resources/v1/user/user.controller';
import { createUser } from '../../../../src/resources/v1/user/user.resource';
import { createdRes } from '../../../../src/helpers/v1/response.helper';

jest.mock('../../../../src/resources/v1/user/user.resource');
jest.mock('../../../../src/helpers/v1/response.helper');

describe('UserController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {
            body: { name: 'John Doe', email: 'john@example.com', password: 'password123' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        process.env.API_VER = '1.0'; // Mock the API version
    });

    it('should create a user successfully', async () => {
        const mockUser = { name: 'John Doe', email: 'john@example.com', id: '1' };
        (createUser as jest.Mock).mockResolvedValue(mockUser);

        // Mock createdRes to call res.send
        (createdRes as jest.Mock).mockImplementation((msg, res, data) => {
            res.status(201).send({
                api_ver: process.env.API_VER,
                msg,
                data
            });
        });

        await createOne(req as Request, res as Response);

        expect(createUser).toHaveBeenCalledWith(req.body);
        expect(createUser).toHaveReturnedWith(Promise.resolve(mockUser));
        expect(createdRes).toHaveBeenCalledWith('User created successfully', res, mockUser);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
            api_ver: '1.0',
            msg: 'User created successfully',
            data: mockUser
        });
    });

    // Add more test cases as needed
});