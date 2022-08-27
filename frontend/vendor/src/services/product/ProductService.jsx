import { AddProduct, FeatureUpdate, SellerProducts, SingleProduct, UpdateProduct } from "adapters/product/Product";

export function getProducts(type) {
    switch (type) {
        case 'all':
            return SellerProducts('products');
        case 'online':
            return SellerProducts('online-products');
        case 'pending':
            return SellerProducts('pending-products');
        case 'deactive':
            return SellerProducts('deactive-products');
        case 'suspended':
            return SellerProducts('suspended-products');
        case 'deleted':
            return SellerProducts('deleted-products');
        default:
            return null;
    }
}
export function addProduct(data) {
    return AddProduct('add-product', data);
}
export function updateProduct(id, data) {
    return UpdateProduct(`update-product/${id}`, data);
}
export function getSingleProduct(id) {
    return SingleProduct(`product/${id}`);
}
export function dynamicFeaturesHandler(type, id) {
    switch (type) {
        case 'deactive':
            return FeatureUpdate(`deactive-product/${id}`);
        case 'active':
            return FeatureUpdate(`active-product/${id}`);
        case 'delete':
            return FeatureUpdate(`delete-product/${id}`);
        case 'restore':
            return FeatureUpdate(`restore-product/${id}`);
        default:
            return null;
    }
}
