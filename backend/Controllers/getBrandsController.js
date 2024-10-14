const { Brand } = require("../Models/brands")

const getBrandsController = async(req, res) => {
    try {
        const brands = await Brand.find()

        if (!brands) {
            return res.status(400).json({ 'message': 'no brand was found' })
        }

        return res.status(201).json(brands)

    } catch (error) {
        return res.status(500).json({ 'message': 'Internal server Error' })
    }
}

module.exports = getBrandsController