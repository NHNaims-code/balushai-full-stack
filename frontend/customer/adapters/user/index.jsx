import { Post, Get , Update} from "../xhr";

export function getUserData(path) {
    return Get('customer/account-info');
}

// export function SellerProducts(path) {
//     return Get(path);
// }

// export function SingleProduct(path) {
//     return Get(path);
// }