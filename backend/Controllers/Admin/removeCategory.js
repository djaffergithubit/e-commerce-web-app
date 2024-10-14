const { Category } = require("../../Models/categories")
const { Product } = require("../../Models/products")

const removeCategoryController = async (req, res) => {
    try {
        const {id} = req.params
        const find = await Category.findById(id)
        const categoryProduct = await Product.findOne({ productCategory: id})

        if(!find) return res.status(404).json({ 'message': 'Category not found' })
        else if(categoryProduct){
            return res.status(400).json({ 'message': 'Category cannot be removed because it is associated with a product' })
        }
        else{
            await Category.findByIdAndDelete(id)
            return res.status(200).json({ 'message': 'Category removed successfully' })
        }
        
    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = removeCategoryController