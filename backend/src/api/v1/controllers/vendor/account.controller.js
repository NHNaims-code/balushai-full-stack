import { findVendorByIDAndUpdate, findVendor, getVendorAccountLogo, getVendorAccountPhoto, getVendorBankInfo, getVendorBusinessInfo, getVendorCreatedDate, getVendorReturnAddress, getVendorSellerAccountInfo, getVendorWarehouseAddress, updateSellerAccountInfo, updateVendorAccountLogo, updateVendorAccountPhoto, updateVendorBankInfo, updateVendorBusinessInfo, updateVendorReturnAddress, updateVendorWarehouseAddress } from "../../services/vendor";
import { error, passwordCompare, objectValidatorEscape } from "../../utils";
import { bankInfoValidation, businessInfoValidation, passwordValidation, returnAddressValidation, sellerAccountInfoValidation, wareHouseAddressValidation } from "../../validations";
import validator from "validator";
import * as cloudinary from 'cloudinary';

function accountController() {
    return {
        getSellerAccountInfo: async (req, res) => {
            const vendor = await getVendorSellerAccountInfo({ _id: req.user?._id });
            return res.status(200).json(vendor);
        },
        updateSellerAccountInfo: async (req, res) => {
            const { name, phone } = req.body;

            const validation = sellerAccountInfoValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const updatedVendor = await updateSellerAccountInfo(req.user?._id, {
                name: validator.escape(name || ''),
                phone
            });
            return res.status(200).json(updatedVendor?.seller_account);
        },
        getBusinessInfo: async (req, res) => {
            const vendor = await getVendorBusinessInfo({ _id: req.user?._id });
            return res.status(200).json(vendor);
        },
        updateBusinessInfo: async (req, res) => {

            //validation check
            const validation = businessInfoValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //malicious data refactor
            const refactor_data = await objectValidatorEscape(req.body);

            //update vendor business information
            const updatedVendor = await updateVendorBusinessInfo(req.user?._id, refactor_data);
            return res.status(200).json(updatedVendor?.business_information);
        },
        getBankInfo: async (req, res) => {
            const vendor = await getVendorBankInfo({ _id: req.user?._id });
            return res.status(200).json(vendor);
        },
        updateBankInfo: async (req, res) => {

            let cheque_copy;

            const validation = bankInfoValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            if (req.fileExtensionValidationError) return error().resourceError(res, 'Only .png, .jpg and .jpeg format allowed!', 415)
            if (req.file?.size >= 3 * 1024 * 1024) return error().resourceError(res, 'Image size mus lower than 3 MB', 409)

            //image upload if seller provide any image for bank cheque Book
            if (req.file) {
                const image_upload = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'balushai/vendor/bank', use_filename: true })
                if (!image_upload?.url) return error().resourceError(res, 'Image Saved Failed . Please try again', 500)
                cheque_copy = image_upload?.secure_url
            }

            //malicious data refactor
            const refactor_data = await objectValidatorEscape(req.body);

            const updatedVendor = await updateVendorBankInfo(req.user?._id, {
                ...refactor_data,
                cheque_copy
            });
            return res.status(200).json(updatedVendor?.bank_account);
        },
        getWarehouseAddress: async (req, res) => {
            const vendor = await getVendorWarehouseAddress({ _id: req.user?._id });
            return res.status(200).json(vendor);
        },
        updateWarehouseAddress: async (req, res) => {

            //const { name,address,phone,city_or_town,country, division, city, post_code } = req.body;

            const validation = wareHouseAddressValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //malicious data refactor
            const refactor_data = await objectValidatorEscape(req.body);

            const updatedVendor = await updateVendorWarehouseAddress(req.user?._id, refactor_data);
            return res.status(200).json(updatedVendor?.warehouse_address);
        },
        getReturnAddress: async (req, res) => {
            const vendor = await getVendorReturnAddress({ _id: req.user?._id });
            return res.status(200).json(vendor);
        },
        updateReturnAddress: async (req, res) => {

            const validation = returnAddressValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //malicious data refactor
            const refactor_data = await objectValidatorEscape(req.body);

            const updatedVendor = await updateVendorReturnAddress(req.user?._id, refactor_data);
            return res.status(200).json(updatedVendor?.return_address);
        },
        getSellerLogo: async (req, res) => {
            const img = await getVendorAccountLogo({ _id: req.user?._id });
            return res.status(200).json(img?.logo);
        },
        updateSellerLogo: async (req, res) => {

            if (req.fileExtensionValidationError) return error().resourceError(res, 'Only .png, .jpg and .jpeg format allowed!', 415);
            if (req.file?.size >= 3 * 1024 * 1024) return error().resourceError(res, 'Image size mus lower than 3 MB', 409);

            const image_upload = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'balushai/vendor/logo', use_filename: true });
            if (!image_upload?.secure_url) return error().resourceError(res, 'Image Uploaded Failed . Please try again', 500);

            await updateVendorAccountLogo({ _id: req.user?._id }, {
                logo: {
                    public_id: image_upload?.public_id,
                    url: image_upload?.secure_url
                }
            });

            return res.status(200).json({
                public_id: image_upload?.public_id,
                url: image_upload?.secure_url
            });
        },

        getAccountPhoto: async (req, res) => {
            const img = await getVendorAccountPhoto({ _id: req.user?._id });
            return res.status(200).json(img?.image);
        },
        updateAccountPhoto: async (req, res) => {

            if (req.fileExtensionValidationError) return error().resourceError(res, 'Only .png, .jpg and .jpeg format allowed!', 415);
            if (req.file?.size >= 3 * 1024 * 1024) return error().resourceError(res, 'Image size mus lower than 3 MB', 409);

            const image_upload = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'balushai/vendor/photo', use_filename: true });
            if (!image_upload?.secure_url) return error().resourceError(res, 'Image Uploaded Failed . Please try again', 500);

            await updateVendorAccountPhoto({_id : req.user?._id}, {
                image: {
                    public_id: image_upload?.public_id,
                    url: image_upload?.secure_url
                }
            });

            return res.status(200).json({
                public_id: image_upload?.public_id,
                url: image_upload?.secure_url
            });
        },

        changePassword: async (req, res) => {
            const { old_password, new_password } = req.body;

            const vendor = await findVendor({ _id: req.user?._id });

            console.log(req.body)
            const passwordMatch = await passwordCompare(validator.escape(old_password), vendor);
            if (!passwordMatch) return error().resourceError(res, 'Invalid Old Password', 401);

            const validation = passwordValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);


            await findVendorByIDAndUpdate(vendor._id, { password: new_password });
            return res.status(200).json({ message: "Password Change Successful" });
        },

        getSellerAccountCreatedDate: async (req, res) => {
            const date = await getVendorCreatedDate({ _id: req.user?._id });
            return res.status(200).json(date);
        },

    }
}
export { accountController };