const { Product } = require("../Models/products")

const getProductByIdController = async (req, res)=>{
    try {
        const {id} = req. params
        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({ 'message': 'Product not found' })
        }

        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = getProductByIdController