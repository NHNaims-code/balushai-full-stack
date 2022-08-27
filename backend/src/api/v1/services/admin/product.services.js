import { Product } from "../../mongodb/vendor"

export const getProducts = async (query) => {
    try {
        return await Product.find(query).populate({
            path: 'vendor_id',
            model: 'Vendor',
            select: 'seller_account logo'
        }).lean();
    } catch (err) {
        console.log(err)
    }
}

export const getProduct = async (query) => {
    try {
        return await Product.findOne(query).populate({
            path: 'vendor_id',
            model: 'Vendor',
            select: 'seller_account logo'
        }).lean();
    } catch (err) {
        console.log(err);
    }
}

export const updateProduct = async (query, data) => {
    try {
        return await Product.findOneAndUpdate(query, { $set: data }, { new: true }).populate({
            path: 'vendor_id',
            model: 'Vendor',
            select: 'seller_account logo'
        }).lean();
    } catch (err) {
        console.log(err);
    }
}

export const getDynamicStatusProducts = async (status) => {
    try {
        return await Product.find({
            status
        }).populate({
            path: 'vendor_id',
            model: 'Vendor',
            select: 'seller_account logo'
        }).lean();
    } catch (err) {
        console.log(err)
    }
}

export const getVendorDynamicStatusProducts = async (vendor_id, status) => {
    try {
        return await Product.find({
            vendor_id, status
        }).populate({
            path: 'vendor_id',
            model: 'Vendor',
            select: 'seller_account logo'
        }).lean();
    } catch (err) {
        console.log(err)
    }
}
