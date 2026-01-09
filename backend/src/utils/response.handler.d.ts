import { Response } from 'express';
export declare const sendFileSuccess: (res: Response, buffer: Buffer, filename: string) => Response<any, Record<string, any>>;
export declare const sendError: (res: Response, message: string, statusCode?: number) => Response<any, Record<string, any>>;
//# sourceMappingURL=response.handler.d.ts.map