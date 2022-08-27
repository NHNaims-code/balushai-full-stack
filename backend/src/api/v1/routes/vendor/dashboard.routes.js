import { dashboardController } from "../../controllers/vendor/dashboard.controller";
import { vendorAuthentication } from "../../middlewares/vendor";
import { tryCatchHandle } from "../../utils";

function dashboardRoutes(app) {
    app.get('/vendor/followers', vendorAuthentication, tryCatchHandle(dashboardController().getFollowers));
    app.get('/vendor/pending-product-counts', vendorAuthentication, tryCatchHandle(dashboardController().getPendingProducts));
    app.get('/vendor/suspended-product-counts', vendorAuthentication, tryCatchHandle(dashboardController().getSuspendedProducts));
    app.get('/vendor/approved-product-counts', vendorAuthentication, tryCatchHandle(dashboardController().getApprovedProducts));
}
export { dashboardRoutes };