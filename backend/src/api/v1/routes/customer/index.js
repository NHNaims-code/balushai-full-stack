import { accountRoutes } from "./account.routes";
import { addressRoutes } from "./address.routes";
import { authRoutes } from "./auth.routes";
import { cartRoutes } from "./cart.routes";
import { messageRoutes } from "./message.routes";
import { orderRoutes } from "./order.routes";
import { productRoutes } from "./product.routes";
import { reviewRoutes } from "./review.routes";
import { shopInfoRoutes } from "./shop.info.routes";
import { wishlistRoutes } from "./wishlist.routes";

function CustomerRoutes(app) {
    authRoutes(app);
    accountRoutes(app);
    productRoutes(app);
    orderRoutes(app);
    reviewRoutes(app);
    shopInfoRoutes(app);
    addressRoutes(app);
    wishlistRoutes(app);
    cartRoutes(app);
    messageRoutes(app);
}
export { CustomerRoutes };