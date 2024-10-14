const { Coupon } = require('../Models/coupons')

const getCouponsController = async(req, res)=>{
    try {
        const coupons = await Coupon.find()

        if (!coupons) {
            return res.status(400).json({ 'message': 'no coupon found' })
        }

        return res.status(201).json(coupons)

    } catch (error) {
        return res.status(500).json({ 'message': 'Internal server Error' })
    }
}

module.exports = getCouponsController