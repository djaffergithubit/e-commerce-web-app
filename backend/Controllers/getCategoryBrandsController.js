const { Brand } = require("../Models/brands")
const { Category } = require("../Models/categories")

const getCategoryBrandsController = async (req, res) => {
    try {
        const {categoryName} = req.params
        let nameToCheck
        if (categoryName) {
            const firstLetter = categoryName.slice(0, 1).toUpperCase()
            const lastChar = (categoryName.slice(1, -1) + categoryName.slice(-1)).toLowerCase()
            nameToCheck = firstLetter + lastChar
        }
        const category = await Category.findOne({categoryName: nameToCheck})
        
        if (!category) {
            return res.status(401).json({ 'message': 'there is no such category' })
        }

        const brands = await Brand.find({parentCategory: category._id})

        if (!brands) {
            return res.status(401).json({ 'message': 'there is no brands' })
        }

        return res.status(201).json(brands)
    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = getCategoryBrandsController