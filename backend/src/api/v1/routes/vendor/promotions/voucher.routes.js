import { voucherController } from "../../../controllers/vendor";
import { vendorAuthentication } from "../../../middlewares/vendor";
import { tryCatchHandle } from "../../../utils";

function voucherRoutes(app) {
    app.get(
        "/vendor/promotions/vouchers",
        vendorAuthentication,
        tryCatchHandle(voucherController().getAllVouchers)
    );
    app.get(
        "/vendor/promotions/active-vouchers",
        vendorAuthentication,
        tryCatchHandle(voucherController().getAllActiveVouchers)
    );
    app.get(
        "/vendor/promotions/deactive-vouchers",
        vendorAuthentication,
        tryCatchHandle(voucherController().getAllDeActiveVouchers)
    );
    app.get(
        "/vendor/promotions/voucher/:id",
        vendorAuthentication,
        tryCatchHandle(voucherController().getSingleVoucher)
    );
    app.post(
        "/vendor/promotions/create-voucher",
        vendorAuthentication,
        tryCatchHandle(voucherController().createVoucher)
    );
    app.patch(
        "/vendor/promotions/update-voucher/:id",
        vendorAuthentication,
        tryCatchHandle(voucherController().updateVoucher)
    );
    app.patch(
        "/vendor/promotions/active-voucher/:id",
        vendorAuthentication,
        tryCatchHandle(voucherController().activeVoucher)
    );
    app.patch(
        "/vendor/promotions/deactive-voucher/:id",
        vendorAuthentication,
        tryCatchHandle(voucherController().deActiveVoucher)
    );
}
export { voucherRoutes };
