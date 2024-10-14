const { Order } = require("../../Models/orders")

const getOrdersController = async(req, res)=>{
    try {
        const orders = await Order.find()

        if(orders.length === 0){
            return res.status(404).json({ 'message': 'No orders found' })
        }

        return res.status(201).json(orders)
    } catch (error) {
        return res.status(500).json({ 'message': 'Internal server Error' })
    }
}

module.exports = getOrdersController