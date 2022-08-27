import { freeShippingController } from "../../../controllers/vendor";
import { tryCatchHandle } from "../../../utils";
import { vendorAuthentication } from "../../../middlewares/vendor";

function freeShippingRoutes(app) {
    app.get(
        "/vendor/promotions/free-shippings",
        vendorAuthentication,
        tryCatchHandle(freeShippingController().getAllFreeShippings)
    );
    app.get(
        "/vendor/promotions/active-free-shippings",
        vendorAuthentication,
        tryCatchHandle(freeShippingController().getAllActiveFreeShippings)
    );
    app.get(
        "/vendor/promotions/deactive-free-shippings",
        vendorAuthentication,
        tryCatchHandle(freeShippingController().getAllDeActiveFreeShippings)
    );
    app.get(
        "/vendor/promotions/free-shipping/:id",
        vendorAuthentication,
        tryCatchHandle(freeShippingController().getSingleFreeShipping)
    );
    app.post(
        "/vendor/promotions/create-free-shipping",
        vendorAuthentication,
        tryCatchHandle(freeShippingController().createFreeShipping)
    );
    app.patch(
        "/vendor/promotions/delete-free-shipping/:id",
        vendorAuthentication,
        tryCatchHandle(freeShippingController().deleteFreeShipping)
    );
    app.patch(
        "/vendor/promotions/active-free-shipping/:id",
        vendorAuthentication,
        tryCatchHandle(freeShippingController().activeFreeShipping)
    );
    app.patch(
        "/vendor/promotions/deactive-free-shipping/:id",
        vendorAuthentication,
        tryCatchHandle(freeShippingController().deActiveFreeShipping)
    );
}
export { freeShippingRoutes };
