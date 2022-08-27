import mongoose from "mongoose"

const conversationSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
        index: true
    },
    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
        index: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: true,
        index: true
    }],
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

export default mongoose.model('Conversation', conversationSchema)