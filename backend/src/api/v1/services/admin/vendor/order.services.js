import { Order } from "../../../mongodb/common"
import { Vendor } from "../../../mongodb/vendor"
import _ from 'lodash'

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