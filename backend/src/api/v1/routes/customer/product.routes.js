import {productController} from '../../controllers/customer'
import { tryCatchHandle } from "../../utils";

function productRoutes(app) {

    app.get('/products',  tryCatchHandle(productController().getAllProducts));
    app.get('/product/:slug',  tryCatchHandle(productController().getSingleProductBySlug));
}
export { productRoutes };