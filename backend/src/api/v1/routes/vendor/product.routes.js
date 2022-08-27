import { productController } from "../../controllers/vendor";
import { tryCatchHandle } from "../../utils";
import { vendorAuthentication } from '../../middlewares/vendor'

function productRoutes(app) {

    app.get('/vendor/products', vendorAuthentication, tryCatchHandle(productController().getAllProducts));
    app.get('/vendor/online-products', vendorAuthentication, tryCatchHandle(productController().getAllOnlineProducts));
    app.get('/vendor/deactive-products', vendorAuthentication, tryCatchHandle(productController().getAllDeActiveProducts));
    app.get('/vendor/suspended-products', vendorAuthentication, tryCatchHandle(productController().getAllSuspendedProducts));
    app.get('/vendor/pending-products', vendorAuthentication, tryCatchHandle(productController().getAllPendingProducts));
    app.get('/vendor/deleted-products', vendorAuthentication, tryCatchHandle(productController().getAllDeletedProducts));
    app.get('/vendor/product/:id', vendorAuthentication, tryCatchHandle(productController().getSingleProduct));
    app.post('/vendor/add-product', vendorAuthentication, tryCatchHandle(productController().addProduct));
    app.patch('/vendor/update-product/:id', vendorAuthentication, tryCatchHandle(productController().updateProduct));
    app.patch('/vendor/delete-product/:id', vendorAuthentication, tryCatchHandle(productController().deleteProduct));
    app.patch('/vendor/restore-product/:id', vendorAuthentication, tryCatchHandle(productController().restoreProduct));
    app.patch('/vendor/active-product/:id', vendorAuthentication, tryCatchHandle(productController().activeProduct));
    app.patch('/vendor/deactive-product/:id', vendorAuthentication, tryCatchHandle(productController().deActiveProduct));
}
export { productRoutes };