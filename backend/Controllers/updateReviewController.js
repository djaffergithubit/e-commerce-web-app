const {Review} = require('../Models/reviews')

const updateReviewController = async (req, res) => {
    try {
     const { reviewId } = req.params
     const { reviewRating, reviewFeedBack } = req.body

     await Review.findByIdAndUpdate(reviewId, {reviewRating, reviewFeedBack})
     return res.status(200).json({message: 'Review updated successfully'})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = updateReviewController