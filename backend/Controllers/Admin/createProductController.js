const { Brand } = require("../../Models/brands");
const { Category } = require("../../Models/categories");
const { Product } = require("../../Models/products");

const createProductController = async (req, res) => {
    try {
        const { productName, productCategory, productBrand, productColor, productPrice, productRegularPrice, quantity, description} = req.body;
        const productExist = await Product.findOne({ productName });

        if (productExist) {
            return res.status(400).json({ message: 'Product already exists' });
        }

        if (!req.body) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const category = await Category.findOne({ categoryName: productCategory})
        const brand = await Brand.findOne({ brandName: productBrand})

        let skuValue = ` ${!category.categoryName === 'Laptop' ? (category.categoryName).slice(0, 3).toUpperCase() : 'MAC'}-`

        for (let i = 0; i < 13; i++) {
            const number = Math.floor(Math.random()*10) + 1
            skuValue = skuValue + number
        }

        const newProduct = new Product({
            productName,
            productCategory: category._id,
            productBrand: brand._id,
            productColor,
            productPrice,
            productRegularPrice,
            quantity,
            description,
            SKU: skuValue,
            productImages: req.files ? req.files.map((file) => file.path) : [],
        });

        await newProduct.save();
        return res.status(200).json({ message: 'New product created' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = createProductController;
