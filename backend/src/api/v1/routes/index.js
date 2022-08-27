import { AdminRoutes } from "./admin";
import { CustomerRoutes } from "./customer";
import { VendorRoutes } from "./vendor";

function routes(app) {
    CustomerRoutes(app);
    VendorRoutes(app);
    AdminRoutes(app);
}
export { routes };