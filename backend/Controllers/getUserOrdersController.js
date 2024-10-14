const { Order } = require("../Models/orders")

const getUserOrdersController = async (req, res) => {
    try {
        const { id } = req.user
        const orders = await Order.find()

        const userOrders = orders.filter(order => order.user.toString() === id)

        if (userOrders.length === 0) {
            return res.status(404).json({ 'message': 'no orders' })
        }

        return res.status(201).json(userOrders)

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = getUserOrdersController