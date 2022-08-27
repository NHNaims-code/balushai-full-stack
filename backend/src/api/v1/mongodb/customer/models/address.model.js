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

// Address Schema
const addressSchema = new mongoose.Schema({
    full_name: StringRequired,
    phone: NumberRequired,
    region: StringRequired,
    city: StringRequired,
    area: StringRequired,
    address: StringRequired,
    effective_delivery_label: {
        type: String,
        enum: ['OFFICE', 'HOME'],
        default: 'HOME'
    },
    default_shipping_address: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("Address", addressSchema);