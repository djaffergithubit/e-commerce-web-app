const { Review } = require("../Models/reviews")

const getUserReviewsController = async (req, res) => {
    try {
        const { id } = req.user
        const reviews = await Review.find()

        if (!reviews) {
            return res.status(404).json({ 'message': 'No reviews found' })
        }

        const userReviews = reviews.filter(review => review.reviewOwner == id)

        if (!userReviews) {
            return res.status(404).json({ 'message': 'No reviews found' })
        }

        return res.status(201).json(userReviews)

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = getUserReviewsController