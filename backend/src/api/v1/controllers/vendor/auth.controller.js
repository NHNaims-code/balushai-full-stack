import { createVendor, findVendor} from "../../services/vendor"
import { findVendorByIDAndUpdate, findVendorUsingIdAndTokenUsingAuthentication } from "../../services/vendor"
import { error, generateToken, generateTokenTracker, passwordCompare, objectValidatorEscape } from "../../utils"
import { phoneSignInValidation, signInValidation, vendorSignUpValidation } from "../../validations"
import { config } from '../../../../config';
import jwt from 'jsonwebtoken'

function authController() {
    return {
        emailSignIn: async (req, res) => {
            const { email, password } = req.body;
            const validation = signInValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const vendor = await findVendor({ "seller_account.email": email });
            if (!vendor) return error().resourceError(res, 'Invalid Credentials', 401);

            const passwordMatch = await passwordCompare(password, vendor);
            if (!passwordMatch) return error().resourceError(res, 'Invalid Credentials', 401);


            const verifyTokenTracker = await generateTokenTracker();
            const token = generateToken(vendor, verifyTokenTracker);

            await findVendorByIDAndUpdate(vendor._id, { token: verifyTokenTracker });
            return res.status(200).json({ token: token });
        },

        phoneSignIn: async (req, res) => {
            const { phone, password } = req.body;
            const validation = phoneSignInValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const vendor = await findVendor({ "seller_account.phone": phone });
            if (!vendor) return error().resourceError(res, 'Invalid Credentials', 401);

            const passwordMatch = await passwordCompare(password, vendor);
            if (!passwordMatch) return error().resourceError(res, 'Invalid Credentials', 401);


            const verifyTokenTracker = await generateTokenTracker();
            const token = generateToken(vendor, verifyTokenTracker);

            await findVendorByIDAndUpdate(vendor._id, { token: verifyTokenTracker });
            return res.status(200).json({ token: token });
        },

        signUp: async (req, res) => {
            // De-Structure data from req.body
            const { shop_name, email, phone } = req.body;
            // Validate all information
            const validation = vendorSignUpValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);
            //find a user is assigned to the same email or phone
            const user = await findVendor({ $or: [{ "seller_account.email": email }, { "seller_account.phone": phone }] });
            if (user) return error().resourceError(res, 'Email or Phone Number already exists. Please choose a different Email or Phone Number', 409);

            const shop_name_checker = await findVendor({ "seller_account.shop_name": shop_name });
            if (shop_name_checker) return error().resourceError(res, 'Please choose a different Shop Name', 409);

            //malicious data refactor
            const refactor_data = await objectValidatorEscape(req.body);

            // save into mongo db
            await createVendor(refactor_data, res);
            return res.status(201).json({ message: 'Sign Up Successful' });
        },

        //Cookie Authentication
        Authenticate: async (req, res) => {
            const token = req.header('Authorization');
            if (!token) return res.status(403).json(false);
            try {
                const verify_token = await jwt.verify(token, config?.jwt?.key);
                const vendor = await findVendorUsingIdAndTokenUsingAuthentication({ $and: [{ _id: verify_token._id }, { token: verify_token?.verifyToken }] })
                if (!vendor) return res.status(401).json(false);
                return res.status(200).json(true);
            } catch (err) {
                console.log(err)
                return res.status(401).json(false);
            }

        },
    }
}
export { authController };