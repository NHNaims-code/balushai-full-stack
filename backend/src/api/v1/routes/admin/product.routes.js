
import { productController } from "../../controllers/admin";
import { adminAuthentication } from "../../middlewares/admin";
import { tryCatchHandle } from "../../utils";

function productRoutes(app) {

    app.get('/XYZ!@!/admin/products', adminAuthentication, tryCatchHandle(productController().getAllProducts));
    app.get('/XYZ!@!/admin/product/:id', adminAuthentication, tryCatchHandle(productController().getSingleProduct));
    app.get('/XYZ!@!/admin/online-products', adminAuthentication, tryCatchHandle(productController().getAllOnlineProducts));
    app.get('/XYZ!@!/admin/pending-products', adminAuthentication, tryCatchHandle(productController().getAllPendingProducts));
    app.get('/XYZ!@!/admin/suspended-products', adminAuthentication, tryCatchHandle(productController().getAllSuspendedProducts));
    app.patch('/XYZ!@!/admin/suspended-product/:id', adminAuthentication, tryCatchHandle(productController().suspendedProduct));
    app.patch('/XYZ!@!/admin/approved-product/:id', adminAuthentication, tryCatchHandle(productController().approvedProduct));
}
export { productRoutes };