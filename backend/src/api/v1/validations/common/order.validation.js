import Joi from "joi";

const orderValidation = ({
    products,
    seller_discount,
    payment_information,
    billing_address,
    shipping_address,
}) => {
    const productSchema = Joi.object().keys({
        quantity: Joi.number().max(50).required()
            .messages({
                "number.base": `Product Quantity should be type of Number`,
                "number.max": `Product Quantity must be less than 50`,
                "any.required": `Product Quantity is Required.`
            }),
        vendor_id: Joi.string().hex().length(24).required()
            .messages({
                "string.base": `Vendor ID should be type of ObjectID`,
                "any.required": `Vendor ID is Required.`
            }),
        product_id: Joi.string().hex().length(24).required()
            .messages({
                "string.base": `Product ID should be type of ObjectID`,
                "any.required": `Product ID is Required.`
            }),
        price: Joi.number().required()
            .messages({
                "number.base": `Product Price should be type of Number`,
                "any.required": `Product Price is Required.`
            }),
        name: Joi.string().required()
            .messages({
                "string.base": `Product Name must be type of String`,
                "any.required": `Product Name is Required.`
            }),
        color: Joi.string().required()
            .messages({
                "string.base": `Product Color must be type of String`,
                "any.required": `Product Color is Required.`
            }),
        image: Joi.string().required()
            .messages({
                "string.base": `Product Image Url should be type of String`,
                "any.required": `Product Image Url is Required.`
            }),
        size: Joi.string().required()
            .messages({
                "string.base": `Product Size must be type of String`,
                "any.required": `Product Size is Required.`
            }),
        seller_sku: Joi.string()
            .messages({
                "string.base": `Product Seller SKU should be type of String`,
            }),
        shipment_fee: Joi.number().required()
            .messages({
                "number.base": `Shipment Fee should be type of Number`,
                "any.required": `Shipment Fee is Required.`
            }),
    }).required().min(1)
        .messages({
            "array.base": `Minimum 1 Product is Required`,
            "any.required": `Product Details is Required.`
        })
    const joiSchema = Joi.object().keys({
        products: Joi.array().items(productSchema),
        seller_discount: Joi.number()
            .messages({
                "number.base": `Seller Discount should be type of Number`
            }),
        payment_information: Joi.object().keys({
            amount: Joi.number().required()
                .messages({
                    "number.base": `Amount should be type of Number`,
                    "any.required": `Amount is Required.`
                }),
            method: Joi.string().required()
                .messages({
                    "string.base": `Method should be type of String`,
                    "any.required": `Method is Required.`
                }),
        }).required()
            .messages({
                "any.required": `Payment Information is Required.`
            }),
        billing_address: Joi.string().hex().length(24).required()
            .messages({
                "string.base": `Billing Address ID should be type of ObjectID`,
                "any.required": `Billing Address ID is Required.`
            }),
        shipping_address: Joi.string().hex().length(24).required()
            .messages({
                "string.base": `Shipping Address ID should be type of ObjectID`,
                "any.required": `Shipping Address ID is Required.`
            }),
    })

    const { value, error } = joiSchema.validate({
        products,
        seller_discount,
        payment_information,
        billing_address,
        shipping_address,
    }, {
        escapeHtml: true
    })
    return { value, error }
}

export { orderValidation }