import { categoryController } from "../../controllers/vendor";
import { vendorAuthentication } from "../../middlewares/vendor";
import { tryCatchHandle } from "../../utils";

function categoryRoutes(app) {
    app.get('/vendor/get-categories', vendorAuthentication, tryCatchHandle(categoryController().getAllCategory));
}
export { categoryRoutes };