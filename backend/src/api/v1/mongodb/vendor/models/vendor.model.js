import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    // seller id will be auto generated like as BD2GL0LLH...
    seller_id: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    //Seller Account
    seller_account: {
        name: { // name means first name and last name
            type: String,
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
        shop_name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
        },
        slug: {
            type: String,
            required: true,
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
    },
    //Business Information
    business_information: {
        owner_name: {
            type: String,
            trim: true,
        },
        legal_form: {
            type: String,
        },
        address1: {
            type: String,
            trim: true,
        },
        address2: {
            type: String,
            trim: true,
        },
        city_or_town: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
        },
        //PCN -> Person in Charge Name
        PCN: {
            type: String,
            trim: true,
        },
        //BRN -> Business Registration Number
        BRN: {
            type: Number,
            trim: true,
        },
        documents: [{
            type: String,
        }],
        tin_number: {
            type: Number,
            trim: true,
        },
        division: {
            type: String,
        },
        city: {
            type: String,
        },
        post_code: {
            type: String,
        },
    },
    // Bank Account
    bank_account: {
        title: {
            type: String,
            trim: true,
        },
        number: {
            type: Number,
            trim: true,
        },
        name: {
            type: String,
        },
        branch: {
            type: String,
            trim: true,
        },
        routing_number: {
            type: Number,
            trim: true,
        },
        // IBAN -> International Bank Account Number
        IBAN: {
            type: String,
            trim: true,
        },
        cheque_copy: {
            type: String,
        },
        tax_category: {
            type: String,
            trim: true,
        },
    },
    // Warehouse Address
    warehouse_address: {
        name: { //name means first name and last name
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        phone: {
            type: Number,
            trim: true,
        },
        city_or_town: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
        },
        division: {
            type: String,
        },
        city: {
            type: String,
        },
        post_code: {
            type: String,
        },
    },
    // Return Address
    return_address: {
        name: { //name means first name and last name
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        phone: {
            type: Number,
            trim: true,
        },
        city_or_town: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
        },
        division: {
            type: String,
        },
        city: {
            type: String,
        },
        post_code: {
            type: String,
        },
    },
    //seller Logo
    logo: {
        url: String,
        public_id: String
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    is_active: {
        type: Boolean,
        default: false,
        index: true
    },
    token: {
        type: String,
        index: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    image: {
        url: String,
        public_id: String
    },
    ship_on_time: { // like 90%
        type: Number,
        default: 0
    },
    chat_response_rate: { // like 90%
        type: Number,
        default: 0
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }],
    vouchers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    campaigns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
    }],
    free_shipments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FreeShipment',
    }],
    resetPasswordToken: String,
    resetPasswordTokenDate: Date,
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

vendorSchema.index({ is_active: 1, shop_name: 1, slug: 1 })

export default mongoose.model("Vendor", vendorSchema);