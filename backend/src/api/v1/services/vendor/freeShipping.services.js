import { FreeShipment, Vendor } from "../../mongodb/vendor";

export const createFreeShipping = async (data, vendor_id) => {
    try {
        const newFreeShipping = await new FreeShipment(data);
        const savedNewFreeShipping = await newFreeShipping.save();
        await Vendor.findOneAndUpdate(
            { _id: vendor_id },
            {
                $push: {
                    free_shipments: savedNewFreeShipping?._id,
                },
            },
            { new: true }
        ).lean();
        return savedNewFreeShipping;
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
        return await Vendor.findOne(query).lean()
            .select("free_shipments -_id")
            .populate("free_shipments")
            .exec();
    } catch (err) {
        console.log(err);
    }
};

export const getDynamicFreeShippings = async (query, status) => {
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
