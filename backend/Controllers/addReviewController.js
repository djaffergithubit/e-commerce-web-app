const { Review } = require("../Models/reviews")

const addReviewController = async (req, res) => {
    try {
        const { reviewRating, reviewFeedBack, productReview } = req.body

        const newReview = await new Review({
            reviewRating,
            reviewFeedBack,
            reviewOwner: req.user.id,
            productReview
        })

        await newReview.save()
        return res.status(201).json({ 'message': ' new review created' })

    } catch (error) {
        return res.status(500).json({ 'message': 'Internal server Error' })
    }
}

module.exports = addReviewController