import { Vendor } from "../../mongodb/vendor";

export const getFollowers = async (query) => {
    try {
        return await Vendor.findOne(query).select('followers -_id').lean();
    } catch (err) {
        console.log(err);
    }
}