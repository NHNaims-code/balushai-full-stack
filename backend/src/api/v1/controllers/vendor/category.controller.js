import {  getAllCategory } from "../../services/admin";

const categoryController = () => {
    return {
        // Get All Category
        getAllCategory: async (req, res) => {
            // Get all category form db
            const categories = await getAllCategory({})
            return res.status(200).send(categories)
        },
    }
}

export { categoryController }