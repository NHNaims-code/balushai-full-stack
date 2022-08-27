import Joi from 'joi';

const phoneAndOtpValidation = ({ otp, phone }) => {
    const joiSchema = Joi.object().keys({
        otp: Joi.string().regex(/^\s*\d{6}(?:\s*,\s*\d{6})*\s*$/).required()
            .messages({
                "string.base": `OTP should be a type of Number`,
                "string.pattern.base": `Please Enter the Valid OTP! `,
                "string.empty": `OTP cannot be an empty field`,
                "any.required": `OTP is required.`,
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
    otp = otp?.toString();
    const { value, error } = joiSchema.validate({ otp, phone }, { escapeHtml: true })
    return { value, error }
}

export { phoneAndOtpValidation }