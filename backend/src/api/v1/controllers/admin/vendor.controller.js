import { getVendor, getVendors, updateVendor } from "../../services/admin";
import { error } from "../../utils";

const vendorController = () => {
    return {
        // Get all Vendors
        getAllVendors: async (req, res) => {
            const vendors = await getVendors({});
            return res.status(200).json(vendors);
        },

        // Get a single Vendor
        getSingleVendor: async (req, res) => {
            const vendor = await getVendor({ _id: req.params?.id });
            if (!vendor)
                return error().resourceError(
                    res,
                    "Sorry! This Vendor doest not exists or something wrong",
                    422
                );
            return res.status(200).json(vendor);
        },

        // Get all deactivated Vendors
        getAllDeActivatedVendors: async (req, res) => {
            const vendors = await getVendors({ is_active: false });
            return res.status(200).json(vendors);
        },

        // Get all pending Vendors
        getAllActivatedVendors: async (req, res) => {
            const vendors = await getVendors({ is_active: true });
            return res.status(200).json(vendors);
        },

        // Get all deactivated Vendor Counts
        getDeActivatedVendorCounts: async (req, res) => {
            const vendors = await getVendors({ is_active: false });
            return res.status(200).json(vendors?.length || 0);
        },

        // Get all pending Vendor Counts
        getActivatedVendorCounts: async (req, res) => {
            const vendors = await getVendors({ is_active: true });
            return res.status(200).json(vendors?.length || 0);
        },
        // Active a Vendor
        activeVendor: async (req, res) => {
            const updatedVendor = await updateVendor(
                { _id: req.params?.id },
                { is_active: true }
            );
            if (!updatedVendor)
                return error().resourceError(
                    res,
                    "Sorry! This Vendor doest not exists or something wrong",
                    422
                );
            return res.status(200).json(updatedVendor);
        },

        // De Active a vendor
        deActiveVendor: async (req, res) => {
            const updatedVendor = await updateVendor(
                { _id: req.params?.id },
                { is_active: false }
            );
            if (!updatedVendor)
                return error().resourceError(
                    res,
                    "Sorry! This Vendor doest not exists or something wrong",
                    422
                );
            return res.status(200).json(updatedVendor);
        },
    };
};

export { vendorController };
