const { Review } = require("../Models/reviews")

const removeUserReviewController = async (req, res) => {
    try {
        const { reviewId } = req.params
        await Review.findByIdAndDelete(reviewId)

        return res.status(201).json({ 'message': 'review have been deleted successfully' })

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = removeUserReviewController