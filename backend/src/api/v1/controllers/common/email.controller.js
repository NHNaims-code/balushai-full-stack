import crypto from 'crypto';
import { findVendor, updateVendor } from "../../services/vendor"
import { error, mailSend } from "../../utils"
import hashPassword from '../../utils/common/hashPassword';
const TEN_MINUTES = 10 * 60 * 1000;
const RESET_PASSWORD_EXPIRE_DATE = TEN_MINUTES;

function emailController() {
    return {
        //Otp 
        sendToken: async (req, res) => {
            const { email } = req.body;
            const url = req.get('origin');

            const vendor = await findVendor({ 'seller_account.email': email });
            if (!vendor) return error().resourceError(res, 'This email address have no account', 401);

            const resetPasswordToken = crypto.randomBytes(16).toString("hex");
            await updateVendor({ _id: vendor?._id }, { resetPasswordToken, resetPasswordTokenDate: Date.now() + RESET_PASSWORD_EXPIRE_DATE });
            const urlWithToken = `${url}/#/reset-password?token=${resetPasswordToken}`;
            const response = await mailSend(email, urlWithToken);
            if (!response) return error().resourceError(res, "Email Send Failed", 409);
            setTimeout(async () => {
                await updateVendor({ _id: vendor?._id }, { resetPasswordToken: null, resetPasswordTokenDate: null });
            }, TEN_MINUTES)
            res.status(200).json({
                message: "Email Send Successful"
            });
        },
        verifyToken: async (req, res) => {
            const { password, resetPasswordToken } = req.body;
            if (resetPasswordToken?.length != 32) return error().resourceError(res, 'Invalid Token', 401)

            const vendor = await findVendor({ resetPasswordToken: resetPasswordToken, resetPasswordTokenDate: { $gt: Date.now() } })
            if (!vendor) return error().resourceError(res, 'Reset Token has been expired.', 401)

            const hashedPassword = await hashPassword(password)

            const data = await updateVendor({ _id: vendor._id }, { password: hashedPassword, resetPasswordToken: null, resetPasswordTokenDate: null, token: null });
            if (!data) return error().resourceError(res, "Password Reset Failed", 409);

            return res.status(200).json({ message: 'Token Verified Successful' });
        },
    }
}
export { emailController };