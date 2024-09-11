import { Response } from 'express';

export const successRes = async (msg: string, res: Response, payload?: any): Promise<void> => {
    sendResponse(200, msg, res, payload);
};

export const createdRes = async (msg: string, res: Response, payload?: any): Promise<void> => {
    sendResponse(201, msg, res, payload);
};

export const noContentRes = async (msg: string, res: Response, payload?: any): Promise<void> => {
    sendResponse(204, msg, res, payload);
};

export const badRequestRes = async (msg: string, res: Response, payload?: any): Promise<void> => {
    sendResponse(400, msg, res, payload);
};

export const unauthorizedRes = async (msg: string, res: Response, payload?: any): Promise<void> => {
    sendResponse(401, msg, res, payload);
};

export const forbiddenRes = async (msg: string, res: Response, payload?: any): Promise<void> => {
    sendResponse(403, msg, res, payload);
};

export const notFoundRes = async (msg: string, res: Response, payload?: any): Promise<void> => {
    sendResponse(404, msg, res, payload);
};

export const exceptionRes = async (msg: string, res: Response, payload?: any): Promise<void> => {
    sendResponse(500, msg, res, payload);
};

export const customRes = async (code: number, msg: string, res: Response, payload?: any): Promise<void> => {
    sendResponse(code, msg, res, payload);
};

const sendResponse = async (code: number, msg: string, res: Response, payload?: any): Promise<void> => {
    if (!payload) {
        res.status(code).send({
            api_ver: process.env.API_VER,
            msg: msg,
        });
    } else {
        res.status(code).send({
            api_ver: process.env.API_VER,
            msg: msg,
            data: payload,
        });
    }
};