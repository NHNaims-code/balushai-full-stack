import Joi from "joi"
const returnAddressValidation = ({ name, address, phone, city_or_town, country, division, city, post_code }) => {
    const joiSchema = Joi.object().keys({
        name: Joi.string()
            .messages({
                "string.base": `First & Last name  should be a type of String`,
            }),
        address: Joi.string()
            .messages({
                "string.base": `Warehouse Address should be a type of String`,
            }),
        phone: Joi.string().regex(/^(?:\+88|88)?(1[3-9]\d{8})$/)
            .messages({
                "string.pattern.base": `Please Enter the Valid BD Phone number! `,
            }),
        city_or_town: Joi.string()
            .messages({
                "string.base": `City/Town  should be a type of String`,
            }),
        country: Joi.string()
            .messages({
                "string.base": `Country/Region should be a type of String`,
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
    phone = phone?.toString();
    const { value, error } = joiSchema.validate({ name, address, phone, city_or_town, country, division, city, post_code }, { escapeHtml: true })
    return { value, error }
}

export { returnAddressValidation }