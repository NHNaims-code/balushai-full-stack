import Joi from "joi"
const wareHouseAddressValidation = ({ name, address, phone, city_or_town, country, division, city, post_code }) => {
    const joiSchema = Joi.object().keys({
        name: Joi.string()
            .messages({
                "string.base": `First & Last name  should be a type of String`,
            }),
        address: Joi.string().required()
            .messages({
                "string.base": `Warehouse Address should be a type of String`,
                "any.required": `Warehouse Address is Required.`,
            }),
        phone: Joi.string().regex(/^(?:\+88|88)?(1[3-9]\d{8})$/).required()
            .messages({
                "string.base": `Phone should be a type of Number`,
                "string.pattern.base": `Please Enter the Valid BD Phone number! `,
                "string.empty": `Phone cannot be an empty field`,
                "any.required": `Phone is required.`,
            }),
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
    const { value, error } = joiSchema.validate({ name, address, phone, city_or_town, country, division, city, post_code  }, { escapeHtml: true })
    return { value, error }
}

export { wareHouseAddressValidation }