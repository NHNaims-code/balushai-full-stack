import mongoose from "mongoose"

const reviewSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    image: [{
        url: String,
        public_id: String
    }],
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        index: true,
    },
    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
        index: true,
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
        index: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
        index: true
    },
    rating: {
        type: Number,
        max: 5,
        min: 1,
        required: true
    },
    reply: {
        description: {
            type: String,
            maxLength: 255,
        }
    },
    report: {
        report_type: String,
        description: String
    },
    status: {
        type: String,
        default: 'NOT_REPLIED',
        enum: ['REPLIED', 'NOT_REPLIED']
    }
}, {
    timestamps: true
})
reviewSchema.index({ vendor_id: 1, product_id: 1, order_id: 1, user_id: 1 })

export default mongoose.model('Review', reviewSchema)