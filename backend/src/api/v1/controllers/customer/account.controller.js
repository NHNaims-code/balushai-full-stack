import { error, passwordCompare, objectValidatorEscape } from "../../utils";
import validator from "validator";
import { findCustomerByIDAndUpdate, findCustomerUsingID, getCustomerAccountInfo, getCustomerAccountPhoto, updateCustomerAccountInfo, updateCustomerAccountPhoto } from "../../services/customer";
import { customerAccountInfoValidation, passwordValidation } from "../../validations";

function accountController() {
    return {
        getCustomerAccountInfo: async (req, res) => {
            const vendor = await getCustomerAccountInfo({ _id: req.user?._id });
            return res.status(200).json(vendor);
        },
        updateCustomerAccountInfo: async (req, res) => {

            //const { name,phone} = req.body;

            const validation = customerAccountInfoValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //malicious data refactor
            const refactor_data = await objectValidatorEscape(req.body);

            const updatedVendor = await updateCustomerAccountInfo({ _id: req.user?._id }, refactor_data , res);
            return res.status(200).json(updatedVendor);
        },

        getAccountPhoto: async (req, res) => {
            const img = await getCustomerAccountPhoto({ _id: req.user?._id });
            return res.status(200).json(img);
        },
        updateAccountPhoto: async (req, res) => {

            if (req.fileExtensionValidationError) return error().resourceError(res, 'Only .png, .jpg and .jpeg format allowed!', 415);
            if (req.file?.size >= 3 * 1024 * 1024) return error().resourceError(res, 'Image size mus lower than 3 MB', 409);

            const image_upload = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'balushai/customer', use_filename: true });
            if (!image_upload?.secure_url) return error().resourceError(res, 'Image Uploaded Failed . Please try again', 500);

            await updateCustomerAccountPhoto({ _id: req.user?._id }, {
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

            const customer = await findCustomerUsingID(req.user?._id);

            const passwordMatch = await passwordCompare(validator.escape(old_password), customer);
            if (!passwordMatch) return error().resourceError(res, 'Invalid Old Password', 401);

            const validation = passwordValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);


            await findCustomerByIDAndUpdate(customer._id, { password: new_password });
            return res.status(200).json({ message: "Password Changed Successful" });
        },

    }
}
export { accountController };