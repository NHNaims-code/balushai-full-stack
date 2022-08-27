import { Category } from "../../mongodb/admin";
import { Product, Vendor } from "../../mongodb/vendor";
import { globalErrorHandler } from "../../utils";

export const addProduct = async (vendor_id, data, res) => {
    try {
        const newProduct = await new Product({
            ...data,
            vendor_id: vendor_id
        });
        const savedProduct = await newProduct.save();
        await pushVendorProduct(vendor_id, newProduct._id);
        savedProduct?.category?.forEach(async cate => {
            await pushCategoryProduct(cate?._id, newProduct._id);
        })
        return savedProduct;
    } catch (err) {
        console.log(err);
        globalErrorHandler(err, res);
    }
}

const pushVendorProduct = async (vendor_id, product_id) => {
    let productsArray = await Vendor.findOne({ _id: vendor_id }).lean().select('products -_id') || [];
    const { products } = productsArray;
    products?.push(product_id);
    await Vendor.findOneAndUpdate({ _id: vendor_id }, { products }).lean();
}


const pushCategoryProduct = async (category_id, product_id) => {
    let productsArray = await Category.findOne({ _id: category_id }).lean().select('products -_id') || [];
    const { products } = productsArray;
    products?.push(product_id);
    await Category.findOneAndUpdate({ _id: category_id }, { products }).lean();
}

export const getProduct = async (query) => {
    try {
        return await Product.findOne(query).lean();
    } catch (err) {
        console.log(err);
    }
}

export const getProducts = async (query) => {
    try {
        return await Vendor.findOne(query).lean().select('products -_id').populate('products').exec();
    } catch (err) {
        console.log(err)
    }
}


export const getDynamicStatusProducts = async (query, status) => {
    try {
        return await Vendor.findOne(query).lean().select('products -_id').populate({
            "path": "products",
            "match": { "status": status }
        }).exec();
    } catch (err) {
        console.log(err)
    }
}


export const getDeActiveProducts = async (query) => {
    try {
        return await Vendor.findOne(query).lean().select('products -_id').populate({
            "path": "products",
            "match": { is_active: true }
        }).exec();
    } catch (err) {
        console.log(err)
    }
}

export const getDeletedProducts = async (query) => {
    try {
        return await Vendor.findOne(query).lean().select('products -_id').populate({
            "path": "products",
            "match": { is_deleted: true }
        }).exec();
    } catch (err) {
        console.log(err)
    }
}

export const updateProduct = async (query, data, res) => {
    try {
        return await Product.findOneAndUpdate(query, { $set: { ...data, status: "PENDING" } }, { new: true }).lean()
    } catch (err) {
        console.log(err);
        globalErrorHandler(err, res)
    }
}
export const updateProductQuantity = async (query, data, res) => {
    try {
        return await Product.findOneAndUpdate(query, { $set: data }, { new: true }).lean()
    } catch (err) {
        console.log(err);
        globalErrorHandler(err, res)
    }
}


//SKU Check 
export const sellerSKUCheck = async (body) => {
    const {
        vendor_id,
        variant_stock_price
    } = body;

    const productsObject = await Vendor.findOne({ _id: vendor_id }).lean().select('products -_id').populate('products');
    if (productsObject?.products?.length === 0) return false;

    let sku;

    if (variant_stock_price?.length > 0) {
        variant_stock_price.forEach(variant => {
            variant?.sizes?.forEach(size => {
                sku = size?.seller_sku;
            })
        });
    }
    let res;

    productsObject?.products?.forEach(product => {
        if (product.variant_stock_price?.length > 0) {
            product.variant_stock_price.forEach(variant => {
                variant?.sizes?.forEach(size => {
                    res = (sku === size?.seller_sku) ? true : false;
                    return;
                })
            });
        }
    })
    return res;
}