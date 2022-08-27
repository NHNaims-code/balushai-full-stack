import { createAdmin, findAdminAndUpdate, findAdmin, findAdminById } from "../../services/admin";
import { error, generateToken, generateTokenTracker } from "../../utils"
import { adminPhoneNumberValidation, adminSignUpValidation } from "../../validations";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../../../config';
const FIVE_MINUTES = 5000;

function authController() {
    return {
        phoneVerifyAndSendOtp: async (req, res) => {
            const { phone } = req.body;

            // Validate all information
            const validation = adminPhoneNumberValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //find a admin using phone
            const admin = await findAdmin({ phone });
            if (!admin) return error().resourceError(res, 'Invalid Number', 404);

            const randomId = 100000 + Math.floor(Math.random() * 90000000);
            await findAdminAndUpdate({ _id: admin?._id }, { otp: randomId });
            return res.status(200).json({ otp: randomId });

            //send code in phone number or email


        },

        signIn: async (req, res) => {
            const { phone, otp } = req.body;

            // Validate all information
            const validation = adminPhoneNumberValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //find a admin using phone
            const admin = await findAdmin({ $and: [{ phone }, { otp }] });
            if (!admin) return error().resourceError(res, 'Invalid Number', 401);

            const verifyTokenTracker = await generateTokenTracker();
            const tokenHash = await bcrypt.hash(verifyTokenTracker, 10);

            const token = generateToken(admin, tokenHash);

            await findAdminAndUpdate({ _id: admin._id }, { token: verifyTokenTracker });
            return res.status(200).json({ token: token });
        },
        //Cookie Authentication
        Authenticate: async (req, res) => {
            const token = req.header('Authorization');
            if (!token) return res.status(403).json(false);
            try {
                const verify_token = jwt.verify(token, config?.jwt?.key);
                const { _id, verifyToken } = verify_token;
                const admin = await findAdminById(_id);
                const tokenMatch = await bcrypt.compare(admin?.token, verifyToken);
                if (!tokenMatch) return res.status(401).json(false);
                return res.status(200).json(true);
            } catch (err) {
                console.log(err)
                return res.status(401).json(false);
            }

        },
        signUp: async (req, res) => {

            // Validate all information
            const validation = adminSignUpValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            // save into mongo db
            const data = await createAdmin(req.body);
            return res.status(201).json({
                message: 'Account Created Successful'
            });
        },
    }
}
export { authController };