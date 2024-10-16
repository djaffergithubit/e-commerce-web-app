const express = require('express')
const router = express.Router()
const {Order} = require('../Models/orders')
const { Product } = require('../Models/products')
const verifyToken = require('../middleware/verifyToken')
const stripe = require('stripe')(process.env.STRIPE_KEY)

router.post('/checkout-session', verifyToken, async (req, res) => {
    try {
        const { products } = req.body

        let total = 0
        const lineItems = await products.map((product)=>{
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.product.productName,
                    },
                    unit_amount: Math.round(product.total * 100)
                },
                quantity: 1
            }
        
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/failed',
            // metadata: {
            //     userId: req.user.id,  // Attach user info for order creation
            //     products: JSON.stringify(products)  // Pass product data to webhook
            // }
        })

        products.map( async (product) => {
            total += product.total

            const currentProduct = await Product.findById(product.product._id)
            const quantityValue = currentProduct.quantity - product.quantity 
            const soldValue = currentProduct.sold + product.quantity
            currentProduct.quantity = quantityValue
            currentProduct.sold = soldValue
            await currentProduct.save()
        })

        const newOrder = new Order({
            orderAmount: total,
            user: req.user.id,
            orderProducts: products
        })

        await newOrder.save()
        return res.status(201).json({id: session.id})

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
})

module.exports = router
    