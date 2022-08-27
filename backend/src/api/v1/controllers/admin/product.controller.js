
import { error } from '../../utils';
import validator from "validator";
import { getDynamicStatusProducts, getProduct, getProducts, getVendorDynamicStatusProducts, updateProduct } from '../../services/admin';

function productController() {
    return {

        // Get All Products
        getAllProducts: async (req, res) => {
            const products = await getProducts({});
            return res.status(200).json(products);
        },

        // Find One Product by ID 
        getSingleProduct: async (req, res) => {
            const product = await getProduct({ _id: req.params?.id });
            if (!product) return error().resourceError(res, 'Sorry! This product doest not exists or something wrong', 422);
            return res.status(200).json(product);
        },

        // Get All Pending Products
        getAllPendingProducts: async (req, res) => {
            const productsObject = await getDynamicStatusProducts('PENDING');
            return res.status(200).json(productsObject);
        },

        // Get All Suspended Products
        getAllSuspendedProducts: async (req, res) => {
            const productsObject = await getDynamicStatusProducts('SUSPENDED');
            return res.status(200).json(productsObject);
        },


        // Get All Online Products
        getAllOnlineProducts: async (req, res) => {
            const productsObject = await getDynamicStatusProducts('APPROVED');
            return res.status(200).json(productsObject);
        },

        // Suspend Product by ID
        suspendedProduct: async (req, res) => {

            const { suspended_reasons } = req.body;
            if (!suspended_reasons) return error().resourceError(res, 'Suspended reasons is Required', 422);

            const product = await updateProduct({ _id: req.params?.id }, {
                status: 'SUSPENDED',
                suspended_reasons: validator.escape(suspended_reasons)
            });

            if (!product) return error().resourceError(res, 'Sorry! This product doest not exists or something wrong', 422);
            return res.status(200).json(product);
        },

        // Approved Product by ID
        approvedProduct: async (req, res) => {

            const product = await updateProduct({ _id: req.params?.id }, { status: 'APPROVED' });

            if (!product) return error().resourceError(res, 'Sorry! This product doest not exists or something wrong', 422);
            return res.status(200).json(product);
        },

        //vendor

        // Get All Products
        getVendorProductCounts: async (req, res) => {
            const { vendor_id } = req.params;
            const products = await getProducts({ vendor_id });
            return res.status(200).json(products?.length || 0);
        },

        // Get All Pending Products
        getVendorPendingProductCounts: async (req, res) => {
            const { vendor_id } = req.params;
            const productsObject = await getVendorDynamicStatusProducts(vendor_id, 'PENDING');
            return res.status(200).json(productsObject?.length || 0);
        },

        // Get All Suspended Products
        getVendorSuspendedProductCounts: async (req, res) => {
            const { vendor_id } = req.params;
            const productsObject = await getVendorDynamicStatusProducts(vendor_id, 'SUSPENDED');
            return res.status(200).json(productsObject?.length || 0);
        },


        // Get All Online Products
        getVendorOnlineProductCounts: async (req, res) => {
            const { vendor_id } = req.params;
            const productsObject = await getVendorDynamicStatusProducts(vendor_id, 'APPROVED');
            return res.status(200).json(productsObject?.length || 0);
        },

        // Get All Products
        getVendorProducts: async (req, res) => {
            const { vendor_id } = req.params;
            const products = await getProducts({ vendor_id });
            return res.status(200).json(products);
        },

        // Get All Pending Products
        getVendorPendingProducts: async (req, res) => {
            const { vendor_id } = req.params;
            const productsObject = await getVendorDynamicStatusProducts(vendor_id, 'PENDING');
            return res.status(200).json(productsObject);
        },

        // Get All Suspended Products
        getVendorSuspendedProducts: async (req, res) => {
            const { vendor_id } = req.params;
            const productsObject = await getVendorDynamicStatusProducts(vendor_id, 'SUSPENDED');
            return res.status(200).json(productsObject);
        },


        // Get All Online Products
        getVendorOnlineProducts: async (req, res) => {
            const { vendor_id } = req.params;
            const productsObject = await getVendorDynamicStatusProducts(vendor_id, 'APPROVED');
            return res.status(200).json(productsObject);
        },
    }
}
export { productController };