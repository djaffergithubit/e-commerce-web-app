const { Review } = require("../Models/reviews")

const getAllReviewsController = async (req, res) => {
    try {
        const reviews = await Review.find()
        if (!reviews) {
            return res.status(404).json({ 'message': 'No reviews found' })
        }
        return res.status(201).json(reviews)
    } catch (error) {
        return res.status(500).json({ 'message': error.message})
    }
}

module.exports = getAllReviewsController