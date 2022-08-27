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
    sender: {
        type: String,
        enum: ['VENDOR', 'CUSTOMER'],
        required: true,
        index: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
}, {
    timestamps: true
})

export default mongoose.model('Message', messageSchema)