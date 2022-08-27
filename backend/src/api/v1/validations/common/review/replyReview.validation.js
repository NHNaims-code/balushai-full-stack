import Joi from "joi"
const replyReviewValidation = (reply, review_id) => {
    const joiSchema = Joi.object().keys({
        reply: Joi.object().keys({
            description: Joi.string().required()
                .messages({
                    "string.base": `Review Reply Description should be type of String`,
                    "any.required": `Review Reply Description is Required.`,
                }),
        }).required()
            .messages({
                "any.required": `Reply  is Required.`
            }),
        review_id: Joi.string().hex().length(24).required()
            .messages({
                "string.base": `Review ID should be type of ObjectID`,
                "any.required": `Review ID is Required.`
            }),
    })
    const { value, error } = joiSchema.validate({ reply, review_id }, { escapeHtml: true })
    return { value, error }
}

export { replyReviewValidation }