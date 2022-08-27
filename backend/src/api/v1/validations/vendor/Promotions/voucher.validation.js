import Joi from 'joi'

const voucherValidation = ({
    name,
    start_from,
    end_time,
    code,
    discount_type,
    discount_amount,
    discount_amount_percentage,
    min_amount_to_apply,
    max_discount_amount,
    total_issued_voucher,
    limit_voucher_usage_for_customer
}) => {
    const joiSchema = Joi.object().keys({
        name: Joi.string().required()
            .messages({
                "string.base": `Voucher Name should be type of String`,
                "any.required": `Voucher Name is Required.`
            }),
        start_from: Joi.date().required()
            .messages({
                "date.base": `Start From should be type of Date`,
                "any.required": `Start Date is Required.`
            }),
        end_time: Joi.date().required()
            .messages({
                "date.base": `End Time should be type of Date`,
                "any.required": `End Date is Required.`
            }),
        code: Joi.string().max(12).required()
            .messages({
                "string.base": `Voucher Code should be type of String.`,
                "any.required": `Voucher Code is Required.`
            }),
        discount_type: Joi.string().valid('MONEY_VALUE_VOUCHER', 'PERCENTAGE_VALUE_VOUCHER').required()
            .messages({
                "string.base": `Discount Type should be type of String`,
                "any.required": `Discount Type is Required.`
            }),
        discount_amount: Joi.alternatives().conditional('discount_type', { is: 'MONEY_VALUE_VOUCHER', then: Joi.number().required() })
            .messages({
                "number.base": `Discount Amount should be type of Number`,
                "any.required": `Discount Amount is required`
            }),
        discount_amount_percentage: Joi.alternatives().conditional('discount_type', { is: 'PERCENTAGE_VALUE_VOUCHER', then: Joi.number().required() })
            .messages({
                "number.base": `Discount Amount Percentage should be type of Number`,
                "any.required": `Discount Amount Percentage is required`
            }),
        min_amount_to_apply: Joi.number().required()
            .messages({
                "number.base": `Min Amount To Apply should be type of Number`,
                "any.required": `Min Amount To Apply is Required.`
            }),
        max_discount_amount: Joi.alternatives().conditional('discount_type', { is: 'PERCENTAGE_VALUE_VOUCHER', then: Joi.number().required() })
            .messages({
                "number.base": `Max Discount Amount should be type of Number`,
                "any.required": `Max Discount Amount is Required.`
            }),
        total_issued_voucher: Joi.number().required()
            .messages({
                "number.base": `Total Issued Voucher should be type of Number`,
                "any.required": `Total Issued Voucher is Required.`
            }),
        limit_voucher_usage_for_customer: Joi.number().required()
            .messages({
                "number.base": `Limit Voucher Usage For Customer should be type of Number`,
                "any.required": `Limit Voucher Usage For Customer is Required.`
            }),
    })

    const { value, error } = joiSchema.validate({
        name,
        start_from,
        end_time,
        code,
        discount_type,
        discount_amount,
        discount_amount_percentage,
        min_amount_to_apply,
        max_discount_amount,
        total_issued_voucher,
        limit_voucher_usage_for_customer
    });
    return { value, error };
}

export { voucherValidation }