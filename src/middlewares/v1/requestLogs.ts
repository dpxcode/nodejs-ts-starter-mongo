import { Request, Response, NextFunction } from 'express';
import RequestLog from '../../resources/v1/common/requestLog.model';

interface LogBody {
    [key: string]: any;
}

interface RequestData {
    host: string | undefined;
    method: string;
    api_token: string | undefined;
    user_agent: string | undefined;
    base_url: string;
    full_url: string;
    ip: string;
    route: string;
    body: LogBody;
}

export default class RequestLogMiddleware {
    async logRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log('RequestLogMiddleware@logRequest');
        let logBody: LogBody = {};
        logBody = Object.assign(logBody, req.body);

        let requestData: RequestData = {
            host: req.get('host'),
            method: req.method,
            api_token: req.headers['api-token'] as string | undefined,
            user_agent: req.headers['user-agent'],
            base_url: req.baseUrl,
            full_url: req.originalUrl,
            ip: req.ip,
            route: req.route?.path || '',
            body: logBody,
        };

        await RequestLog.create(requestData);

        next();
    }
}