import { Response } from 'express';

class ResponseHelper {

    async success(msg: string, res: Response, payload?: any): Promise<void> {
        this.sendResponse(200, msg, res, payload);
    };

    async created(msg: string, res: Response, payload?: any): Promise<void> {
        this.sendResponse(201, msg, res, payload);
    };

    async noContent(msg: string, res: Response, payload?: any): Promise<void> {
        this.sendResponse(204, msg, res, payload);
    };

    async badRequest(msg: string, res: Response, payload?: any): Promise<void> {
        this.sendResponse(400, msg, res, payload);
    };

    async unauthorized(msg: string, res: Response, payload?: any): Promise<void> {
        this.sendResponse(401, msg, res, payload);
    };

    async forbidden(msg: string, res: Response, payload?: any): Promise<void> {
        this.sendResponse(403, msg, res, payload);
    };

    async notFound(msg: string, res: Response, payload?: any): Promise<void> {
        this.sendResponse(404, msg, res, payload);
    }

    async exception(msg: string, res: Response, payload?: any): Promise<void> {
        this.sendResponse(500, msg, res, payload);
    }

    async custom(code: number, msg: string, res: Response, payload?: any): Promise<void> {
        this.sendResponse(code, msg, res, payload);
    }

    async sendResponse(code: number, msg: string, res: Response, payload?: any): Promise<void> {
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
    }
}

export default ResponseHelper;