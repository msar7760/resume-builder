"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResume = void 0;
const generateDocx_util_1 = require("../utils/generateDocx.util");
const createResume = async (jsonContent) => {
    return await (0, generateDocx_util_1.generateResumeDocx)(jsonContent);
};
exports.createResume = createResume;
//# sourceMappingURL=resumeBuilder.service.js.map