import { Post, Get , Update} from "../xhr";

export function createCustomerConversation(data) {
    return Post('conversation/create-customer-conversation', data);
}

export function createVendorConversation(data) {
    return Post('conversation/create-customer-conversation', data);
}

export function getCustomerAllConversation() {
    return Get('conversation/get-customer-conversation');
}

export function getVendorAllConversation() {
    return Get('conversation/get-vendor-conversation');
}
