const { Category } = require("../Models/categories")

const getCategoriesController = async (req, res) => {
    try {
        const categories = await Category.find()

        if (!categories) {
            return res.status(401).json({ 'message': 'category don\'t exist' })
        }

        return res.status(201).json(categories)
    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = getCategoriesController