import { accountRoutes } from './account.routes';
import { authRoutes } from './auth.routes.js';
import { brandRoutes } from './brand.routes';
import { categoryRoutes } from './category.routes';
import { dashboardRoutes } from './dashboard.routes';
import { imageRoutes } from './image.routes';
import { messageRoutes } from './message.routes';
import { orderRoutes } from './order.routes';
import { productRoutes } from './product.routes.js';
import { campaignRoutes } from './promotions/campaign.routes';
import { freeShippingRoutes } from './promotions/freeShipping.routes';
import { voucherRoutes } from './promotions/voucher.routes';
function VendorRoutes(app) {
    authRoutes(app);
    productRoutes(app);
    accountRoutes(app);
    imageRoutes(app);
    voucherRoutes(app);
    freeShippingRoutes(app);
    categoryRoutes(app);
    brandRoutes(app);
    orderRoutes(app);
    dashboardRoutes(app);
    messageRoutes(app);
    campaignRoutes(app);
}
export { VendorRoutes };