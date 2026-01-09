import { Response } from 'express';

export const sendFileSuccess = (
    res: Response,
    buffer: Buffer,
    filename: string
) => {
  return res
      .set({
        'Content-Disposition': `attachment; filename=${filename}`,
        'Content-Type':
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Length': buffer.length.toString(),
      })
      .status(200)
      .send(buffer);
};

export const sendError = (res: Response, message: string, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: message,
    timestamp: new Date().toISOString(),
  });
};
