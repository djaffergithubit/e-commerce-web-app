import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartValue, decrementCartQuantity, incrementCartQuantity, removeCart } from '../states/cartSlice'
import { selectCurrentUser } from '../states/currentUserSlice'
import { addMessage } from '../states/messagesSlice'
import { nanoid } from '@reduxjs/toolkit'

const Counter = ({ value, item }) => {
    
  const currentUser = useSelector(selectCurrentUser)
  const carts = useSelector(cartValue)
  const currentCart = carts.find(cart => cart.product._id === item._id && cart.user === currentUser._id)
  const dispatch = useDispatch()

  return (
    <div>
        <button
            className=' text-[#333333] font-semibold px-2 py-1 bg-slate-100 border-2 border-slate-100 cursor-pointer'
            onClick={()=>{
              if (value > 1) {
                dispatch(decrementCartQuantity({ productId: item._id, userId: currentUser._id}));
                dispatch(addMessage({id: nanoid(), message: `${item.productName} decreased by one`, type: 'Success'}))
              }else{
                dispatch(removeCart({ productId: item._id, userId: currentUser._id}))
                dispatch(addMessage({id: nanoid(), message: `${item.productName} removed from cart`, type: 'Success'}))
              }
            }}
            >-</button>
        <strong className=' text-[#333333] mx-2'>{value}</strong>
        <button 
            className='text-[#333333] font-semibold px-2 py-1 bg-slate-100 border-2 border-slate-100 cursor-pointer'
            onClick={()=>{
              if (currentCart.quantity < item.quantity) {
                dispatch(incrementCartQuantity({ 
                  productId: item._id, 
                  userId: currentUser._id
                 }));
                 dispatch(addMessage({id: nanoid(), message: `${item.productName} increased by one`, type: 'Success'}))
              }else{
                dispatch(addMessage({id: nanoid(), message: 'Max number of product reached!!', type: 'info'}))
              }
            }}
            >+</button>
    </div>
  )
}

export default Counter