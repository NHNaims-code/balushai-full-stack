import { CountOrders, SellerOrders, SingleOrder, UpdateOrder } from "adapters/order/Order";
export function getOrders(type) {
    switch (type) {
        case 'all':
            return SellerOrders('orders');
        case 'pending':
            return SellerOrders('pending-orders');
        case 'ready_to_ship':
            return SellerOrders('ready-to-ship-orders');
        case 'shipped':
            return SellerOrders('shipped-orders');
        case 'delivered':
            return SellerOrders('delivered-orders');
        case 'canceled':
            return SellerOrders('canceled-orders');
        case 'returned':
            return SellerOrders('returned-orders');
        case 'failed_delivery':
            return SellerOrders('failed_delivery-orders');
        default:
            return null;
    }
}

export function getOrder(id) {
    return SingleOrder(`order/${id}`);
}

export function cancelOrder(order_id, product_id, cancel_reason) {
    return UpdateOrder(`cancel-order/${order_id}/${product_id}`, { cancellation_reasons: cancel_reason });
}

export function readyToShipOrder(order_id, product_id) {
    return UpdateOrder(`ready-to-ship-order/${order_id}/${product_id}`, {});
}
export function getOrderCount(type) {
    switch (type) {
        case 'pending':
            return CountOrders('pending-order-counts');
        case 'ready_to_ship':
            return CountOrders('ready-to-ship-order-counts');
        case 'shipped':
            return CountOrders('shipped-order-counts');
        default:
            return null;
    }
}


