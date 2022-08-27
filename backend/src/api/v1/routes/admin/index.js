import { authRoutes } from "./auth.routes";
import { bannerRoutes } from "./banner.routes";
import { brandRoutes } from "./brand.routes";
import { categoryRoutes } from "./category.routes";
import { emailRoutes } from "./email.routes";
import { orderRoutes } from "./order.routes";
import { productRoutes } from "./product.routes";
import { PromotionRoutes } from "./promotions";
import { smsRoutes } from "./sms.routes";
import { VendorControlRoutes } from "./vendor";

function AdminRoutes(app) {
    authRoutes(app);
    categoryRoutes(app)
    brandRoutes(app);
    VendorControlRoutes(app);
    PromotionRoutes(app);
    bannerRoutes(app);
    orderRoutes(app);
    productRoutes(app);
    emailRoutes(app);
    smsRoutes(app);
}
export { AdminRoutes };