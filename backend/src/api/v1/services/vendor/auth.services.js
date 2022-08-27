
import { generatePasswordHash, generateRandomSellerId, globalErrorHandler } from "../../utils";
import { Vendor } from "../../mongodb/vendor";
import slugify from "slugify";

export const findVendor = async (query) => {
    try {
        return await Vendor.findOne(query).lean();
    } catch (err) {
        console.log(err);
    }
}

export const createVendor = async (data, res) => {
    try {
        const { shop_name, email, phone, password } = data;
        const seller_id = await generateRandomSellerId();
        //password hash using bcrypt
        const hashPassword = await generatePasswordHash(password);
        return await Vendor.create({
            seller_id,
            seller_account: {
                email,
                shop_name,
                slug: slugify(shop_name)?.toLowerCase(),
                phone
            },
            password: hashPassword
        })
    } catch (err) {
        console.log(err);
        globalErrorHandler(err, res);
    }
}

export const updateVendor = async (query, data) => {
    try {
        return await Vendor.findOneAndUpdate(query, { $set: data }, { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
}

