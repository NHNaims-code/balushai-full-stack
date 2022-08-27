import { cancelOrder, getOrder, getOrders, getDynamicOrders, updateOrder } from "../../services/admin/order.services";
import { getDynamicVendorOrders, getVendorOrders } from "../../services/admin/vendor/order.services";
import { error } from "../../utils"

const orderController = () => {
    return {

        // Get Admin all orders
        getAllOrders: async (req, res) => {
            const orders = await getOrders({});
            return res.status(200).json(orders);
        },

        // Get Admin all pending orders
        getPendingOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'PENDING');
            return res.status(200).json(orders);
        },

        // Get Admin all ready to ship orders
        getReadyToShipOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'READY_TO_SHIP');
            return res.status(200).json(orders);
        },

        // Get Admin all shipped orders
        getShippedOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'SHIPPED');
            return res.status(200).json(orders);
        },

        // Get Admin all pending order counts
        getPendingOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'PENDING');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all shipped order counts
        getReadyToShipOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'READY_TO_SHIP');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all shipped order counts
        getShippedOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'SHIPPED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all delivered order counts
        getDeliveredOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'DELIVERED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all canceled order counts
        getCancelledOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'CANCELLED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all returned order counts
        getReturnedOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'RETURNED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all failed Delivery order counts
        getFailedDeliveryOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'DELIVERY_FAILED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all sla Beached order counts
        getSLABeachedOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'SLA');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all delivered orders
        getDeliveredOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'DELIVERED');
            return res.status(200).json(orders);
        },

        // Get Admin all sla Beached orders
        getSLABeachedOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'SLA');
            return res.status(200).json(orders);
        },

        // Get Admin all canceled orders
        getCanceledOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'CANCELLED');
            return res.status(200).json(orders);
        },

        // Get Admin all returned orders
        getReturnedOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'RETURNED');
            return res.status(200).json(orders);
        },

        // Get Admin all delivery failed orders
        getFailedDeliveryOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'DELIVERY_FAILED');
            return res.status(200).json(orders);
        },

        // Find single product using ID by Admin
        getOrder: async (req, res) => {
            const { order_id } = req.params;
            const order = await getOrder({ _id: order_id });
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);
            return res.status(200).json(order)
        },

        // cancel Single Order
        cancelOrder: async (req, res) => {
            const { order_id, product_id } = req.params;
            const { cancellation_reasons } = req.body;
            if (!cancellation_reasons) return error().resourceError(res, 'Cancellation Reasons in Required', 422);
            const order = await getOrder({ _id: order_id });
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            
            if (orderedSingleProduct[0]?.status === 'PENDING' || orderedSingleProduct[0]?.status === 'READY_TO_SHIP') {
                const canceledOrder = await cancelOrder(order_id, product_id, cancellation_reasons);
                if (!canceledOrder) return error().resourceError(res, 'Sorry! Cancel Request Failed or something wrong', 422);

                return res.status(200).json(canceledOrder);
            }
            return error().resourceError(res, 'Sorry! You can not do this', 422);
        },

        // shipped Order
        shippedOrder: async (req, res) => {
            const { order_id, product_id } = req.params;
            const order = await getOrder({ _id: order_id }, req.user?._id);
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'READY_TO_SHIP') return error().resourceError(res, 'Sorry! You can not do this', 422);

            const updatedOrder = await updateOrder(order_id, product_id, 'SHIPPED');
            if (!updatedOrder) return error().resourceError(res, 'Sorry! Shipped Request failed or something wrong', 422);
            return res.status(200).json(updatedOrder);
        },
        // delivered Order
        deliveredOrder: async (req, res) => {
            const { order_id, product_id } = req.params;
            const order = await getOrder({ _id: order_id }, req.user?._id);
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'SHIPPED') return error().resourceError(res, 'Sorry! You can not do this', 422);

            const updatedOrder = await updateOrder(order_id, product_id, 'DELIVERED');
            if (!updatedOrder) return error().resourceError(res, 'Sorry! Delivered Request failed or something wrong', 422);
            return res.status(200).json(updatedOrder);
        },

        // return Order
        returnedOrder: async (req, res) => {
            const { order_id, product_id } = req.params;
            const order = await getOrder({ _id: order_id }, req.user?._id);
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'DELIVERY_FAILED') return error().resourceError(res, 'Sorry! You can not do this', 422);

            const updatedOrder = await updateOrder(order_id, product_id, 'RETURNED');
            if (!updatedOrder) return error().resourceError(res, 'Sorry! Returned Request failed or something wrong', 422);
            return res.status(200).json(updatedOrder);
        },

        // return Order
        failedDeliveryOrder: async (req, res) => {
            const { order_id, product_id } = req.params;
            const order = await getOrder({ _id: order_id }, req.user?._id);
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'SHIPPED') return error().resourceError(res, 'Sorry! You can not do this', 422);

            const updatedOrder = await updateOrder(order_id, product_id, 'DELIVERY_FAILED');
            if (!updatedOrder) return error().resourceError(res, 'Sorry! Delivery Failed Request failed or something wrong', 422);
            return res.status(200).json(updatedOrder);
        },

        //vendor orders manage

        // Get vendor all orders
        getVendorAllOrders: async (req, res) => {
            const orders = await getVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id);
            return res.status(200).json(orders);
        },

        // Get vendor all pending orders
        getVendorPendingOrders: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id, 'PENDING');
            return res.status(200).json(orders);
        },

        // Get vendor all pending orders
        getVendorReadyToShipOrders: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id, 'READY_TO_SHIP');
            return res.status(200).json(orders);
        },

        // Get vendor all shipped orders
        getVendorShippedOrders: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id, 'SHIPPED');
            return res.status(200).json(orders);
        },

        // Get vendor all delivered orders
        getVendorDeliveredOrders: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id, 'DELIVERED');
            return res.status(200).json(orders);
        },

        // Get vendor all canceled orders
        getVendorCanceledOrders: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id, 'CANCELLED');
            return res.status(200).json(orders);
        },

        // Get vendor all returned orders
        getVendorReturnedOrders: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id, 'RETURNED');
            return res.status(200).json(orders);
        },

        // Get vendor all delivery failed orders
        getVendorFailedDeliveryOrders: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id, 'DELIVERY_FAILED');
            return res.status(200).json(orders);
        },

        // Get vendor all pending order counts
        getVendorPendingOrderCounts: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id, 'PENDING');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get vendor all pending order counts
        getVendorReadyToShipOrderCounts: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id, 'READY_TO_SHIP');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get vendor all shipped order counts
        getVendorShippedOrderCounts: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id, 'SHIPPED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get vendor all delivered order counts
        getVendorDeliveredOrderCounts: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id, 'DELIVERED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get vendor all cancel order counts
        getVendorCancelOrderCounts: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id, 'CANCELLED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get vendor all returned order counts
        getVendorReturnedOrderCounts: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id, 'RETURNED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get vendor all failed Delivery order counts
        getVendorFailedDeliverOrderCounts: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.params?.vendor_id }, req.params?.vendor_id, 'DELIVERY_FAILED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Find single product using ID by vendor
        getVendorSingleOrder: async (req, res) => {
            const { order_id } = req.params;
            const order = await getVendorOrder({ _id: order_id }, req.params?.vendor_id);
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);
            return res.status(200).json(order)
        },
    }
}

export { orderController }