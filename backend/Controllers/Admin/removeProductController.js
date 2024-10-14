const { Product } = require("../../Models/products")

const removeProductController = async (req, res) => {
    try {
        const {id} = req.params
        const find = await Product.findById(id)

        if (!find) {
            return res.status(400).json({ 'message': 'shdkjhdsjh' })
        }

        await Product.findByIdAndDelete(id)

        res.status(200).json({ 'message': 'product deleted' })

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = removeProductController