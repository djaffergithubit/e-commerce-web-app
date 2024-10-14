import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../states/messagesSlice'
import { nanoid } from '@reduxjs/toolkit'
import { selectCurrentUser } from '../states/currentUserSlice'
import { AddToCart, cartValue } from '../states/cartSlice'

const ProductButton = ({ product }) => {

    const currentUser = useSelector(selectCurrentUser)
    const carts = useSelector(cartValue)
    const currentUserCart = carts.find(cart => cart.product._id === product._id && cart.user === currentUser._id)
    const dispatch = useDispatch()

    const handleClick = () => {
        if (product.quantity === 0) {
          dispatch(addMessage({id: nanoid(), message: 'Sorry, Product Out of stock', type: 'warning'}))
        }
        else if ((!currentUserCart && product.quantity > 0) || (currentUserCart.quantity < product.quantity)) {
          dispatch(AddToCart({ newProduct: product, userId: currentUser._id}));
          dispatch(addMessage({id: nanoid(), message: `${product.productName} added to cart`, type: 'Success'}))
        }else{
          dispatch(addMessage({id: nanoid(), message: 'Max number of product reached!!', type: 'info'}))
        }
    }

  return (
    <button 
        className={`px-4 py-1 w-full text-md text-white ${product.quantity > 0 ? 'bg-blue-600 ' : ' bg-red-700'}`}
        onClick={handleClick} 
    >
        {product.quantity > 0 ? 'Add To Cart' : 'Out Of Stock'}
    </button>
  )
}

export default ProductButton