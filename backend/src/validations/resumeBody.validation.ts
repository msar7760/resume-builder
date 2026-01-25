import Joi from 'joi';

// Reusable primitives
const dateString = Joi.string().pattern(/^\d{4}-\d{2}$/); // YYYY-MM
const url = Joi.string().uri();

//Resume Body Schema
export const resumeBodySchema = Joi.object({
    personal: Joi.object({
        fullName: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(7).max(20).required(),
        location: Joi.string().max(100).required(),
        linkedin: url.optional(),
        website: url.optional(),
    }).required(),

    summary: Joi.string().max(1000).required(),

    experience: Joi.array()
        .items(
            Joi.object({
                company: Joi.string().max(100).required(),
                role: Joi.string().max(100).required(),
                startDate: dateString.required(),
                endDate: Joi.alternatives().try(dateString, Joi.string().valid('Present')).required(),
                bullets: Joi.array()
                    .items(Joi.string().max(300))
                    .min(1)
                    .required(),
                skills: Joi.string().max(1000).required()
            })
        )
        .min(1)
        .required(),

    education: Joi.array()
        .items(
            Joi.object({
                institution: Joi.string().max(150).required(),
                degree: Joi.string().max(150).required(),
                year: Joi.string().pattern(/^\d{4}$/).required(),
            })
        )
        .min(1)
        .required(),

    technicalSkills: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().max(100).required(),
                years: Joi.string().max(20).required() // Matches "7 Jahre" from image
            })
        )
        .min(1)
        .required(),

    softSkills: Joi.array().items(Joi.string().max(50)).min(1).optional(),

    awards: Joi.array().items(
        Joi.object({
            title: Joi.string().required(),
            issuer: Joi.string().required(),
            year: Joi.string().pattern(/^\d{4}$/).required(),
        })
    ).optional(),

    research: Joi.array().items(
        Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            link: Joi.string().uri().optional(),
        })
    ).optional(),

    // Add this new section for languages
    languages: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().required(),
                level: Joi.string().required() // Matches "Native" or "Fluent"
            })
        )
        .optional(),
}).required();
