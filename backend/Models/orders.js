const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderAmount:{
        type: String,
        required: true
    },

    orderStatus: {
        type: String,
        enum: ['Processing...', 'Shipped...', 'Delivered...', 'Order Placed...'],
        default: 'Order Placed...',
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },

    orderProducts:{
        type: [Object],
        required: true
    }
},
{
    timestamps: true
}
)

exports.Order = mongoose.model('Order', orderSchema)
