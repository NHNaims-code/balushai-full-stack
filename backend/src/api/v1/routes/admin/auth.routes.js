import { authController } from "../../controllers/admin";
import { tryCatchHandle } from "../../utils";

function authRoutes(app) {
    app.post('/XYZ!@!/admin/send-otp', tryCatchHandle(authController().phoneVerifyAndSendOtp));
    app.post('/XYZ!@!/admin/sign-in', tryCatchHandle(authController().signIn));
    app.get('/XYZ!@!/admin/authenticate', tryCatchHandle(authController().Authenticate));
    app.post('/XYZ!@/admin/create-AbC*!@', tryCatchHandle(authController().signUp));
}
export { authRoutes };