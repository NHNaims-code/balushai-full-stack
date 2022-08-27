import { tryCatchHandle } from "../../../utils";
import { freeShippingController } from "../../../controllers/admin";
import { adminAuthentication } from "../../../middlewares/admin";

function vendorFreeShippingRoutes(app) {
    app.get(
        "/XYZ!@!/admin/promotions/vendor-all-free-shipping-counts/:id",
        adminAuthentication,
        tryCatchHandle(freeShippingController().getVendorAllFreeShippingCounts)
    );
    app.get(
        "/XYZ!@!/admin/promotions/vendor-active-free-shipping-counts/:id",
        adminAuthentication,
        tryCatchHandle(freeShippingController().getVendorAllActiveFreeShippingCounts)
    );
    app.get(
        "/XYZ!@!/admin/promotions/vendor-deactive-free-shipping-counts/:id",
        adminAuthentication,
        tryCatchHandle(freeShippingController().getVendorAllDeActiveFreeShippingCounts)
    );
    app.get(
        "/XYZ!@!/admin/promotions/vendor-all-free-shippings/:id",
        adminAuthentication,
        tryCatchHandle(freeShippingController().getVendorAllFreeShippings)
    );
    app.get(
        "/XYZ!@!/admin/promotions/vendor-active-free-shippings/:id",
        adminAuthentication,
        tryCatchHandle(freeShippingController().getVendorAllActiveFreeShippings)
    );
    app.get(
        "/XYZ!@!/admin/promotions/vendor-deactive-free-shippings/:id",
        adminAuthentication,
        tryCatchHandle(freeShippingController().getVendorAllDeActiveFreeShippings)
    );
}
export { vendorFreeShippingRoutes };
