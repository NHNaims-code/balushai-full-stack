import Joi from "joi"
const EmailSignInValidation = ({email, password}) => {
    const joiSchema = Joi.object().keys({
        email: Joi.string().lowercase()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in", "co"], }, }).required()
            .messages({
                "string.base": `Invalid Credentials`,
                "string.empty": `Email cannot be an empty field`,
                "string.email": "Please enter Correct Email",
                "any.required": `Email is Required.`,
            }),
        password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/).min(6).required()
            .messages({
                "string.base": `Invalid Credentials`,
                "string.pattern.base": `Invalid Credentials`,
                "string.empty": `Invalid Credentials`,
                "any.required": `Invalid Credentials.`,
            })
    })
    const { value, error } = joiSchema.validate({ email, password }, { escapeHtml: true })
    return { value, error }
}

export {EmailSignInValidation}