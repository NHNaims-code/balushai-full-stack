
import { getActivatedAndApprovedProducts, getSingleProduct } from "../../services/customer";
import { error } from '../../utils';

function productController() {
    return {
        // get single product by slug name
        getSingleProductBySlug: async (req, res) => {
            const product = await getSingleProduct({ slug: req.params?.slug ,is_active: true, status : 'APPROVED'});
            if (!product) return error().resourceError(res, 'Sorry! This product doest not exists or something wrong', 422);
            return res.status(200).json(product);
        }, 

        // Get All Products
        getAllProducts: async (req, res) => {
            const products = await getActivatedAndApprovedProducts({$and : [{is_active: true} , {status : 'APPROVED'}]});
            return res.status(200).json(products);
        },


    }
}
export { productController };