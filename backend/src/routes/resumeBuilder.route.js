"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resumeBuilder_controller_1 = require("../controllers/resumeBuilder.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const resumeBody_validation_1 = require("../validations/resumeBody.validation");
const router = (0, express_1.Router)();
router.post('/generate', (0, validate_middleware_1.validate)({ body: resumeBody_validation_1.resumeBodySchema }), resumeBuilder_controller_1.createResume);
exports.default = router;
//# sourceMappingURL=resumeBuilder.route.js.map