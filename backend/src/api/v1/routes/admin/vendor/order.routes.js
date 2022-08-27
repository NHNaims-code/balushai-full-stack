
import { tryCatchHandle } from "../../../utils";
import { orderController } from "../../../controllers/admin";
import { adminAuthentication } from "../../../middlewares/admin";

function vendorOrderRoutes(app) {

    app.get('/XYZ!@!/admin/vendor-orders/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorAllOrders));
    app.get('/XYZ!@!/admin/vendor-pending-orders/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorPendingOrders));
    app.get('/XYZ!@!/admin/vendor-ready-to-ship-orders/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorReadyToShipOrders));
    app.get('/XYZ!@!/admin/vendor-shipped-orders/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorShippedOrders));
    app.get('/XYZ!@!/admin/vendor-delivered-orders/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorDeliveredOrders));
    app.get('/XYZ!@!/admin/vendor-failed_delivery-orders/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorFailedDeliveryOrders));
    app.get('/XYZ!@!/admin/vendor-canceled-orders/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorCanceledOrders));
    app.get('/XYZ!@!/admin/vendor-returned-orders/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorReturnedOrders));
    app.get('/XYZ!@!/admin/vendor-pending-order-counts/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorPendingOrderCounts));
    app.get('/XYZ!@!/admin/vendor-ready_to_ship-order-counts/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorReadyToShipOrderCounts));
    app.get('/XYZ!@!/admin/vendor-shipped-order-counts/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorShippedOrderCounts));
    app.get('/XYZ!@!/admin/vendor-delivered-order-counts/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorDeliveredOrderCounts));
    app.get('/XYZ!@!/admin/vendor-cancelled-order-counts/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorCancelOrderCounts));
    app.get('/XYZ!@!/admin/vendor-returned-order-counts/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorReturnedOrderCounts));
    app.get('/XYZ!@!/admin/vendor-failed_delivery-order-counts/:vendor_id',adminAuthentication, tryCatchHandle(orderController().getVendorFailedDeliverOrderCounts));
}
export { vendorOrderRoutes };