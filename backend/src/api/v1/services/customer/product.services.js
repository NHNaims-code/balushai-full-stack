import { Product } from "../../mongodb/vendor"

export const getActivatedAndApprovedProducts = async (query) => {
    try {
        return await Product.find(query).lean().select('-is_deleted -is_active -orders -status -__v')
    } catch (err) {
        console.log(err);
    }
}

export const getSingleProduct = async (query) => {
    try {
        return await Product.findOne(query).lean().select('-is_deleted -is_active -orders -status -__v');
    } catch (err) {
        console.log(err);
    }
}