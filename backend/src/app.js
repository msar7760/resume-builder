"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middlewares/error.middleware");
const resumeBuilder_route_1 = __importDefault(require("./routes/resumeBuilder.route"));
function createApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/api', resumeBuilder_route_1.default);
    app.use(error_middleware_1.globalErrorHandler);
    return app;
}
exports.default = createApp;
//# sourceMappingURL=app.js.map