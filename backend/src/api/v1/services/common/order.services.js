import { Order } from "../../mongodb/common"
import { Customer } from '../../mongodb/customer'
import { Product, Vendor } from "../../mongodb/vendor"
import { globalErrorHandler } from "../../utils"
import _ from 'lodash'
import { getProduct, updateProductQuantity } from "../vendor"

export const createCustomerOrder = async (user_id, data, res) => {
    try {
        const newOrder = await new Order(data);
        const savedOrder = await newOrder.save()
        await pushCustomerOrders(user_id, newOrder._id);
        const { products } = data;
        pushVendorOrders(products, newOrder._id);
        productQuantityUpdate(products);
        return savedOrder;
    } catch (err) {
        console.log(err);
        globalErrorHandler(err, res);
    }
}

const productQuantityUpdate = (products) => {
    products?.forEach(async(orderedSingleProduct) => {
        const product = await getProduct({ _id: orderedSingleProduct?.product_id });
        product?.variant_stock_price?.forEach(variant => {
            if (variant.color_family == orderedSingleProduct?.color) {
                variant?.sizes?.forEach(nestedSize => {
                    if (nestedSize?.size == orderedSingleProduct?.size) {
                        nestedSize.quantity -= orderedSingleProduct?.quantity;
                    }
                })
            }
        })
        await updateProductQuantity({ _id: orderedSingleProduct?.product_id }, product);
    })
}
const pushCustomerOrders = async (user_id, order_id) => {
    // console.log('customer_id :' + user_id + 'order_id : ' + order_id);
    let ordersArray = await Customer.findOne({ _id: user_id }).lean().select('orders -_id') || [];
    const { orders } = ordersArray;
    orders?.push(order_id);
    await Customer.findOneAndUpdate({ _id: user_id }, { orders }).lean();
}

const pushVendorOrders = (products, order_id) => {
    products?.forEach(async product => {
        let ordersArray = await Vendor.findOne({ _id: product?.vendor_id }).lean().select('orders -_id') || [];
        const { orders } = ordersArray;
        orders?.push(order_id);
        await Vendor.findOneAndUpdate({ _id: product?.vendor_id }, { orders }).lean();
    })
}

export const getSingleOrder = async (query) => {
    try {
        return await Order.findOne(query).lean()
    } catch (err) {
        console.log(err)
    }
}

export const getCustomerOrders = async (data) => {
    try {
        return await Customer.find(data).lean().select('orders -_id').populate('orders');
    } catch (err) {
        console.log(err)
    }
}

export const returnOrder = async (order_id, product_id, status, return_on_reasons) => {
    try {
        return await Order.findOneAndUpdate({
            _id: order_id,
            'products.product_id': product_id,
        }, { $set: { 'products.$.status': status, 'products.$.return_on_reasons': return_on_reasons } }, { new: true }).lean().exec()
    } catch (err) {
        console.log(err)
    }
}


//common 
export const cancelOrder = async (order_id, product_id, cancellation_reasons) => {
    try {
        return await Order.findOneAndUpdate({
            _id: order_id,
            'products.product_id': product_id,
        }, { $set: { 'products.$.status': 'CANCELLED', 'products.$.cancellation_reasons': cancellation_reasons } }, { new: true }).lean().exec()
    } catch (err) {
        console.log(err)
    }
}


//vendor orders
export const getVendorOrders = async (query, vendor_id) => {
    try {
        const Orders = await Vendor.findOne(query)
            .lean()
            .select("orders -_id")
            .populate({
                path: 'orders',
                select: '-total_shipment_fee -grand_total -payment_information.amount -payment_information.status',
                populate: [
                    {
                        path: 'billing_address',
                        model: 'Address',
                        select: '-_id -__v'
                    },
                    {
                        path: 'shipping_address',
                        model: 'Address',
                        select: '-_id -__v'
                    },
                    {
                        path: 'user_id',
                        model: 'Customer',
                        select: 'name phone -_id'
                    }
                ]
            })
        const vendorOrders = Orders?.orders?.map((order) => {
            return { ...order, products: order.products?.filter((orderedProduct) => String(orderedProduct?.vendor_id) === String(vendor_id)) }
        })
        return _.orderBy(vendorOrders, [(obj) => new Date(obj?.createdAt)], ['desc']);
    } catch (err) {
        console.log(err)
    }
}

export const getVendorOrder = async (query, vendor_id) => {
    try {
        const order = await Order.findOne(query).lean()
            .select('-total_shipment_fee -grand_total -payment_information.amount -payment_information.status')
            .populate({
                path: 'billing_address',
                model: 'Address',
                select: '-_id -__v'
            })
            .populate({
                path: 'shipping_address',
                model: 'Address',
                select: '-_id -__v'
            })
            .populate({
                path: 'user_id',
                model: 'Customer',
                select: 'name phone -_id'
            });
        if (!order && order?.products?.length === 0) return null;
        const vendorSingleOrder = { ...order, products: order.products?.filter((orderedProduct) => (String(orderedProduct?.vendor_id) === String(vendor_id))) }
        return vendorSingleOrder;
    } catch (err) {
        console.log(err)
    }
}

export const getDynamicVendorOrders = async (query, vendor_id, status) => {
    try {
        const Orders = await Vendor.findOne(query)
            .lean()
            .select("orders -_id")
            .populate({
                path: 'orders',
                select: '-total_shipment_fee -grand_total -payment_information.amount -payment_information.status',
                populate: [
                    {
                        path: 'billing_address',
                        model: 'Address',
                        select: '-_id -__v'
                    },
                    {
                        path: 'shipping_address',
                        model: 'Address',
                        select: '-_id -__v'
                    },
                    {
                        path: 'user_id',
                        model: 'Customer',
                        select: 'name phone -_id'
                    }
                ]
            });
        const vendorOrders = Orders?.orders?.map((order) => {
            return { ...order, products: order.products?.filter((orderedProduct) => (String(orderedProduct?.vendor_id) === String(vendor_id)) && (orderedProduct?.status === status)) }
        })
        return _.orderBy(vendorOrders, [(obj) => new Date(obj?.createdAt)], ['desc']);
    } catch (err) {
        console.log(err)
    }
}

export const readyToShipOrder = async (order_id, product_id, orderedSingleProduct) => {
    try {
        return await Order.findOneAndUpdate({
            _id: order_id,
            'products.product_id': product_id,
        }, { $set: { 'products.$.status': 'READY_TO_SHIP' } }, { new: true }).lean().exec()
    } catch (err) {
        console.log(err)
    }
}