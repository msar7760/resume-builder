class BaseApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const createError = (statusCode: number, message: string) => {
  return new BaseApiError(statusCode, message);
};

export const badRequest = (msg = 'Invalid Request') => createError(400, msg);
export const unauthorized = (msg = 'Unauthorized') => createError(401, msg);
export const forbidden = (msg = 'Forbidden') => createError(403, msg);
export const notFound = (msg = 'Resource not found') => createError(404, msg);
export const internal = (msg = 'Internal Server Error') => createError(500, msg);
