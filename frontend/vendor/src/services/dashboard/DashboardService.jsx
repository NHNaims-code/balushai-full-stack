import { SellerOrders } from "adapters/order/Order";
import { GetFollowers, GetProductCounts } from 'adapters/dashboard/Dashboard'

export function getLatestPendingOrders() {
    return SellerOrders('pending-orders');
}

export function getFollowers() {
    return GetFollowers('followers');
}

export function getPendingProductCounts() {
    return GetProductCounts('pending-product-counts');
}

export function getSuspendedProductCounts() {
    return GetProductCounts('suspended-product-counts');
}

export function getApprovedProductCounts() {
    return GetProductCounts('approved-product-counts');
}



