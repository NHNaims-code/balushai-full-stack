import {
    createFreeShipping,
    deleteFreeShipping,
    getAllFreeShippings,
    getDynamicFreeShippings,
    getSingleFreeShipping,
    getVendorAllFreeShippings,
    getVendorDynamicFreeShippings,
    updateFreeShipping,
} from "../../../services/admin";
import { error } from "../../../utils";
import { freeShippingValidation } from "../../../validations";

function freeShippingController() {
    return {
        // Create an freeShipping
        createFreeShipping: async (req, res) => {
            const validation = freeShippingValidation(req.body);
            if (validation.error)
                return error().resourceError(
                    res,
                    validation.error?.details[0].message,
                    422
                );
            if (req.body?.period_type === 'SPECIFIC_PERIOD') {
                const { start_date, end_date } = req.body?.specific_period;
                if (!start_date) return error().resourceError(
                    res,
                    "Start Date is Required",
                    422
                );
                else if (!end_date) return error().resourceError(
                    res,
                    "End Date is Required",
                    422
                );
            }

            const addedFreeShipping = await createFreeShipping(
                { ...req.body, created_by: "ADMIN", is_active: true }
            );
            return res.status(200).json(addedFreeShipping);
        },

        // Find single product by ID
        getSingleFreeShipping: async (req, res) => {
            const freeShipping = await getSingleFreeShipping({ _id: req.params.id });
            if (!freeShipping)
                return error().resourceError(
                    res,
                    "Sorry! This Free Shipping Voucher doest not exists or something wrong",
                    422
                );
            return res.status(200).json(freeShipping);
        },

        // Get all freeShippings
        getAllFreeShippings: async (req, res) => {
            const freeShippings = await getAllFreeShippings({});
            return res.status(200).json(freeShippings);
        },

        // Get all Active freeShippings
        getAllActiveFreeShippings: async (req, res) => {
            const freeShippings = await getDynamicFreeShippings({},
                true
            );
            return res.status(200).json(freeShippings);
        },

        // Get all DeActive freeShippings
        getAllDeActiveFreeShippings: async (req, res) => {
            const freeShippings = await getDynamicFreeShippings({},
                false
            );
            return res.status(200).json(freeShippings);
        },

        // Delete single freeShipping by ID
        deleteFreeShipping: async (req, res) => {
            const deletedFreeShipping = await deleteFreeShipping({
                _id: req.params?.id,
            });
            if (!deletedFreeShipping)
                return error().resourceError(
                    res,
                    "Sorry! This Free Shipping Voucher doest not exists or something wrong",
                    422
                );
            return res.status(200).json(deletedFreeShipping);
        },

        // Active single Free Shipping by ID
        activeFreeShipping: async (req, res) => {
            const updatedFreeShipping = await updateFreeShipping(
                { _id: req.params?.id },
                { is_active: true }
            );
            if (!updatedFreeShipping)
                return error().resourceError(
                    res,
                    "Sorry! This Free Shipping doest not exists or something wrong",
                    422
                );
            return res.status(200).json(updatedFreeShipping);
        },

        // De Active single Free Shipping by ID
        deActiveFreeShipping: async (req, res) => {
            const updatedFreeShipping = await updateFreeShipping(
                { _id: req.params?.id },
                { is_active: false }
            );
            if (!updatedFreeShipping)
                return error().resourceError(
                    res,
                    "Sorry! This Free Shipping doest not exists or something wrong",
                    422
                );
            return res.status(200).json(updatedFreeShipping);
        },

        //vendor

        // Get all freeShippings
        getVendorAllFreeShippingCounts: async (req, res) => {
            const freeShippings = await getVendorAllFreeShippings({ _id: req.params?.id });
            return res.status(200).json(freeShippings?.free_shipments?.length);
        },

        // Get all Active freeShippings
        getVendorAllActiveFreeShippingCounts: async (req, res) => {
            const freeShippings = await getVendorDynamicFreeShippings({ _id: req.params?.id }, true);
            return res.status(200).json(freeShippings?.free_shipments?.length);
        },

        // Get all DeActive freeShippings
        getVendorAllDeActiveFreeShippingCounts: async (req, res) => {
            const freeShippings = await getVendorDynamicFreeShippings({ _id: req.params?.id }, false);
            return res.status(200).json(freeShippings?.free_shipments?.length);
        },

        // Get all freeShippings
        getVendorAllFreeShippings: async (req, res) => {
            const freeShippings = await getVendorAllFreeShippings({ _id: req.params?.id });
            return res.status(200).json(freeShippings?.free_shipments);
        },

        // Get all Active freeShippings
        getVendorAllActiveFreeShippings: async (req, res) => {
            const freeShippings = await getVendorDynamicFreeShippings({ _id: req.params?.id }, true);
            return res.status(200).json(freeShippings?.free_shipments);
        },

        // Get all DeActive freeShippings
        getVendorAllDeActiveFreeShippings: async (req, res) => {
            const freeShippings = await getVendorDynamicFreeShippings({ _id: req.params?.id }, false);
            return res.status(200).json(freeShippings?.free_shipments);
        },
    };
}
export { freeShippingController };
