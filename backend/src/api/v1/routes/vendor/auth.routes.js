import { otpController } from "../../controllers/common";
import { emailController } from "../../controllers/common/email.controller";
import { authController } from "../../controllers/vendor";
import { tryCatchHandle } from "../../utils";

function authRoutes(app) {
    app.post('/vendor/email-sign-in', tryCatchHandle(authController().emailSignIn));
    app.post('/vendor/phone-sign-in', tryCatchHandle(authController().phoneSignIn));
    app.post('/vendor/sign-up', tryCatchHandle(authController().signUp));
    app.get('/vendor/authenticate', tryCatchHandle(authController().Authenticate));

    //Otp 
    app.post('/vendor/send-otp', tryCatchHandle(otpController().sendOtp));
    app.post('/vendor/verify-otp', tryCatchHandle(otpController().verifyOtp));

    //Password Reset 
    app.post('/vendor/send-token', tryCatchHandle(emailController().sendToken));
    app.post('/vendor/verity-token', tryCatchHandle(emailController().verifyToken));
}
export { authRoutes };