import { authController } from "../../controllers/customer";
import { tryCatchHandle } from "../../utils";

function authRoutes(app) {
    app.post('/customer/sign-in', tryCatchHandle(authController().signIn));
    app.post('/customer/sign-up', tryCatchHandle(authController().signUp));
}
export { authRoutes };