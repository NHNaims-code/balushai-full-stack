import { Vendor } from "../../mongodb/vendor";

export const getVendors = async (query) => {
    try {
        return await Vendor.find(query).select('-password -token -seller_id').lean();
    } catch (err) {
        console.log(err);
    }
};

export const getVendor = async (query) => {
    try {
        return await Vendor.findOne(query).select('-password -token -seller_id').lean();
    } catch (err) {
        console.log(err);
    }
};

export const updateVendor = async (query, data) => {
    try {
        return await Vendor.findOneAndUpdate(query, { $set: data }, { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
};
