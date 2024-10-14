const { Product } = require('../Models/products')

const getProductsController = async(req, res)=>{
    try {
        const products = await Product.find()

        if (!products) {
            return res.status(400).json({ 'message': 'no product found' })
        }

        return res.status(201).json(products)

    } catch (error) {
        return res.status(500).json({ 'message': 'Internal server Error' })
    }
}

module.exports = getProductsController