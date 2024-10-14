const { Brand } = require("../../Models/brands")
const { Product } = require("../../Models/products")

const removeBrandController = async (req, res) => {
    try {
        const {id} = req.params
        const find = await Brand.findById(id)
        const productBrand = await Product.findOne({ productBrand: id })

        if(!find) return res.status(404).json({ 'message': 'Brand not found' })
        else if (productBrand) {
            return res.status(400).json({ 'message': 'Brand cannot be removed because it is associated with a product' })
        }else{
            await Brand.findByIdAndDelete(id)
            return res.status(200).json({ 'message': 'Brand removed successfully' })
        }

    } catch (error) {
        return res.status(500).json({ 'message': 'Internal server Error' })
    }
}

module.exports = removeBrandController