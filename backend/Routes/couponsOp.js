const createCouponController = require("../Controllers/Admin/createCouponController")
const express = require('express')
const getCouponsController = require("../Controllers/getCouponsController")
const removeCouponController = require("../Controllers/Admin/removeCouponController")
const getCouponByIdController = require("../Controllers/getCouponByIdController")
const isAdmin = require("../middleware/isAdmin")
const router = express.Router()

router.post('/create', isAdmin, createCouponController)
router.get('/:couponName', getCouponByIdController)
router.get('', isAdmin, getCouponsController)
router.delete('/coupon-delete/:id', removeCouponController)

module.exports = router