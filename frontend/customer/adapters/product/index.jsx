import { Post, Get , Update} from "../xhr";

export function AllProducts() {
    return Get('products');
}

export function SellerProducts(path) {
    return Get(path);
}

export function getSingleProduct(slug) {
    return Get(`product/${slug}`);
}

