const { Brand } = require("../../Models/brands")

const createBrandController = async (req, res) => {
    try {
        const { brandName, parentCategory } = req.body
        let nameToCheck = brandName.toLowerCase()
        if (brandName) {
            const firstLetter = brandName.slice(0, 1).toUpperCase()
            const lastChar = (brandName.slice(1, -1) + brandName.slice(-1)).toLowerCase()
            nameToCheck = firstLetter + lastChar
        }
        const brandExist = await Brand.findOne({nameToCheck})

        if (brandExist) {
            return res.status(400).json({ 'message': 'Brand already exit' })
        }

        const newBrand = new Brand({
            brandName: nameToCheck,
            parentCategory
        })

        await newBrand.save()
        return res.status(201).json({ 'message': 'new Brand created' })

    } catch (error) {
        return res.status(500).json({ 'message': 'Internal server Error' })
    }
}

module.exports = createBrandController