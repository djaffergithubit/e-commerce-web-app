const { default: mongoose } = require("mongoose");

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
    },

    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
})

exports.Brand = mongoose.model('Brand', brandSchema)