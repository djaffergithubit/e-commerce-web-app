const { Order } = require("../Models/orders");

const getOrderProductsController = async (req, res) => {
    try {
        const {id} = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });   
        }

        return res.status(201).json(order.orderProducts);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = getOrderProductsController