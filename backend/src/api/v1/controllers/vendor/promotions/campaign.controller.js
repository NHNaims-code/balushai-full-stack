import { getOnlineCampaigns, getIncomingCampaigns, getCampaign, registerCampaign, checkRegisterVendor, addCampaignProduct, getRegisteredOnlineCampaigns, getRegisteredIncomingCampaigns, removeCampaignProduct } from "../../../services/vendor";
import { error } from "../../../utils";

function campaignController() {
    return {
        // Get all online campaigns
        getAllOnlineCampaigns: async (req, res) => {
            const campaigns = await getOnlineCampaigns({ _id: req.user?._id });
            return res.status(200).json(campaigns);
        },

        // Get all incoming campaigns
        getAllIncomingCampaigns: async (req, res) => {
            const campaigns = await getIncomingCampaigns({ campaign_start_time: { $gt: Date.now() } });
            return res.status(200).json(campaigns);
        },

        // Get all registered online campaigns
        getAllRegisteredOnlineCampaigns: async (req, res) => {
            const campaigns = await getRegisteredOnlineCampaigns({ _id: req.user?._id });
            return res.status(200).json(campaigns);
        },

        // Get all registered incoming campaigns
        getAllRegisteredIncomingCampaigns: async (req, res) => {
            const campaigns = await getRegisteredIncomingCampaigns({ _id: req.user?._id });
            return res.status(200).json(campaigns);
        },

        // Get single campaign
        getSingleCampaign: async (req, res) => {
            const campaign = await getCampaign({ _id: req.params?.id });
            if (!campaign) return error().resourceError(res, 'Sorry! This Campaign doest not exists or something wrong', 422);
            return res.status(200).json(campaign);
        },

        // campaign registration
        registerCampaign: async (req, res) => {
            const checkRegister = await checkRegisterVendor({ _id: req.params?.id }, req.user?._id);
            if (checkRegister) {
                return error().resourceError(res, 'You have already registered.Please Check your Registered Campaign Tabs', 422);
            }
            await registerCampaign({ _id: req.params?.id }, req.user?._id);
            return res.status(200).json({ message: 'Registration Successful' });
        },

        // campaign registration check
        getRegisteredCampaign: async (req, res) => {
            const campaign = await checkRegisterVendor({ _id: req.params?.id }, req.user?._id);
            return res.status(200).json(campaign);
        },

        // campaign product add
        productAddInCampaign: async (req, res) => {
            const { product_id, color, size, price, special_price } = req.body;
            if (!product_id || !color || !size || !price) return error().resourceError(res, 'Sorry! You must select one product', 422);
            const checkRegister = await checkRegisterVendor({ _id: req.params?.id }, req.user?._id);
            if (!checkRegister) {
                return error().resourceError(res, 'Sorry! You may register for this action', 422);
            }
            const campaign = await addCampaignProduct({ _id: req.params?.id }, req.user?._id, { product_id, color, size, price, special_price });
            if (!campaign) return error().resourceError(res, 'Sorry! Update Request Failed or something wrong', 422);
            return res.status(200).json(campaign);
        },

        // campaign product remove
        productRemoveInCampaign: async (req, res) => {
            const { product_id, color, size, price, special_price } = req.body;
            if (!product_id || !color || !size || !price) return error().resourceError(res, 'Sorry! You must select one product', 422);
            const checkRegister = await checkRegisterVendor({ _id: req.params?.id }, req.user?._id);
            if (!checkRegister) {
                return error().resourceError(res, 'Sorry! You may register for this action', 422);
            }
            const campaign = await removeCampaignProduct({ _id: req.params?.id }, req.user?._id, { product_id, color, size, price, special_price });
            if (!campaign) return error().resourceError(res, 'Sorry! Update Request Failed or something wrong', 422);
            return res.status(200).json(campaign);
        },
    };
}

export { campaignController };
