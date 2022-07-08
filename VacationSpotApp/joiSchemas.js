const BaseJoi=require('joi')
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)
const campSchema=Joi.object({
    camp:Joi.object({
        title:Joi.string()
        .required(),
        location:Joi.string()
        .required(),
        price:Joi.number()
        .required(),
        description:Joi.string()
        .required()
    }).required()
})
const reviewSchema=Joi.object({
    review:Joi.object({
        msg:Joi.string()
        .required(),
        rating:Joi.number()
        .required()
        .min(1)
    }).required()
})

exports.campSchema=campSchema
exports.reviewSchema=reviewSchema