import { vendorFreeShippingRoutes } from "./freeShipping.routes";
import { vendorOrderRoutes } from "./order.routes";
import { vendorProductRoutes } from "./product.routes";
import { vendorRoutes } from "./vendor.routes";
import { vendorVoucherRoutes } from "./voucher.routes";

function VendorControlRoutes(app) {
    vendorProductRoutes(app);
    vendorRoutes(app);
    vendorVoucherRoutes(app);
    vendorFreeShippingRoutes(app);
    vendorOrderRoutes(app);
}
export { VendorControlRoutes };