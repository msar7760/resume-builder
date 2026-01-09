import { Response, Request } from 'express';
import { sendError } from '../utils/response.handler';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: any) => {
  const status = err.statusCode || 500;
  const errorMessage = err.message || 'Unexpected error occurred';

  return sendError(res, errorMessage, status);
};
