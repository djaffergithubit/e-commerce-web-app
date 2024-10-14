const { Review } = require("../Models/reviews")

const getProductReviewsController = async (req, res) => {
    try {
        const { productId } = req.params
        const productReviews = await Review.find({ productReview: productId })

        if (!productReviews) {
            return res.status(404).json({ 'message': 'No reviews found' })
        }

        return res.status(201).json(productReviews)

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = getProductReviewsController