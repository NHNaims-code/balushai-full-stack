import mongoose from "mongoose"

// String type & required
const StringRequired = {
    type: String,
    required: true
}

// Otp Schema here
const otpSchema = mongoose.Schema({
    phone: {
        ...StringRequired,
        index: true,
        unique: true
    },
    otp: {
        ...StringRequired,
        index: true
    },
    expire_time: Date
})

export default mongoose.model('Otp', otpSchema);