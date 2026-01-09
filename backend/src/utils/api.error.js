"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internal = exports.notFound = exports.forbidden = exports.unauthorized = exports.badRequest = exports.createError = void 0;
class BaseApiError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
const createError = (statusCode, message) => {
    return new BaseApiError(statusCode, message);
};
exports.createError = createError;
const badRequest = (msg = 'Invalid Request') => (0, exports.createError)(400, msg);
exports.badRequest = badRequest;
const unauthorized = (msg = 'Unauthorized') => (0, exports.createError)(401, msg);
exports.unauthorized = unauthorized;
const forbidden = (msg = 'Forbidden') => (0, exports.createError)(403, msg);
exports.forbidden = forbidden;
const notFound = (msg = 'Resource not found') => (0, exports.createError)(404, msg);
exports.notFound = notFound;
const internal = (msg = 'Internal Server Error') => (0, exports.createError)(500, msg);
exports.internal = internal;
//# sourceMappingURL=api.error.js.map