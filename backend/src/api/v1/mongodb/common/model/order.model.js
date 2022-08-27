import mongoose from "mongoose";

// String type & required
const StringRequired = {
    type: String,
    required: true
}

// Number type & required
const NumberRequired = {
    type: Number,
    required: true
}

const ProductSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
    },
    color: StringRequired,
    name: StringRequired,
    seller_sku: String,
    quantity: {
        type: Number,
        required: true,
        max: 50
    },
    image: StringRequired,
    // product Price
    price: NumberRequired,
    size: StringRequired,
    shipment_fee: {
        type: Number,
        default: 0
    },
    total_price: NumberRequired,
    status: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING', 'READY_TO_SHIP', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED', 'DELIVERY_FAILED'],
        index: true
    },
    provider: {
        drop_off: {
            type: String,
            default: 'Balushai'
        },
        delivery: {
            type: String,
            default: 'Balushai'
        }
    },
    tracking_number: StringRequired,
    estimate_delivery_time: Date,
    ship_on_time: Date,
    delivered_time: Date,
    cancellation_reasons: String,
    return_on_reasons: String,
    review_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    },
    refunds: Number
}, { timestamps: true });


// Payment information schema
const PaymentInformationSchema = new mongoose.Schema({
    amount: NumberRequired,
    method: StringRequired,// Baksh  or COD-> Cash on Delivery or something
    status: {
        type: String,
        enum: ['SUCCESS', 'UNPAID', 'FAILED'],
        default: 'UNPAID'
    },
}, { _id: false })
/********************
 * Order Schema here
 ********************/
const orderSchema = new mongoose.Schema({
    products: [ProductSchema],
    total_shipment_fee: NumberRequired,
    balushai_voucher_discount: Number,
    shipment_fee_discount: Number,
    seller_discount: Number,
    grand_total: NumberRequired,
    payment_information: PaymentInformationSchema,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    billing_address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    shipping_address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
}, {
    timestamps: true
})

orderSchema.index({ status: 1, 'products.vendor_id': 1, 'products.product_id': 1, user_id: 1 })

export default mongoose.model('Order', orderSchema)