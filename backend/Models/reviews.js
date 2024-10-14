const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewRating: {
        type: Number,
        required: true
    },

    reviewFeedBack: {
        type: String,
        required: false      
    },

    reviewOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true      
    },

    productReview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
},
{
    timestamps: true
}
)

exports.Review = new mongoose.model('Review', reviewSchema);