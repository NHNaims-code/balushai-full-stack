import { findVendor, insertOtp, getOtp, updateOtp } from "../../services/vendor"
import { error, phoneSmsErrorMessage } from "../../utils"
import { phoneAndOtpValidation, vendorSignUpValidation } from "../../validations"
import { config } from '../../../../config';
import request from 'request';
const FIVE_MINUTES = 5 * 60 * 1000;
const TWO_MINUTES = 2 * 60 * 1000;

function otpController() {
    return {

        //Otp 
        sendOtp: async (req, res) => {
            const { sms } = config;
            const { phone, shop_name, email, } = req.body;

            // Validate all information
            const validation = vendorSignUpValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //find a user is assigned to the same email or phone
            const user = await findVendorUsingEmailOrPhoneNumber({ $or: [{ "seller_account.email": email }, { "seller_account.phone": phone }] });
            if (user) return error().resourceError(res, 'Email or Phone Number already exists. Please choose a different Email or Phone Number', 409);

            const shop_name_checker = await findVendorUsingShopName({ "seller_account.shop_name": shop_name });
            if (shop_name_checker) return error().resourceError(res, 'Please choose a different Shop Name', 409);

            const random = 100000 + Math.floor(Math.random() * 900000);
            const message = `Your Balushai OTP is ${random}`;

            var options = {
                'method': 'POST',
                'url': `${sms.uri}?username=${sms.username}&password=${sms.password}&number=${phone}&message=${message}`,
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            const doestPhone = await getOtp({ phone });
            if (doestPhone) {
                await updateOtp({
                    phone
                }, {
                    otp: random,
                    expire_time: Date.now() + TWO_MINUTES
                })
                return res.status(200).json({ message: "Message Send Successful. Please check your Phone Number" })
            }
            await insertOtp({
                phone,
                otp: random,
                expire_time: Date.now() + TWO_MINUTES
            })
            return res.status(200).json({ message: "Message Send Successful. Please check your Phone Number" })
            /* request(options, async function (error, response) {
                if (error) return error().resourceError(res, 'Something went wrong', 500);
                const code = response?.body;
                if (code?.includes('1101')) {
                    //otp expire time -> two minute
                    const doestPhone = await getOtp({ phone });
                    if (doestPhone) {
                        await updateOtp({
                            phone
                        }, {
                            otp: random,
                            expire_time: Date.now() + TWO_MINUTES
                        })
                        return res.status(200).json({ message: "Message Send Successful. Please check your Phone Number" })
                    }
                    await insertOtp({
                        phone,
                        otp: random,
                        expire_time: Date.now() + TWO_MINUTES
                    })
                    return res.status(200).json({ message: "Message Send Successful. Please check your Phone Number" })
                }
                return phoneSmsErrorMessage(Number(code), res);
            }); */
        },
        verifyOtp: async (req, res) => {
            const { otp, phone } = req.body;

            const validation = phoneAndOtpValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const verified = await getOtp({ phone, otp, expire_time: { $gt: Date.now() } })
            if (!verified) return error().resourceError(res, 'Invalid OTP or OTP is Expired. Please try again after some time', 409);

            return res.status(200).json({ message: 'Verified Successful' });
        },
    }
}
export { otpController };