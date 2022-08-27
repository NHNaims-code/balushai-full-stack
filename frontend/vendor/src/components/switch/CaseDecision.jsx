import { AddFreeShipping, FreeShippingList } from 'components/freeShipping';
import OrderDetailsInformationFactory from 'components/order/OrderDetailsInformationFactory';
import OrderFactory from 'components/order/OrderFactory';
import { ProductFactory } from 'components/product';
import { AddVoucher, VoucherList } from 'components/voucher';
import { CampaignList } from 'components/campaign';
import React from 'react'
import { AccountCard, ReturnAddressInfoCard, BusinessInfoCard, WareHouseAddressInfoCard } from '../account'
import BankInfoCard from '../account/BankInfoCard';
import RegisteredCampaignList from 'components/campaign/RegisteredCampaignList';

const CaseDecision = (props) => {
    const { type } = props;
    switch (type) {
        case 'account':
            return (
                <AccountCard />
            )
        case 'business':
            return (
                <BusinessInfoCard />
            )
        case 'bank':
            return (
                <BankInfoCard />
            )
        case 'warehouse':
            return (
                <WareHouseAddressInfoCard />
            )
        case 'return':
            return (
                <ReturnAddressInfoCard />
            )
        case 'campaigns':
            return (
                <CampaignList />
            )
        case 'registered_campaigns':
            return (
                <RegisteredCampaignList />
            )
        case 'vouchercode':
            return (
                <VoucherList />
            )
        case 'addvoucher':
            return (
                <AddVoucher />
            )
        case 'freeshipping':
            return (
                <FreeShippingList />
            )
        case 'addfreeshipping':
            return (
                <AddFreeShipping />
            )
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
        case 'deactive_product':
            return (
                <ProductFactory type="deactive" />
            )
        case 'suspended_product':
            return (
                <ProductFactory type="suspended" />
            )
        case 'deleted_product':
            return (
                <ProductFactory type="deleted" />
            )
        case 'all_order':
            return (
                <OrderFactory type="all" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'pending_order':
            return (
                <OrderFactory type="pending" getAllOrderCountManage={props?.getAllOrderCountManage} />
            )
        case 'ready_to_ship':
            return (
                <OrderFactory type="ready_to_ship" getAllOrderCountManage={props?.getAllOrderCountManage} />
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
        default:
            return (
                null
            )
    }
}

export default CaseDecision