
import mongoose from "mongoose"
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
const voucherSchema = mongoose.Schema({
    name: {
        ...StringRequired,
        index: true
    },
    start_from: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    /* voucher_type : String, */ // will be used in next version
    code: {
        ...StringRequired,
        max: 12, 
        index: true,
        unique: true,
        trim: true
    },
    discount_type: {
        type: String,
        enum: ['MONEY_VALUE_VOUCHER', 'PERCENTAGE_VALUE_VOUCHER'],
        default: 'MONEY_VALUE_VOUCHER'
    },
    discount_amount: Number,
    discount_amount_percentage: Number,
    min_amount_to_apply: NumberRequired,
    max_discount_amount: Number,
    total_issued_voucher: NumberRequired,
    limit_voucher_usage_for_customer: NumberRequired,
    /* apply_to: String */ // will be used in next version
    is_active: {
        type: Boolean,
        default: false
    },
    created_by: {
        type: String,
        enum : ['VENDOR','ADMIN'],
        default: 'VENDOR'
    },
    vendor_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
    }
}, {
    timestamps: true
})


export default mongoose.model('Voucher', voucherSchema)