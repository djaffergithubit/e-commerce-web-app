const { Order } = require("../../Models/orders")

const createOrderController = async (req, res)=>{
    try {
        const { orderAmount, user, orderProducts } = req.body

        const newOrder = new Order({
            orderAmount: orderAmount,
            user: user,  
            orderProducts: orderProducts          
        })

        await newOrder.save()
        return res.status(201).json({ 'message': 'Order created successfully' })

    } catch (error) {
        return res.status(500).json({ 'message': 'Internal server Error' })
    }
}

module.exports = createOrderController