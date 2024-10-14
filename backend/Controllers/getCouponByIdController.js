const { Coupon } = require("../Models/coupons");

const getCouponByIdController = async (req, res) => {
    try {
        const { couponName } = req.params;
        const coupon = await Coupon.findOne({ couponName: couponName.toLowerCase()})

        if (!coupon || ((new Date(coupon.expiryDate)) < (new Date(Date.now())))) {
            return res.status(404).json({ message: 'falseksjkjdk' });
        }

        return res.status(201).json({coupon: coupon, message: 'true'})

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = getCouponByIdController