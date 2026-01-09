"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const response_handler_1 = require("../utils/response.handler");
const globalErrorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const errorMessage = err.message || 'Unexpected error occurred';
    return (0, response_handler_1.sendError)(res, errorMessage, status);
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=error.middleware.js.map