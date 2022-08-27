import Joi from 'joi';

const adminSignUpValidation = ({ email, phone }) => {
    const joiSchema = Joi.object().keys({
        email: Joi.string().lowercase()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in", "co"], }, }).required()
            .messages({
                "string.base": `Email should be a type of String`,
                "string.empty": `Email cannot be an empty field`,
                "string.email": `Please enter Correct Email ["com", "net", "in", "co"]`,
                "any.required": `Email is required.`,
            }),
        phone: Joi.string().regex(/^(?:\+88|88)?(01[3-9]\d{8})$/).required()
            .messages({
                "string.base": `Phone should be a type of Number`,
                "string.pattern.base": `Please Enter the Valid BD Phone number! `,
                "string.empty": `Phone cannot be an empty field`,
                "any.required": `Phone is required.`,
            }),
    })
    phone = phone?.toString();
    const { value, error } = joiSchema.validate({ email, phone }, { escapeHtml: true })
    return { value, error }
}

export { adminSignUpValidation }