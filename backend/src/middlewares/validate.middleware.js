"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const api_error_1 = require("../utils/api.error");
const validate = (schemas) => {
    return (req, res, next) => {
        const keys = ['body', 'query', 'params'];
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
                    return next((0, api_error_1.badRequest)(`${key}: ${errorMessage}`));
                }
                // Replace the original req object with the validated/sanitized value
                req[key] = value;
            }
        }
        return next();
    };
};
exports.validate = validate;
//# sourceMappingURL=validate.middleware.js.map