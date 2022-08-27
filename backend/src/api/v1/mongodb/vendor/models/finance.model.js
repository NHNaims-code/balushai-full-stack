import mongoose from "mongoose"

// Finance Schema here
const financeSchema = mongoose.Schema({
    start_date: Date,
    end_date: Date,
    unpaid_balance: Number,
    paid: {
        type: Boolean,
        default: false
    },
    penalties: Number,
    penalties_reason: String,
    total_balance : Number,
    payment_date: Date,
    refunds: [{
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    }],
    orders: [{
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    }]

}, {
    timestamps: false,
})

export default mongoose.model('Finance', financeSchema);