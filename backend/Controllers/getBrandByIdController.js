const { Brand } = require("../Models/brands")

const getBrandByIdController = async (req, res)=>{
    try {
        const {brandId} = req.params
        const currentBrand = await Brand.findOne({ _id: brandId})

        if (!currentBrand) {
            return res.status(401).json({ 'message': 'there is no such brand' })
        }

        res.status(201).json(currentBrand.brandName)
    } catch (error) {
        res.status(500).json({ 'message': 'Internal server Error' })
    }

}

module.exports = getBrandByIdController