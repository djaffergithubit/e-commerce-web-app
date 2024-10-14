const { Coupon } = require("../../Models/coupons")

const removeCouponController = async (req, res)=>{
    try {
        const { id } = req.params
        const coupon = await Coupon.findById(id)

        if (!coupon) {
            return res.status(404).json( { error: 'This coupon does not exist' })
        }

        await Coupon.findOneAndDelete(id)
        return res.status(201).json({ 'message': 'coupon removed successfully' })

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = removeCouponController