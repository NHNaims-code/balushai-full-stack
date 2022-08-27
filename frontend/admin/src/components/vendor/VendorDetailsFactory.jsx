import VendorCampaignTabs from './tabsPanel/VendorCampaignTabPanel';
import VendorFreeShipmentTabs from './tabsPanel/VendorFreeShipmentTabPanel';
import VendorOrderTabs from './tabsPanel/VendorOrderTabPanel';
import VendorProductTabs from './tabsPanel/VendorProductTabPanel';
import VendorVoucherTabs from './tabsPanel/VendorVoucherTabPanel';

const VendorDetailsFactory = ({ type }) => {
    switch (type) {
        case 'orders':
            return (
                <VendorOrderTabs />
            )
        case 'products':
            return (
                <VendorProductTabs />
            )
        case 'vouchers':
            return (
                <VendorVoucherTabs />
            )
        case 'free_shipments':
            return (
                <VendorFreeShipmentTabs />
            )
        case 'campaigns':
            return (
                <VendorCampaignTabs />
            )
        default:
            return (
                null
            )
    }
}

export default VendorDetailsFactory