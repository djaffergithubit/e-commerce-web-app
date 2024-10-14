const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    productImages: {
        type: [String],
        required: true,
        maxlength: 5
    },
    productName: {
        type: String,
        required: true,
        unique: true
    },

    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    productBrand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },

    productColor: {
        type: String
    },

    productRegularPrice: {
        type: Number,
        required: true
    },

    productPrice: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    SKU: {
        type: String,
        unique: true,
        required:true
    },

    sold: {
        type: Number,
        required: true,
        default: 0
    }
},{
    timestamps: true
}
)

exports.Product = mongoose.model('Product', productSchema)