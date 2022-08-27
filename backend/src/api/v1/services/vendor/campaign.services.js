import { Campaign } from "../../mongodb/admin";
import { Product, Vendor } from "../../mongodb/vendor";

export const getOnlineCampaigns = async (query) => {
    try {
        const Campaigns = await Vendor.findOne(query).lean().select('campaigns -_id').populate({
            path: "campaigns",
            model: Campaign,
            match: { campaign_start_time: { $lt: Date.now() } },
            options: { sort: { createdAt: -1 } }
        }).exec();
        return Campaigns?.campaigns?.map((campaign) => {
            return { ...campaign, vendors: campaign?.vendors?.length }
        })
    } catch (err) {
        console.log(err);
    }
};

export const getRegisteredOnlineCampaigns = async (query) => {
    try {
        const Campaigns = await Vendor.findOne(query).lean().select('campaigns -_id').populate({
            path: "campaigns",
            model: Campaign,
            match: { campaign_start_time: { $lt: Date.now() } },
            options: { sort: { createdAt: -1 } }
        }).exec();
        return Campaigns?.campaigns?.map((campaign) => {
            return { ...campaign, vendors: campaign?.vendors?.length }
        })
    } catch (err) {
        console.log(err);
    }
};

export const getRegisteredIncomingCampaigns = async (query) => {
    try {
        const Campaigns = await Vendor.findOne(query).lean().select('campaigns -_id').populate({
            path: "campaigns",
            model: Campaign,
            match: { campaign_start_time: { $gt: Date.now() } },
            options: { sort: { createdAt: -1 } }
        }).exec();
        return Campaigns?.campaigns?.map((campaign) => {
            return { ...campaign, vendors: campaign?.vendors?.length }
        })
    } catch (err) {
        console.log(err);
    }
};

export const getIncomingCampaigns = async (query) => {
    try {
        const campaigns = await Campaign.find(query).sort({ createdAt: -1 }).lean();
        return campaigns?.map((campaign) => {
            return { ...campaign, vendors: campaign?.vendors?.length }
        })
    } catch (err) {
        console.log(err);
    }
};

export const getCampaign = async (query) => {
    try {
        return await Campaign.findOne(query).select('-vendors').lean();
    } catch (err) {
        console.log(err);
    }
};

export const checkRegisterVendor = async (query, vendor_id) => {
    try {
        const campaign = await Campaign.findOne({
            ...query,
            'vendors._id': vendor_id
        }).lean();
        return {
            ...campaign,
            vendors: campaign?.vendors?.filter((vendor) => (String(vendor?._id) === String(vendor_id)))
        }
    } catch (err) {
        console.log(err);
    }
};

export const registerCampaign = async (query, vendor_id) => {
    try {
        const campaign = await Campaign.findOneAndUpdate({
            ...query,
        }, { $push: { vendors: { _id: vendor_id, products: [] } } }, { new: true }).lean().exec();
        await Vendor.findOneAndUpdate(
            { _id: vendor_id },
            {
                $push: {
                    campaigns: campaign?._id,
                },
            },
            { new: true }
        ).lean();
        return campaign;
    } catch (err) {
        console.log(err);
    }
};

export const addCampaignProduct = async (query, vendor_id, products) => {
    const { product_id, color, size, price, special_price } = products;
    try {
        const campaign = await Campaign.findOneAndUpdate({
            ...query,
            'vendors._id': vendor_id,
            'vendors.products._id': { $ne: product_id },
            'vendors.products.size': { $ne: size },
            'vendors.products.color': { $ne: color }
        }, {
            $push: {
                'vendors.$.products': {
                    _id: product_id,
                    color,
                    size
                }
            }
        }, { new: true }).lean().exec();
        if (campaign) {
            let offer_price = 0;
            special_price ? offer_price = special_price - ((campaign.discount * special_price) / 100) : offer_price = price - ((campaign.discount * price) / 100);
            await Product.findOneAndUpdate({
                _id: product_id,
                'variant_stock_price.color_family': color,
                'variant_stock_price.sizes.size': size,
            }, {
                $set: {
                    'variant_stock_price.$[].sizes.$[].pricing.offer_price': offer_price,
                    'variant_stock_price.$[].sizes.$[].pricing.offer_price_start_time': campaign?.campaign_start_time,
                    'variant_stock_price.$[].sizes.$[].pricing.offer_price_end_time': campaign?.campaign_end_time
                }
            }, { new: true }).lean().exec()
        }
        return campaign;
    } catch (err) {
        console.log(err);
    }
};

export const removeCampaignProduct = async (query, vendor_id, products) => {
    const { product_id, color, size } = products;
    try {
        const campaign = await Campaign.findOneAndUpdate({
            ...query,
            'vendors._id': vendor_id,
            'vendors.products._id': { $eq: product_id },
            'vendors.products.size': { $eq: size },
            'vendors.products.color': { $eq: color }
        }, {
            $pull: {
                'vendors.$.products': {
                    _id: product_id,
                    color,
                    size
                }
            }
        }, { new: true }).lean().exec();
        if (campaign) {
            let offer_price = 0;
            await Product.findOneAndUpdate({
                _id: product_id,
                'variant_stock_price.color_family': color,
                'variant_stock_price.sizes.size': size,
            }, {
                $set: {
                    'variant_stock_price.$[].sizes.$[].pricing.offer_price': offer_price,
                    'variant_stock_price.$[].sizes.$[].pricing.offer_price_start_time': null,
                    'variant_stock_price.$[].sizes.$[].pricing.offer_price_end_time': null
                }
            }, { new: true }).lean().exec()
        }
        return campaign;
    } catch (err) {
        console.log(err);
    }
};