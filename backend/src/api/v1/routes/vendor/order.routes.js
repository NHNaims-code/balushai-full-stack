
import { tryCatchHandle } from "../../utils";
import {vendorAuthentication} from '../../middlewares/vendor'
import { orderController } from "../../controllers/common";

function orderRoutes(app) {

    app.get('/vendor/orders',vendorAuthentication, tryCatchHandle(orderController().getVendorAllOrders));
    app.get('/vendor/order/:order_id',vendorAuthentication, tryCatchHandle(orderController().getVendorSingleOrder));
    app.patch('/vendor/ready-to-ship-order/:order_id/:product_id',vendorAuthentication, tryCatchHandle(orderController().readyToShipVendorOrder));
    app.patch('/vendor/cancel-order/:order_id/:product_id',vendorAuthentication, tryCatchHandle(orderController().cancelVendorSingleOrder));
    app.get('/vendor/pending-orders',vendorAuthentication, tryCatchHandle(orderController().getVendorPendingOrders));
    app.get('/vendor/ready-to-ship-orders',vendorAuthentication, tryCatchHandle(orderController().getVendorReadyToShipOrders));
    app.get('/vendor/shipped-orders',vendorAuthentication, tryCatchHandle(orderController().getVendorShippedOrders));
    app.get('/vendor/pending-order-counts',vendorAuthentication, tryCatchHandle(orderController().getVendorPendingOrderCounts));
    app.get('/vendor/ready-to-ship-order-counts',vendorAuthentication, tryCatchHandle(orderController().getVendorReadyToShipOrderCounts));
    app.get('/vendor/shipped-order-counts',vendorAuthentication, tryCatchHandle(orderController().getVendorShippedOrderCounts));
    app.get('/vendor/delivered-orders',vendorAuthentication, tryCatchHandle(orderController().getVendorDeliveredOrders));
    app.get('/vendor/canceled-orders',vendorAuthentication, tryCatchHandle(orderController().getVendorCanceledOrders));
    app.get('/vendor/returned-orders',vendorAuthentication, tryCatchHandle(orderController().getVendorReturnedOrders));
    app.get('/vendor/failed_delivery-orders',vendorAuthentication, tryCatchHandle(orderController().getVendorFailedDeliveryOrders));
}
export { orderRoutes };