import { voucherController } from "../../../controllers/admin";
import { adminAuthentication } from "../../../middlewares/admin";
import { tryCatchHandle } from "../../../utils";

function vendorVoucherRoutes(app) {
    app.get("/XYZ!@!/admin/promotions/vendor-all-vouchers/:id", adminAuthentication, tryCatchHandle(voucherController().getVendorAllVouchers));
    app.get("/XYZ!@!/admin/promotions/vendor-active-vouchers/:id", adminAuthentication, tryCatchHandle(voucherController().getVendorAllActiveVouchers));
    app.get("/XYZ!@!/admin/promotions/vendor-deactive-vouchers/:id", adminAuthentication, tryCatchHandle(voucherController().getVendorAllDeActiveVouchers));
    app.get("/XYZ!@!/admin/promotions/vendor-all-voucher-counts/:id", adminAuthentication, tryCatchHandle(voucherController().getVendorAllVouchersCount));
    app.get("/XYZ!@!/admin/promotions/vendor-active-voucher-counts/:id", adminAuthentication, tryCatchHandle(voucherController().getVendorAllActiveVouchersCount));
    app.get("/XYZ!@!/admin/promotions/vendor-deactive-voucher-counts/:id", adminAuthentication, tryCatchHandle(voucherController().getVendorAllDeActiveVouchersCount));
    app.get("/XYZ!@!/admin/promotions/vendor-all-voucher-counts/:id", adminAuthentication, tryCatchHandle(voucherController().getVendorAllVouchersCount));
    app.get("/XYZ!@!/admin/promotions/vendor-active-voucher-counts/:id", adminAuthentication, tryCatchHandle(voucherController().getVendorAllActiveVouchersCount));
    app.get("/XYZ!@!/admin/promotions/vendor-deactive-voucher-counts/:id", adminAuthentication, tryCatchHandle(voucherController().getVendorAllDeActiveVouchersCount));
    app.get("/XYZ!@!/admin/promotions/vendor-voucher/:id", adminAuthentication, tryCatchHandle(voucherController().getSingleVoucher));
    app.patch("/XYZ!@!/admin/promotions/vendor-active-voucher/:id", adminAuthentication, tryCatchHandle(voucherController().activeVoucher));
    app.patch("/XYZ!@!/admin/promotions/vendor-deactive-voucher/:id", adminAuthentication, tryCatchHandle(voucherController().deActiveVoucher));
}
export { vendorVoucherRoutes };
