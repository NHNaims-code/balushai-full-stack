import { Otp } from "../../mongodb/vendor";

export const insertOtp = async (data) => {
    try {
        return await Otp.create(data);
    } catch (err) {
        console.log(err);
    }
}

export const updateOtp = async (query, data) => {
    try {
        return await Otp.findOneAndDelete(query, data).lean();
    } catch (err) {
        console.log(err);
    }
}

export const getOtp = async (query) => {
    try {
        return await Otp.findOne(query).lean();
    } catch (err) {
        console.log(err);
    }
}