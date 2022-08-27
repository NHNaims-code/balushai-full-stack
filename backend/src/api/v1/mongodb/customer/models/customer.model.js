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

//Customer Schema
const customerSchema = new mongoose.Schema({
    name: { // name means first name and last name
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        index: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
    },
    //addresses 
    address: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        },
    ],
    password: {
        type: String,
        required: true,
        trim: true,
    },
    token: { // Track jwt token
        type: String,
        index: true
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
    image: {
        url: String,
        public_id: String
    },
    followed_stores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor',
        },
    ],
    vouchers: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher',

    }],
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password,
                delete ret.__v,
                delete ret.createdAt,
                delete ret.updatedAt
        }
    },
    timestamps: true
});

customerSchema.index({ email: 1, phone: 1 })

export default mongoose.model("Customer", customerSchema);