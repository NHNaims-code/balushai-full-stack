import { AddFreeShipping, FreeShippingList } from 'components/freeShipping';
import OrderDetailsInformationFactory from 'components/order/OrderDetailsInformationFactory';
import OrderFactory from 'components/order/OrderFactory';
import { CategoryFactory } from 'components/category';
import { AddVoucher, VoucherList } from 'components/voucher';
import React from 'react'
import { BrandFactory } from 'components/brand';
import { BannerFactory } from 'components/banner';
import VendorFactory from 'components/vendor/VendorFactory';
import VendorDetailsFactory from 'components/vendor/VendorDetailsFactory';
import VendorOrderFactory from 'components/vendor/order/OrderFactory';
import { ProductFactory } from 'components/vendor/product';
import VendorVoucherFactory from 'components/vendor/voucher/VoucherFactory';
import VendorFreeShippingFactory from 'components/vendor/freeShipment/FreeShippingFactory';
import { AddCampaign, CampaignList } from 'components/campaign';
import CampaignDetailsFactory from 'components/campaign/CampaignDetailsFactory';

const CaseDecision = (props) => {
    const { type } = props;
    switch (type) {
        case 'all_product':
            return (
                <ProductFactory type="all" />
            )
        case 'online_product':
            return (
                <ProductFactory type="online" />
            )
        case 'pending_product':
            return (
                <ProductFactory type="pending" />
            )
        case 'suspended_product':
            return (
                <ProductFactory type="suspended" />
            )
        case 'vouchercode':
            return (
                <VoucherList />
            )
        case 'addvoucher':
            return (
                <AddVoucher />
            )
        case 'campaigns':
            return (
                <CampaignList />
            )
        case 'addcampaign':
            return (
                <AddCampaign />
            )
        case 'freeshipping':
            return (
                <FreeShippingList />
            )
        case 'addfreeshipping':
            return (
                <AddFreeShipping />
            )
        case 'all_category':
            return (
                <CategoryFactory type="all" />
            )
        case 'all_brand':
            return (
                <BrandFactory />
            )
        case 'home_category':
            return (
                <CategoryFactory type="home_category" />
            )
        case 'all_banner':
            return (
                <BannerFactory type="all" />
            )
        case 'home_banner':
            return (
                <BannerFactory type="home_banner" />
            )
        case 'all_order':
            return (
                <OrderFactory type="all" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'pending_order':
            return (
                <OrderFactory type="pending" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'ready_to_ship_order':
            return (
                <OrderFactory type="ready_to_ship" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'sla_beached_order':
            return (
                <OrderFactory type="sla_beached_order" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'shipped_order':
            return (
                <OrderFactory type="shipped" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'delivered_order':
            return (
                <OrderFactory type="delivered" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'canceled_order':
            return (
                <OrderFactory type="canceled" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'returned_order':
            return (
                <OrderFactory type="returned" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'failed_delivery_order':
            return (
                <OrderFactory type="failed_delivery" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'vendor_all_order':
            return (
                <VendorOrderFactory type="all" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'vendor_pending_order':
            return (
                <VendorOrderFactory type="pending" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'vendor_ready_to_ship_order':
            return (
                <VendorOrderFactory type="ready_to_ship" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'vendor_shipped_order':
            return (
                <VendorOrderFactory type="shipped" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'vendor_delivered_order':
            return (
                <VendorOrderFactory type="delivered" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'vendor_canceled_order':
            return (
                <VendorOrderFactory type="canceled" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'vendor_returned_order':
            return (
                <VendorOrderFactory type="returned" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'vendor_failed_delivery_order':
            return (
                <VendorOrderFactory type="failed_delivery" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'vendor_all_voucher':
            return (
                <VendorVoucherFactory type="all" getAllVoucherCountManage={props?.getAllVoucherCountManage} />
            )
        case 'vendor_active_voucher':
            return (
                <VendorVoucherFactory type="active" getAllVoucherCountManage={props?.getAllVoucherCountManage} />
            )
        case 'vendor_deactive_voucher':
            return (
                <VendorVoucherFactory type="deactive" getAllVoucherCountManage={props?.getAllVoucherCountManage} />
            )
        case 'vendor_all_free_shipping':
            return (
                <VendorFreeShippingFactory type="all" getAllFreeShippingCountManage={props?.getAllFreeShippingCountManage} />
            )
        case 'vendor_active_free_shipping':
            return (
                <VendorFreeShippingFactory type="active" getAllFreeShippingCountManage={props?.getAllFreeShippingCountManage} />
            )
        case 'vendor_deactive_free_shipping':
            return (
                <VendorFreeShippingFactory type="deactive" getAllFreeShippingCountManage={props?.getAllFreeShippingCountManage} />
            )
        case 'campaign_vendors':
            return (
                <CampaignDetailsFactory type="vendors" campaign={props?.campaign}/>
            )
        case 'campaign_products':
            return (
                <CampaignDetailsFactory type="products" campaign={props?.campaign} />
            )
        case 'customer_information':
            return (
                <OrderDetailsInformationFactory type="customer" />
            )
        case 'amount_information':
            return (
                <OrderDetailsInformationFactory type="amount" />
            )
        case 'transaction_information':
            return (
                <OrderDetailsInformationFactory type="transaction" />
            )
        case 'billing_information':
            return (
                <OrderDetailsInformationFactory type="billing_information" />
            )
        case 'shipping_information':
            return (
                <OrderDetailsInformationFactory type="shipping_information" />
            )
        case 'all_vendor':
            return (
                <VendorFactory type="all" getAllVendorCountManage={props?.getAllVendorCountManage} />
            )
        case 'de_active_vendor':
            return (
                <VendorFactory type="de_active" getAllVendorCountManage={props?.getAllVendorCountManage} />
            )
        case 'active_vendor':
            return (
                <VendorFactory type="active" getAllVendorCountManage={props?.getAllVendorCountManage} />
            )
        case 'vendor_orders':
            return (
                <VendorDetailsFactory type="orders" />
            )
        case 'vendor_products':
            return (
                <VendorDetailsFactory type="products" />
            )
        case 'vendor_vouchers':
            return (
                <VendorDetailsFactory type="vouchers" />
            )
        case 'vendor_free_shipments':
            return (
                <VendorDetailsFactory type="free_shipments" />
            )
        case 'vendor_campaigns':
            return (
                <VendorDetailsFactory type="campaigns" />
            )
        default:
            return (
                null
            )
    }
}

export default CaseDecision