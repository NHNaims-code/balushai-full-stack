import { getDynamicStatusProducts, getFollowers } from "../../services/vendor";

function dashboardController() {
    return {
        getFollowers: async (req, res) => {
            const followers = await getFollowers({ _id: req.user?._id });
            return followers?.followers?.length;
        },
        getPendingProducts: async (req, res) => {
            const productsObject = await getDynamicStatusProducts({ _id: req.user?._id }, 'PENDING');
            return res.status(200).json(productsObject?.products?.length);
        },
        getSuspendedProducts: async (req, res) => {
            const productsObject = await getDynamicStatusProducts({ _id: req.user?._id }, 'SUSPENDED');
            return res.status(200).json(productsObject?.products?.length);
        },
        getApprovedProducts: async (req, res) => {
            const productsObject = await getDynamicStatusProducts({ _id: req.user?._id }, 'APPROVED');
            return res.status(200).json(productsObject?.products?.length);
        }
    }
}
export { dashboardController };