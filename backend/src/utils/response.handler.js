"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendFileSuccess = void 0;
const sendFileSuccess = (res, buffer, filename) => {
    return res
        .set({
        'Content-Disposition': `attachment; filename=${filename}`,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Length': buffer.length.toString(),
    })
        .status(200)
        .send(buffer);
};
exports.sendFileSuccess = sendFileSuccess;
const sendError = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: message,
        timestamp: new Date().toISOString(),
    });
};
exports.sendError = sendError;
//# sourceMappingURL=response.handler.js.map