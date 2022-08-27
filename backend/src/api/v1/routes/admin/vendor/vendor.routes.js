
import { vendorController } from "../../../controllers/admin";
import { tryCatchHandle } from "../../../utils";

function vendorRoutes(app) {

    app.get('/XYZ!@!/admin/vendors', tryCatchHandle(vendorController().getAllVendors));
    app.get('/XYZ!@!/admin/vendor/:id', tryCatchHandle(vendorController().getSingleVendor));
    app.get('/XYZ!@!/admin/deactivated-vendors', tryCatchHandle(vendorController().getAllDeActivatedVendors));
    app.get('/XYZ!@!/admin/activated-vendors', tryCatchHandle(vendorController().getAllActivatedVendors));
    app.get('/XYZ!@!/admin/deactivated-vendor-counts', tryCatchHandle(vendorController().getDeActivatedVendorCounts));
    app.get('/XYZ!@!/admin/activated-vendor-counts', tryCatchHandle(vendorController().getActivatedVendorCounts));
    app.patch('/XYZ!@!/admin/active-vendor/:id', tryCatchHandle(vendorController().activeVendor));
    app.patch('/XYZ!@!/admin/de_active-vendor/:id', tryCatchHandle(vendorController().deActiveVendor));
}
export { vendorRoutes };