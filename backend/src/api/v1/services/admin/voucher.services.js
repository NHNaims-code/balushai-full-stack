import { Voucher } from "../../mongodb/common";
import { Vendor } from "../../mongodb/vendor";
import { globalErrorHandler } from "../../utils";

export const createVoucher = async (data, res) => {
    try {
        return await new Voucher(data).save();
    } catch (err) {
        console.log(err);
        globalErrorHandler(err, res);
    }
};


export const getSingleVoucher = async (query) => {
    try {
        return await Voucher.findOne(query).lean();
    } catch (err) {
        console.log(err);
    }
};

/* export const getAllVouchers = async (query) => {
    try {
        return await Admin.findOne(query)
            .lean()
            .select("vouchers -_id")
            .populate("vouchers")
            .exec();
    } catch (err) {
        console.log(err);
    }
}; */


export const getAllVouchers = async (query) => {
    try {
        return await Voucher.find(query)
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

export const getDynamicVoucher = async (query, status) => {
    try {
        return await Voucher.find({ ...query, is_active: status })
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

export const getVouchers = async (query) => {
    try {
        return await Voucher.find(query)
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

export const getVendorDynamicVoucher = async (query, status) => {
    try {
        return await Vendor.findOne(query)
            .lean()
            .select("vouchers -_id")
            .populate({
                path: "vouchers",
                match: { is_active: status }
            })
            .exec();
    } catch (err) {
        console.log(err);
    }
};

export const getVendorVouchers = async (query) => {
    try {
        return await Vendor.findOne(query)
            .lean()
            .select("vouchers -_id")
            .populate("vouchers")
            .exec();
    } catch (err) {
        console.log(err);
    }
};

export const updateVoucher = async (query, data) => {
    try {
        return await Voucher.findOneAndUpdate(query, { $set: data }).lean();
    } catch (err) {
        console.log(err);
    }
};
