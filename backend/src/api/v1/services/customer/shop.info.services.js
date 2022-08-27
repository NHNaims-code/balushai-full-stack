import { Vendor } from "../../mongodb/vendor"
import { globalErrorHandler } from "../../utils";

export const getAllProductAndInfo = async (query) => {
    try {
        return await Vendor.findOne(query).lean().select('logo followers chat_response_rate ship_on_time products -_id').populate('products');
    } catch (err) {
        console.log(err);
    }
}