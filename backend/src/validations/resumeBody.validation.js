"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumeBodySchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Reusable primitives
const dateString = joi_1.default.string().pattern(/^\d{4}-\d{2}$/); // YYYY-MM
const url = joi_1.default.string().uri();
//Resume Body Schema
exports.resumeBodySchema = joi_1.default.object({
    personal: joi_1.default.object({
        fullName: joi_1.default.string().min(2).max(100).required(),
        email: joi_1.default.string().email().required(),
        phone: joi_1.default.string().min(7).max(20).required(),
        location: joi_1.default.string().max(100).required(),
        linkedin: url.optional(),
        website: url.optional(),
    }).required(),
    summary: joi_1.default.string().max(1000).required(),
    experience: joi_1.default.array()
        .items(joi_1.default.object({
        company: joi_1.default.string().max(100).required(),
        role: joi_1.default.string().max(100).required(),
        startDate: dateString.required(),
        endDate: joi_1.default.alternatives().try(dateString, joi_1.default.string().valid('Present')).required(),
        bullets: joi_1.default.array()
            .items(joi_1.default.string().max(300))
            .min(1)
            .required(),
    }))
        .min(1)
        .required(),
    education: joi_1.default.array()
        .items(joi_1.default.object({
        institution: joi_1.default.string().max(150).required(),
        degree: joi_1.default.string().max(150).required(),
        year: joi_1.default.string().pattern(/^\d{4}$/).required(),
    }))
        .min(1)
        .required(),
    skills: joi_1.default.array()
        .items(joi_1.default.string().max(50))
        .min(1)
        .required(),
}).required();
//# sourceMappingURL=resumeBody.validation.js.map