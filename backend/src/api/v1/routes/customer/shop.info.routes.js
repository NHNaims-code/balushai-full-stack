import { shopInfoController } from "../../controllers/customer";
import { tryCatchHandle } from "../../utils";

function shopInfoRoutes(app) {
    app.get('/shop/:shop_name', tryCatchHandle(shopInfoController().getVendorAllProductsAndInfoByShopName));
}
export { shopInfoRoutes };