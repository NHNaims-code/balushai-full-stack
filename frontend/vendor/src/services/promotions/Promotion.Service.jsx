import { addNewFreeShipping, SellerFreeShippings } from "adapters/promotions/FreeShipping";
import { addNewVoucher, SellerVouchers, UpdateVoucher } from "adapters/promotions/Voucher";
import { addNewCampaign, GetCampaigns, UpdateCampaign } from "adapters/promotions/Campaign";

//Voucher
export function addVoucher(data) {
    return addNewVoucher('promotions/create-voucher', data);
}

export function getVouchers(path) {
    return SellerVouchers(path);
}

export function getSingleVoucher(id) {
    return SellerVouchers(`promotions/voucher/${id}`);
}

export function editVoucher(id, data) {
    return UpdateVoucher(`promotions/update-voucher/${id}`, data);
}

export function ActiveVoucher(id) {
    return UpdateVoucher(`promotions/active-voucher/${id}`, {});
}

export function DeActiveVoucher(id) {
    return UpdateVoucher(`promotions/deactive-voucher/${id}`, {});
}

//Free Shipping
export function getFreeShipping(path) {
    return SellerFreeShippings(path);
}

export function addFreeShipping(data) {
    return addNewFreeShipping('promotions/create-free-shipping', data);
}
export function editFreeShipping(id, data) {
    return UpdateVoucher(`promotions/update-free-shipping/${id}`, data);
}
export function ActiveFreeShipping(id) {
    return UpdateVoucher(`promotions/active-free-shipping/${id}`, {});
}

export function DeActiveFreeShipping(id) {
    return UpdateVoucher(`promotions/deactive-free-shipping/${id}`, {});
}
export function getSingleFreeShipping(id) {
    return SellerVouchers(`promotions/free-shipping/${id}`);
}

//Campaigns

export function getSingleCampaign(id) {
    return GetCampaigns(`promotions/campaign/${id}`);
}
export function getRegisteredSingleCampaign(id) {
    return GetCampaigns(`promotions/register-campaign/${id}`);
}
export function getCampaigns(path) {
    return GetCampaigns(path);
}
export function registerCampaign(id) {
    return UpdateCampaign(`promotions/campaign/${id}/register`, {});
}
export function addProductCampaign(id, products) {
    return UpdateCampaign(`promotions/campaign/${id}/add-product`, products);
}
export function removeProductCampaign(id, products) {
    return UpdateCampaign(`promotions/campaign/${id}/remove-product`, products);
}
