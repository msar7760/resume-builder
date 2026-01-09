import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
interface ValidationSchema {
    body?: Schema;
    query?: Schema;
    params?: Schema;
}
export declare const validate: (schemas: ValidationSchema) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=validate.middleware.d.ts.map