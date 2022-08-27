import {
    createVoucher,
    getAllVouchers,
    getDynamicVoucher,
    getSingleVoucher,
    getVendorDynamicVoucher,
    getVendorVouchers,
    getVouchers,
    updateVoucher,
} from "../../../services/admin";
import { error } from "../../../utils";
import { voucherValidation } from "../../../validations";

function voucherController() {
    return {
        // Create a new Voucher
        createVoucher: async (req, res) => {
            const validation = voucherValidation(req.body);
            if (validation.error)
                return error().resourceError(
                    res,
                    validation.error?.details[0].message,
                    422
                );

            const codeMatch = await getSingleVoucher({ code: req.body?.code });
            if (codeMatch) return error().resourceError(
                res,
                'Voucher Code is Duplicate.Please enter different code.',
                422
            );
            const addedVoucher = await createVoucher({
                ...req.body,
                created_by: 'ADMIN',
                is_active: true
            }, res);
            return res.status(200).json(addedVoucher);
        },

        // Find single voucher by ID
        getSingleVoucher: async (req, res) => {
            const voucher = await getSingleVoucher({ _id: req.params?.id });
            if (!voucher) return error().resourceError(res, 'Sorry! This Voucher doest not exists or something wrong', 422);
            return res.status(200).json(voucher);
        },

         // Get all Active Vouchers
         getAllActiveVouchers: async (req, res) => {
            const Vouchers = await getDynamicVoucher({}, true);
            return res.status(200).json(Vouchers);
        },

        // Get all DeActive Vouchers
        getAllDeActiveVouchers: async (req, res) => {
            const Vouchers = await getDynamicVoucher({}, false);
            return res.status(200).json(Vouchers);
        },

        // Get all Vouchers
        getAllVouchers: async (req, res) => {
            const Vouchers = await getVouchers({});
            return res.status(200).json(Vouchers);
        },


        //vendor

        // Get all Active Vouchers
        getVendorAllActiveVouchers: async (req, res) => {
            const Vouchers = await getVendorDynamicVoucher({ _id: req.params?.id }, true);
            return res.status(200).json(Vouchers?.vouchers);
        },

        // Get all DeActive Vouchers
        getVendorAllDeActiveVouchers: async (req, res) => {
            const Vouchers = await getVendorDynamicVoucher({ _id: req.params?.id }, false);
            return res.status(200).json(Vouchers?.vouchers);
        },

        // Get all Vouchers
        getVendorAllVouchers: async (req, res) => {
            const Vouchers = await getVendorVouchers({ _id: req.params?.id });
            return res.status(200).json(Vouchers?.vouchers);
        },

        // Get all Active Vouchers Count
        getVendorAllActiveVouchersCount: async (req, res) => {
            const Vouchers = await getVendorDynamicVoucher({ _id: req.params?.id }, true);
            return res.status(200).json(Vouchers?.vouchers?.length);
        },

        // Get all DeActive Vouchers Count
        getVendorAllDeActiveVouchersCount: async (req, res) => {
            const Vouchers = await getVendorDynamicVoucher({ _id: req.params?.id }, false);
            return res.status(200).json(Vouchers?.vouchers?.length);
        },

        // Get all Vouchers Count
        getVendorAllVouchersCount: async (req, res) => {
            const Vouchers = await getVendorVouchers({ _id: req.params?.id });
            return res.status(200).json(Vouchers?.vouchers?.length);
        },

        // Update single Voucher by ID
        updateVoucher: async (req, res) => {

            const validation = voucherValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.message, 422);

            const updatedVoucher = await updateVoucher(
                { _id: req.params?.id },
                req.body
            );
            if (!updatedVoucher) return error().resourceError(res, 'Sorry! This Voucher doest not exists or something wrong', 422);
            return res.status(200).json(updatedVoucher);
        },


        // Active single Voucher by ID
        activeVoucher: async (req, res) => {
            const updatedVoucher = await updateVoucher(
                { _id: req.params?.id },
                { is_active: true }
            );
            if (!updatedVoucher) return error().resourceError(res, 'Sorry! This Voucher doest not exists or something wrong', 422);
            return res.status(200).json(updatedVoucher);
        },

        // De Active single Voucher by ID
        deActiveVoucher: async (req, res) => {
            const updatedVoucher = await updateVoucher(
                { _id: req.params?.id },
                { is_active: false }
            );
            if (!updatedVoucher) return error().resourceError(res, 'Sorry! This Voucher doest not exists or something wrong', 422);
            return res.status(200).json(updatedVoucher);
        },
    };
}

export { voucherController };
