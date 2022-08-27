import Joi from "joi"
const reportReviewValidation = (report, review_id) => {
    const joiSchema = Joi.object().keys({
        report: Joi.object().keys({
            report_type: Joi.string().required()
                .messages({
                    "string.base": `Review Report Type should be type of String`,
                    "any.required": `Review Report Type is Required.`,
                }),
            description: Joi.string().required()
                .messages({
                    "string.base": `Review Report Description should be type of String`,
                    "any.required": `Review Report Description is Required.`,
                }),
        }).required()
            .messages({
                "any.required": `Report  is Required.`
            }),
        review_id: Joi.string().hex().length(24).required()
            .messages({
                "string.base": `Review ID should be type of ObjectID`,
                "any.required": `Review ID is Required.`
            }),
    })
    const { value, error } = joiSchema.validate({ report, review_id }, { escapeHtml: true })
    return { value, error }
}

export { reportReviewValidation }