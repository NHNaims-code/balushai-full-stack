
import slugify from "slugify";
import { addProduct, getProduct, getProducts, updateProduct, sellerSKUCheck, getDynamicStatusProducts, getDeletedProducts, getDeActiveProducts } from "../../services/vendor";
import { error } from '../../utils';
import { productValidation } from '../../validations';

function productController() {
    return {

        // Add a new product
        addProduct: async (req, res) => {

            // validation check
            const validation = productValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //seller sku check
            const seller_sku_check = await sellerSKUCheck(req.body);
            if (seller_sku_check) return error().resourceError(res, 'Seller SKU Match!. Please input different seller_sku number', 422);

            const { product_name } = req.body;

            const newProduct = await addProduct(req.user?._id, {
                ...req.body,
                slug: slugify(product_name)?.toLowerCase()
            }, res);
            return res.status(200).json(newProduct);
        },


        // Find One Product by ID 
        getSingleProduct: async (req, res) => {
            const product = await getProduct({ $and: [{ _id: req.params?.id }, { vendor_id: req.user?._id }] });
            if (!product) return error().resourceError(res, 'Sorry! This product doest not exists or something wrong', 422);
            return res.status(200).json(product);
        },

        // Get All Products
        getAllProducts: async (req, res) => {
            const productsObject = await getProducts({ _id: req.user?._id });
            return res.status(200).json(productsObject?.products);
        },

        // Get All Online Products
        getAllOnlineProducts: async (req, res) => {
            const productsObject = await getDynamicStatusProducts({ _id: req.user?._id }, 'APPROVED');
            return res.status(200).json(productsObject?.products);
        },

        // Get All Suspended Products
        getAllSuspendedProducts: async (req, res) => {
            const productsObject = await getDynamicStatusProducts({ _id: req.user?._id }, 'SUSPENDED');
            return res.status(200).json(productsObject?.products);
        },

        // Get All Pending Products
        getAllPendingProducts: async (req, res) => {
            const productsObject = await getDynamicStatusProducts({ _id: req.user?._id }, 'PENDING');
            return res.status(200).json(productsObject?.products);
        },

        // Get All DeActive Products
        getAllDeActiveProducts: async (req, res) => {
            const productsObject = await getDeActiveProducts({ _id: req.user?._id });
            return res.status(200).json(productsObject?.products);
        },

        // Get All Deleted Products
        getAllDeletedProducts: async (req, res) => {
            const productsObject = await getDeletedProducts({ _id: req.user?._id });
            return res.status(200).json(productsObject?.products);
        },

        // Update Product by ID 
        updateProduct: async (req, res) => {
            const validation = productValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const updatedProduct = await updateProduct({ _id: req.params?.id }, req.body, res);
            return res.status(200).json(updatedProduct);
        },

        // Delete Product by ID 
        deleteProduct: async (req, res) => {
            const deletedProduct = await updateProduct({ _id: req.params?.id }, { is_deleted: true }, res);
            if (!deletedProduct) return error().resourceError(res, 'Sorry! This product doest not exists or something wrong', 422);
            return res.status(200).json(deletedProduct);
        },

        // Restore Product by ID 
        restoreProduct: async (req, res) => {
            const restoredProduct = await updateProduct({ _id: req.params?.id }, { is_deleted: false }, res);
            if (!restoredProduct) return error().resourceError(res, 'Sorry! This product doest not exists or something wrong', 422);
            return res.status(200).json(restoredProduct);
        },

        // Active Product by ID 
        activeProduct: async (req, res) => {
            const activeProduct = await updateProduct({ _id: req.params?.id }, { is_active: true }, res);
            if (!activeProduct) return error().resourceError(res, 'Sorry! This product doest not exists or something wrong', 422);
            return res.status(200).json(activeProduct);
        },

        // De Active Product by ID 
        deActiveProduct: async (req, res) => {
            const deActiveProduct = await updateProduct({ _id: req.params?.id }, { is_active: false }, res);
            if (!deActiveProduct) return error().resourceError(res, 'Sorry! This product doest not exists or something wrong', 422);
            return res.status(200).json(deActiveProduct);
        },


    }
}
export { productController };