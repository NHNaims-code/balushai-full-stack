import {  getAllBrands } from "../../services/admin";

const brandController = () => {
    return {
        // Get All Brands
        getAllBrand: async (req, res) => {
            // Get all brand form db
            const brands = await getAllBrands({});
            return res.status(200).send(brands)
        },
    }
}

export { brandController }