import { Get, Post, Update } from "adapters/xhr";

export function addNewFreeShipping(path, data) {
    return Post(path, data);
}
export function SellerFreeShippings(path) {
    return Get(path);
}
export function UpdateFreeShipping(path, data) {
    return Update(path, data);
}