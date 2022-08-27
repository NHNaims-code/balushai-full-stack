import Joi from 'joi';

const phoneNumberValidation = ({ phone }) => {
    const joiSchema = Joi.object().keys({
        phone: Joi.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/).required()
            .messages({
                "string.base": `Phone should be a type of Number`,
                "string.pattern.base": `Please Enter the Valid BD Phone number! `,
                "string.empty": `Phone cannot be an empty field`,
                "any.required": `Phone is required.`,
            }),
    })
    phone = phone?.toString();
    const { value, error } = joiSchema.validate({ phone }, { escapeHtml: true })
    return { value, error }
}

export { phoneNumberValidation }