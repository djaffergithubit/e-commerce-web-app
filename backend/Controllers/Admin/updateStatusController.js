const { Order } = require("../../Models/orders");

const updateStatusController = async (req, res) => {
    try {
        const { orderId } = req.params
        const { orderStatus } = req.body
        const order = await Order.findById(orderId)

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.orderStatus = orderStatus
        await order.save()

        return res.status(201).json({ message: 'Order status updated' })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = updateStatusController;