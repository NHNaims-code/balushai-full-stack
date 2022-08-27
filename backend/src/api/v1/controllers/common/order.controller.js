import { getVendorOrders, getCustomerOrders, getDynamicVendorOrders, getSingleOrder, readyToShipOrder, createCustomerOrder, cancelOrder, returnOrder, getVendorOrder } from "../../services/common/"
import { getProduct } from "../../services/vendor";
import { error } from "../../utils"
import { orderValidation } from "../../validations"
const randomNumber = () => Math.trunc(Math.random() * 10); // To genrate a random number
const generateTrackingNumber = (str) => str.replace(/X/g, randomNumber);
const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;
const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
const TRACKING_EXAMPLE = "BSXXXXXXXX";

const orderController = () => {
    return {

        // create an order by customer
        createOrder: async (req, res) => {

            const validation = orderValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const {
                products,
                shipment_fee_discount,
                payment_information,
                balushai_voucher_discount
            } = req.body;

            let grand_total = 0;
            let shipping_fee = 0;
            products?.forEach(product => {
                const { quantity, price, shipment_fee } = product;
                const total_price = Number(quantity) * Number(price);
                product.total_price = total_price + Number(shipment_fee);
                product.estimate_delivery_time = new Date(new Date().getTime() + (FIVE_DAYS));
                product.tracking_number = generateTrackingNumber(TRACKING_EXAMPLE);
                product.ship_on_time = new Date(new Date().getTime() + (THREE_DAYS));
                grand_total += total_price + + Number(shipment_fee);
                shipping_fee += Number(shipment_fee);
            })
            const discount = Number(shipment_fee_discount || 0) + Number(balushai_voucher_discount || 0);
            grand_total -= discount;
            shipping_fee -= Number(shipment_fee_discount || 0);

            const { method } = payment_information;

            if (method !== 'COD') {
                payment_information.status = payment_information?.status || "FAILED";
            }
            if (payment_information?.status === 'FAILED') return error().resourceError(res, 'Payment Failed.Please try again after some time', 406);
            //if failed bkash payment method then status will be FAILED

            //check Product Quantity
            products?.forEach(async(orderedSingleProduct) => {
                const product = await getProduct({ _id: orderedSingleProduct?.product_id });
                product?.variant_stock_price?.forEach(variant => {
                    if (variant.color_family == orderedSingleProduct?.color) {
                        variant?.sizes?.forEach(nestedSize => {
                            if (nestedSize?.quantity < 1) {
                                return error().resourceError(res, 'Sorry! You can not order now.Because some of products are not available or Sold Out.', 422);
                            }
                        })
                    }
                })
            })
            const createdOrder = await createCustomerOrder(req.user?._id, {
                ...req.body,
                products,
                grand_total,
                total_shipment_fee: shipping_fee,
                payment_information,
                user_id: req.user?._id
            }, res);
            return res.status(200).json(createdOrder);
        },

        // Find single product using ID by customer
        getCustomerSingleOrder: async (req, res) => {
            //if(typeof req.params?.id !== mongoose.Types.ObjectId) return error().resourceError(res, 'Invalid Params Id', 422);
            const order = await getSingleOrder({ $and: [{ _id: req.params?.id }, { user_id: req.user?._id }] });
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);
            return res.status(200).json(order)
        },

        // Get customer all orders
        getCustomerAllOrders: async (req, res) => {
            const Orders = await getCustomerOrders({ _id: req.user?._id })
            return res.status(200).json(Orders)
        },

        // Cancel ordered single product into single order using ID by customer
        cancelOrder: async (req, res) => {
            const { order_id, product_id } = req.params; // here product id means ordered single product id
            const { cancellation_reasons } = req.body;
            if (!cancellation_reasons) return error().resourceError(res, 'Cancellation Reasons in Required', 422);

            const order = await getSingleOrder({ _id: order_id, user_id: req.user?._id });
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'PENDING') return error().resourceError(res, 'Sorry! You can not cancel this order right now', 422);

            const canceledOrder = await cancelOrder(order_id, product_id, cancellation_reasons);
            if (!canceledOrder) return error().resourceError(res, 'Sorry! Cancel Request Failed or something wrong', 422);

            return res.status(200).json(canceledOrder);
        },

        // return ordered single product into single order using ID by customer
        returnOrderedProduct: async (req, res) => {
            const { order_id, product_id } = req.params; // here product id means ordered single product id
            const { return_on_reasons } = req.body;
            if (!return_on_reasons) return error().resourceError(res, 'Return Reasons in Required', 422);

            const order = await getSingleOrder({ _id: order_id, user_id: req.user?._id });
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'DELIVERED') return error().resourceError(res, 'Sorry! You can not return this order right now', 422);

            const returnedOrder = await returnOrder(order_id, product_id, 'RETURNED', return_on_reasons);
            if (!returnedOrder) return error().resourceError(res, 'Sorry! Return Request failed or something wrong', 422);

            return res.status(200).json(returnedOrder);
        },

        //VENDOR

        // Get vendor all orders
        getVendorAllOrders: async (req, res) => {
            const orders = await getVendorOrders({ _id: req.user?._id }, req.user?._id);
            return res.status(200).json(orders);
        },

        // Get vendor all pending orders
        getVendorPendingOrders: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.user?._id }, req.user?._id, 'PENDING');
            return res.status(200).json(orders);
        },

        // Get vendor all pending orders
        getVendorReadyToShipOrders: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.user?._id }, req.user?._id, 'READY_TO_SHIP');
            return res.status(200).json(orders);
        },

        // Get vendor all shipped orders
        getVendorShippedOrders: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.user?._id }, req.user?._id, 'SHIPPED');
            return res.status(200).json(orders);
        },

        // Get vendor all pending order counts
        getVendorPendingOrderCounts: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.user?._id }, req.user?._id, 'PENDING');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get vendor all pending order counts
        getVendorReadyToShipOrderCounts: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.user?._id }, req.user?._id, 'READY_TO_SHIP');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get vendor all shipped order counts
        getVendorShippedOrderCounts: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.user?._id }, req.user?._id, 'SHIPPED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get vendor all delivered orders
        getVendorDeliveredOrders: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.user?._id }, req.user?._id, 'DELIVERED');
            return res.status(200).json(orders);
        },

        // Get vendor all canceled orders
        getVendorCanceledOrders: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.user?._id }, req.user?._id, 'CANCELLED');
            return res.status(200).json(orders);
        },

        // Get vendor all returned orders
        getVendorReturnedOrders: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.user?._id }, req.user?._id, 'RETURNED');
            return res.status(200).json(orders);
        },

        // Get vendor all delivery failed orders
        getVendorFailedDeliveryOrders: async (req, res) => {
            const orders = await getDynamicVendorOrders({ _id: req.user?._id }, req.user?._id, 'DELIVERY_FAILED');
            return res.status(200).json(orders);
        },

        // Find single product using ID by vendor
        getVendorSingleOrder: async (req, res) => {
            const { order_id } = req.params;
            const order = await getVendorOrder({ _id: order_id }, req.user?._id);
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);
            return res.status(200).json(order)
        },

        // cancel Single Order
        cancelVendorSingleOrder: async (req, res) => {
            const { order_id, product_id } = req.params;
            const { cancellation_reasons } = req.body;
            if (!cancellation_reasons) return error().resourceError(res, 'Cancellation Reasons in Required', 422);
            const order = await getVendorOrder({ _id: order_id }, req.user?._id);
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'PENDING') return error().resourceError(res, 'Sorry! You can not do this', 422);
            
            const canceledOrder = await cancelOrder(order_id, product_id, cancellation_reasons);
            if (!canceledOrder) return error().resourceError(res, 'Sorry! Cancel Request Failed or something wrong', 422);

            return res.status(200).json(canceledOrder);
        },

        // ready to ship Order
        readyToShipVendorOrder: async (req, res) => {
            const { order_id, product_id } = req.params;
            const order = await getVendorOrder({ _id: order_id }, req.user?._id);
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'PENDING') return error().resourceError(res, 'Sorry! You can not do this', 422);

            const readyToShippedOrder = await readyToShipOrder(order_id, product_id, orderedSingleProduct[0]);
            if (!readyToShippedOrder) return error().resourceError(res, 'Sorry! Ready to Ship Request failed or something wrong', 422);
            return res.status(200).json(readyToShippedOrder);
        },
    }
}

export { orderController }