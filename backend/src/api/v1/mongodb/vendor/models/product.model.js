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

//PriceSchema
const priceSchema = mongoose.Schema({
    price: NumberRequired,
    special_price: Number,
    offer_price: Number,
    offer_price_start_time: Date,
    offer_price_end_time: Date
}, { _id: false })

// variant stock price combine schema
const variant_stock_price = mongoose.Schema({
    color_family: StringRequired,
    images: [{
        url: String,
        public_id: String
    }],
    sizes: [{
        size: StringRequired,
        pricing: priceSchema,
        quantity: NumberRequired,
        seller_sku: {
            type: String,
            maxLength: 100,
            index: true,
        },
        free_items: String
    }],
}, { _id: false })

// Product Schema here
const productSchema = mongoose.Schema({
    product_name: {
        ...StringRequired,
        min: 10,
        maxLength: 255,
        unique: true,
        index: true
    },
    category: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        value: {
            type: String,
            required: true
        }
    }],
    slug: {
        ...StringRequired,
        unique: true,
        index: true
    },
    video_url: String,
    brand: StringRequired,
    short_description: StringRequired,
    long_description: StringRequired,
    whats_in_the_box: {
        ...StringRequired,
        maxLength: 255
    },
    variant_stock_price: [variant_stock_price],
    warranty_type: StringRequired,
    warranty_period: String,
    warranty_policy: String,
    package_weight: NumberRequired,
    package_dimensions: {
        length: NumberRequired,
        width: NumberRequired,
        height: NumberRequired,
    },
    dangerous_goods: {
        type: String,
        default: 'None'
    },
    status: {
        type: String,
        enum: ['APPROVED', 'PENDING', 'SUSPENDED'],
        default: 'PENDING',
        index: 1
    },
    suspended_reasons: String,
    is_deleted: {
        type: Boolean,
        default: false,
        index: true
    },
    is_active: {
        type: Boolean,
        default: false,
        index: true
    },
    rating: {
        type: Number,
        default: 0,
        index: true
    },
    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
        index: true
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    questions_and_answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QA',
        }
    ]

}, {
    timestamps: true,
})

productSchema.index({ vendor_id: 1, is_deleted: 1, is_active: 1, slug: 1, status: 1 })


export default mongoose.model('Product', productSchema)