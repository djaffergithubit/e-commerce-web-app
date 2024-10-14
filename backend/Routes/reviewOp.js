const express = require('express')
const addReviewController = require('../Controllers/addReviewController')
const getUserReviewsController = require('../Controllers/getUserReviewsController')
const getProductReviewsController = require('../Controllers/getProductReviewsController')
const getAllReviewsController = require('../Controllers/getAllReviewsController')
const removeUserReviewController = require('../Controllers/removeUserReviewController')
const updateReviewController = require('../Controllers/updateReviewController')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

router.get('', getAllReviewsController)
router.get('/:productId', getProductReviewsController)
router.get('/user-reviews/reviews', verifyToken, getUserReviewsController)
router.post('/add-review', verifyToken, addReviewController)
router.delete('/delete-review/:reviewId', removeUserReviewController)
router.put(`/update-review/:reviewId`, updateReviewController)

module.exports = router