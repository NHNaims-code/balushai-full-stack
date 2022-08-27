'use strict';

import mongoose from "mongoose";

// String type & required
const StringRequired = {
    type: String,
    required: true,
};


var adminSchema = new mongoose.Schema({
    phone: StringRequired,
    email:StringRequired,
    vouchers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher',
    }],
    token: String,
    otp : Number
});

export default mongoose.model('Admin', adminSchema);