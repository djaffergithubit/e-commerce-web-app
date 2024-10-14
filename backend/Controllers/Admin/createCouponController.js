const { Coupon } = require("../../Models/coupons")

const createCouponController = async(req, res) => {
    try {
        const { couponName, discount, expiryDate } = req.body
        let nameToCheck = couponName.toLowerCase()
        const couponExist = await Coupon.findOne({nameToCheck})

        if (couponExist) {
            return res.status(400).json({ 'message': 'coupon already exist' })
        }

        const newCoupon = new Coupon({
            couponName: nameToCheck,
            discount,
            expiryDate
        })

        await newCoupon.save()
        return res.status(200).json({ 'message': 'new coupon created' })

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = createCouponController