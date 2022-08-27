import { getAllProductAndInfo } from '../../services/customer';

function shopInfoController() {
    return {
        getVendorAllProductsAndInfoByShopName: async (req, res) => {
            const { shop_name } = req.params;
            const products_and_info = await getAllProductAndInfo({ 'seller_account.shop_name': shop_name });
            return res.status(200).json(products_and_info);
        },
    }
}
export { shopInfoController };