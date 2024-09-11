import { Response } from 'express';
import { successRes, createdRes, noContentRes, badRequestRes, unauthorizedRes, forbiddenRes, notFoundRes, exceptionRes, customRes } from '../../../src/helpers/v1/response.helper';

describe('Response Helper', () => {
    let res: Partial<Response>;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        process.env.API_VER = '1.0'; // Mock the API version
    });

    it('should send a 200 response with successRes', async () => {
        await successRes('Success', res as Response);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            api_ver: '1.0',
            msg: 'Success'
        });
    });

    it('should send a 201 response with createdRes', async () => {
        await createdRes('Created', res as Response);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
            api_ver: '1.0',
            msg: 'Created'
        });
    });

    it('should send a 204 response with noContentRes', async () => {
        await noContentRes('No Content', res as Response);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalledWith({
            api_ver: '1.0',
            msg: 'No Content'
        });
    });

    it('should send a 400 response with badRequestRes', async () => {
        await badRequestRes('Bad Request', res as Response);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            api_ver: '1.0',
            msg: 'Bad Request'
        });
    });

    it('should send a 401 response with unauthorizedRes', async () => {
        await unauthorizedRes('Unauthorized', res as Response);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({
            api_ver: '1.0',
            msg: 'Unauthorized'
        });
    });

    it('should send a 403 response with forbiddenRes', async () => {
        await forbiddenRes('Forbidden', res as Response);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith({
            api_ver: '1.0',
            msg: 'Forbidden'
        });
    });

    it('should send a 404 response with notFoundRes', async () => {
        await notFoundRes('Not Found', res as Response);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
            api_ver: '1.0',
            msg: 'Not Found'
        });
    });

    it('should send a 500 response with exceptionRes', async () => {
        await exceptionRes('Exception', res as Response);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            api_ver: '1.0',
            msg: 'Exception'
        });
    });

    it('should send a custom response with customRes', async () => {
        await customRes(418, 'I\'m a teapot', res as Response);
        expect(res.status).toHaveBeenCalledWith(418);
        expect(res.send).toHaveBeenCalledWith({
            api_ver: '1.0',
            msg: 'I\'m a teapot'
        });
    });

    it('should send a response with payload', async () => {
        const payload = { key: 'value' };
        await successRes('Success', res as Response, payload);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            api_ver: '1.0',
            msg: 'Success',
            data: payload
        });
    });
});