const { Category } = require("../../Models/categories")

const createCategoryController = async (req, res) => {
    try {
        const { categoryName } = req.body
        let nameToCheck 
        if (categoryName) {
            const firstLetter = categoryName.slice(0, 1).toUpperCase()
            const lastChar = (categoryName.slice(1, -1) + categoryName.slice(-1)).toLowerCase()
            nameToCheck = firstLetter + lastChar
        }
        const categoryExist = await Category.findOne({nameToCheck})

        if (categoryExist) {
            return res.status(400).json({ 'message': 'category already exit' })
        }

        const newCategory = new Category({
            categoryName: nameToCheck
        })

        await newCategory.save()
        return res.status(201).json({ 'message': 'new category created' })

    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

module.exports = createCategoryController