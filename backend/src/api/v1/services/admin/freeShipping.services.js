import { FreeShipment, Vendor } from "../../mongodb/vendor";

export const createFreeShipping = async (data) => {
    try {
        return await new FreeShipment(data).save();
    } catch (err) {
        console.log(err);
    }
};

export const getSingleFreeShipping = async (query) => {
    try {
        return await FreeShipment.findOne(query).lean();
    } catch (err) {
        console.log(err);
    }
};

export const getAllFreeShippings = async (query) => {
    try {
        return await FreeShipment
            .find(query)
            .lean()
            .populate({
                path: "vendor_id",
                match: { created_by: 'VENDOR' },
                select: 'seller_account logo'
            })
            .exec();;
    } catch (err) {
        console.log(err);
    }
};

export const getDynamicFreeShippings = async (query, status) => {
    try {
        return await FreeShipment
            .find({ ...query, is_active: status })
            .lean()
            .populate({
                path: "vendor_id",
                match: { created_by: 'VENDOR' },
                select: 'seller_account logo'
            })
            .exec();
    } catch (err) {
        console.log(err);
    }
};
export const updateFreeShipping = async (query, data) => {
    try {
        return await FreeShipment.findOneAndUpdate(
            query,
            { $set: data },
            { new: true }
        ).lean();
    } catch (err) {
        console.log(err);
    }
};

export const deleteFreeShipping = async (query) => {
    try {
        return await FreeShipment.findOneAndDelete(query).lean();
    } catch (err) {
        console.log(err);
    }
};

export const getVendorAllFreeShippings = async (query) => {
    try {
        return await Vendor.findOne(query).lean()
            .select("free_shipments -_id")
            .populate("free_shipments")
            .exec();
    } catch (err) {
        console.log(err);
    }
};

export const getVendorDynamicFreeShippings = async (query, status) => {
    try {
        return await Vendor.findOne(query).lean()
            .select("free_shipments -_id")
            .populate({
                path: "free_shipments",
                match: { is_active: status },
            })
            .exec();
    } catch (err) {
        console.log(err);
    }
};