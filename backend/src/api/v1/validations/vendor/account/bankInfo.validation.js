import Joi from "joi"
const bankInfoValidation = ({ title, number, name, branch, routing_number, IBAN, tax_category }) => {
    const joiSchema = Joi.object().keys({
        title: Joi.string().required()
            .messages({
                "string.base": `Bank Account Title should be a type of String`,
                "any.required": `Bank Account Title is Required.`,
            }),
        number: Joi.number().required()
            .messages({
                "number.base": `Bank Account Number should be a type of Number`,
                "any.required": `Bank Account Number is Required.`,
            }),
        name: Joi.string().required()
            .messages({
                "string.base": `Bank Name  should be a type of String`,
                "any.required": `bank Name is Required.`,
            }),
        branch: Joi.string().required()
            .messages({
                "string.base": `Bank Branch should be a type of String`,
                "any.required": `Bank Branch is Required.`,
            }),
        routing_number: Joi.string()
            .messages({
                "number.base": `Bank Routing Number should be a type of Number`,
            }),
        IBAN: Joi.string(),
        tax_category: Joi.string()
            .messages({
                "string.base": `Tax Category should be a type of String`,
            }),
    })
    const { value, error } = joiSchema.validate({ title, number, name, branch, routing_number, IBAN, tax_category }, { escapeHtml: true })
    return { value, error }
}

export { bankInfoValidation }