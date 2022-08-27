import { AdminOrders, CountOrders } from "adapters/order/Order";
import { CountVendors, SingleVendor, UpdateVendor, Vendors } from "adapters/vendor/Vendor";
export function getVendors(type) {
    switch (type) {
        case 'all':
            return Vendors('vendors');
        case 'de_active':
            return Vendors('deactivated-vendors');
        case 'active':
            return Vendors('activated-vendors');
        default:
            return null;
    }
}

export function getVendor(id) {
    return SingleVendor(`vendor/${id}`);
}

export function activeVendor(id) {
    return UpdateVendor(`active-vendor/${id}`, {});
}
export function deActiveVendor(id) {
    return UpdateVendor(`de_active-vendor/${id}`, {});
}
export function getVendorCount(type) {
    switch (type) {
        case 'de_active':
            return CountVendors('deactivated-vendor-counts');
        case 'active':
            return CountVendors('activated-vendor-counts');
        default:
            return null;
    }
}
export function getVendorOrderCount(type, id) {
    switch (type) {
        case 'pending':
            return CountOrders(`vendor-pending-order-counts/${id}`);
        case 'ready_to_ship':
            return CountOrders(`vendor-ready_to_ship-order-counts/${id}`);
        case 'shipped':
            return CountOrders(`vendor-shipped-order-counts/${id}`);
        case 'delivered':
            return CountOrders(`vendor-delivered-order-counts/${id}`);
        case 'canceled':
            return CountOrders(`vendor-cancelled-order-counts/${id}`);
        case 'returned':
            return CountOrders(`vendor-returned-order-counts/${id}`);
        case 'failed':
            return CountOrders(`vendor-failed_delivery-order-counts/${id}`);
        case 'SLABeached':
            return CountOrders(`vendor-sla-beached-order-counts/${id}`);
        default:
            return null;
    }
}

export function getVendorOrders(type, id) {
    switch (type) {
        case 'all':
            return AdminOrders(`vendor-orders/${id}`);
        case 'pending':
            return AdminOrders(`vendor-pending-orders/${id}`);
        case 'ready_to_ship':
            return AdminOrders(`vendor-ready-to-ship-orders/${id}`);
        case 'shipped':
            return AdminOrders(`vendor-shipped-orders/${id}`);
        case 'delivered':
            return AdminOrders(`vendor-delivered-orders/${id}`);
        case 'canceled':
            return AdminOrders(`vendor-canceled-orders/${id}`);
        case 'returned':
            return AdminOrders(`vendor-returned-orders/${id}`);
        case 'failed_delivery':
            return AdminOrders(`vendor-failed_delivery-orders/${id}`);
        default:
            return null;
    }
}


