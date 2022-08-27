
import { tryCatchHandle } from "../../../utils";
import { adminAuthentication } from "../../../middlewares/admin";
import { productController } from "../../../controllers/admin/product.controller";

function vendorProductRoutes(app) {
    app.get('/XYZ!@!/admin/vendor/all-product-counts/:vendor_id',adminAuthentication, tryCatchHandle(productController().getVendorProductCounts));
    app.get('/XYZ!@!/admin/vendor/pending-product-counts/:vendor_id',adminAuthentication, tryCatchHandle(productController().getVendorPendingProductCounts));
    app.get('/XYZ!@!/admin/vendor/online-product-counts/:vendor_id',adminAuthentication, tryCatchHandle(productController().getVendorOnlineProductCounts));
    app.get('/XYZ!@!/admin/vendor/suspended-product-counts/:vendor_id',adminAuthentication, tryCatchHandle(productController().getVendorSuspendedProductCounts));
    app.get('/XYZ!@!/admin/vendor/all-products/:vendor_id',adminAuthentication, tryCatchHandle(productController().getVendorProducts));
    app.get('/XYZ!@!/admin/vendor/pending-products/:vendor_id',adminAuthentication, tryCatchHandle(productController().getVendorPendingProducts));
    app.get('/XYZ!@!/admin/vendor/online-products/:vendor_id',adminAuthentication, tryCatchHandle(productController().getVendorOnlineProducts));
    app.get('/XYZ!@!/admin/vendor/suspended-products/:vendor_id',adminAuthentication, tryCatchHandle(productController().getVendorSuspendedProducts));
}
export { vendorProductRoutes };