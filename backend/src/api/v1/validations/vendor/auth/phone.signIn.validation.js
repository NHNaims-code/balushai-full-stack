import Joi from 'joi';

const phoneSignInValidation = ({ phone, password }) => {
    const joiSchema = Joi.object().keys({
        phone: Joi.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/).required()
            .messages({
                "string.base": `Invalid Credentials`,
                "string.pattern.base": `Invalid Credentials `,
                "string.empty": `Invalid Credentials`,
                "any.required": `Phone is required.`,
            }),
        password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/).min(6).required()
            .messages({
                "string.base": `Invalid Credentials`,
                "string.pattern.base": `Invalid Credentials`,
                "string.empty": `Invalid Credentials`,
                "any.required": `Password is Required.`,
            }),
    })
    phone = phone?.toString();
    const { value, error } = joiSchema.validate({ phone, password }, { escapeHtml: true })
    return { value, error }
}

export { phoneSignInValidation }