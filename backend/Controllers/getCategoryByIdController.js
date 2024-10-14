const { Category } = require("../Models/categories")

const getCategoryByIdController = async(req, res) => {
    try {
        const {id} = req.params
        const cat = await Category.findById(id)

        if (!cat) {
            return res.status(401).json({ 'message': 'no category found' })
        }

        return res.status(201).json(cat.categoryName)

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = getCategoryByIdController