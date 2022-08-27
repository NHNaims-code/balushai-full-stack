import { brandController } from "../../controllers/vendor";
import { vendorAuthentication } from "../../middlewares/vendor";
import { tryCatchHandle } from "../../utils";

function brandRoutes(app) {
    app.get('/vendor/get-brands', vendorAuthentication, tryCatchHandle(brandController().getAllBrand));
}
export { brandRoutes };