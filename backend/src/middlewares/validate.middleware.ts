import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { badRequest } from '../utils/api.error';

// Define an interface for the validation object
interface ValidationSchema {
  body?: Schema;
  query?: Schema;
  params?: Schema;
}

export const validate = (schemas: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const keys: (keyof ValidationSchema)[] = ['body', 'query', 'params'];

    for (const key of keys) {
      const schema = schemas[key];
      if (schema) {
        const { error, value } = schema.validate(req[key], {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) {
          const errorMessage = error.details
            .map((details) => details.message.replace(/"/g, ''))
            .join(', ');

          // Identify which part failed (e.g., "body: Title is required")
          return next(badRequest(`${key}: ${errorMessage}`));
        }

        // Replace the original req object with the validated/sanitized value
        req[key] = value;
      }
    }

    return next();
  };
};
