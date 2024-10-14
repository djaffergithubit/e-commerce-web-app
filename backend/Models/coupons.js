const { default: mongoose } = require("mongoose");

const couponSchema = new mongoose.Schema({
    couponName: {
        type: String,
        required: true,
    },

    discount: {
        type: Number,
        required: true
    },

    expiryDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

exports.Coupon = mongoose.model('Coupon', couponSchema)