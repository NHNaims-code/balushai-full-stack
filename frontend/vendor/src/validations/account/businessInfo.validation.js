import Joi from "joi"
const businessInfoValidation = ({ owner_name, address1, address2, city_or_town, country, PCN, BRN, tin_number, division, city, post_code }) => {
    const joiSchema = Joi.object().keys({
        owner_name: Joi.string()
            .messages({
                "string.base": `Owner Name should be a type of String`,
            }),
        address1: Joi.string().required()
            .messages({
                "any.required": `Address is Required.`,
            }),
        address2: Joi.string(),
        city_or_town: Joi.string().required()
            .messages({
                "string.base": `City/Town  should be a type of String`,
                "any.required": `City/Town is Required.`,
            }),
        country: Joi.string().required()
            .messages({
                "string.base": `Country/Region should be a type of String`,
                "any.required": `Country/Region is Required.`,
            }),
        PCN: Joi.string().required()
            .messages({
                "string.base": `Person in Charge Name should be a type of String`,
                "any.required": `Person in Charge Name is Required.`,
            }),
        BRN: Joi.number().required()
            .messages({
                "number.base": `Business Registration Number should be a type of Number`,
                "any.required": `Business Registration Number is Required.`,
            }),
        tin_number: Joi.number()
            .messages({
                "number.base": `TIN Number should be a type of Number`,
            }),
        division: Joi.string().required()
            .messages({
                "string.base": `Division should be a type of String`,
                "any.required": `Division is Required.`,
            }),
        city: Joi.string().required()
            .messages({
                "string.base": `City should be a type of String`,
                "any.required": `City is Required.`,
            }),
        post_code: Joi.string().required()
            .messages({
                "string.base": `Post Code should be a type of String`,
                "any.required": `Post Code is Required.`,
            }),
    })
    const { value, error } = joiSchema.validate({ owner_name, address1, address2, city_or_town, country, PCN, BRN, tin_number, division, city, post_code }, { escapeHtml: true })
    return { value, error }
}

export { businessInfoValidation }