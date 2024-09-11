import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase-admin/auth';
import ResponseHelper from '../../helpers/v1/response.helper';

const responseHelper = new ResponseHelper();

interface AuthenticatedRequest extends Request {
  authToken?: string | null;
  uid?: string;
  currentToken?: string;
}

/**
 * Default unauthorized response
 */
const keepOut = (res: Response, errorInfo?: any): void => {
  let message = "Sorry, you're not authorized to access that.";
  if (errorInfo && errorInfo.code && errorInfo.code === "auth/id-token-expired") {
    message = "Authorization token has expired.";
  }
  responseHelper.unauthorized(message, res);
};

/**
 * Splits the authorization header, removes the "Bearer" prefix
 */
const getAuthToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};

/**
 * Authenticates the Bearer token with Firebase using verifyIdToken
 * 
 * adds the uid to the request for safe use in the app
 * 
 */
export const checkAuthentication = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      if (!authToken) {
        throw new Error('No auth token');
      }
      const userInfo = await getAuth().verifyIdToken(authToken);
      req.uid = userInfo.uid; // adds the uid to the request for safe use in the app
      req.currentToken = authToken;
      return next();
    } catch (e) {
      keepOut(res, (e as any).errorInfo);
    }
  });
};
