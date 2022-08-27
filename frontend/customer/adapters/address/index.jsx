import { Post, Get , Update} from "../xhr";

export function createAddress(data) {
    return Post('customer/create-address', data);
}

export function getAllAddresses() {
    return Get('customer/addresses');
}

export function getSingleAddress(id) {
    return Get(`customer/address/${id}`);
}

export function deleteAddress(id) {
    return Get(`customer/delete-address/${id}`);
}

export function updateAddress(id, data) {
    return Update(`customer/address/${id}`, data);
}

export function setDefaultShippingAddress(id) {
    return Update(`customer/set-shipping-address/:id${id}`);
}

export function unsetDefaultShippingAddress(id) {
    return Update(`customer/unset-shipping-address/:id${id}`);
}


