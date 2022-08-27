import mongoose from "mongoose"

const messageSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    image: [{
        url: String,
        public_id: String
    }],

    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
        index: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
        index: true
    },
    report: {
        report_type: String,
        description: String
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
}, {
    timestamps: true
})

export default mongoose.model('Message', messageSchema)