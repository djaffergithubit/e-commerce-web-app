import React from 'react'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../states/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../states/currentUserSlice'
import { addMessage, clearMessages } from '../states/messagesSlice'
import { nanoid } from '@reduxjs/toolkit'

const ShopButton = ({ buttonContent, shop, backgroundColor, textColor, path, clear}) => {

  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const handleClick = () => {
    if (clear) {
      dispatch(clearCart({ id: currentUser._id })), 
      dispatch(addMessage({id: nanoid(), message: 'Cart Cleared', type: 'info'}));
    }

      Navigate(path)
  }
    

  return (
    <button 
        className={`px-2 ${!shop && 'py-1 text-base'} bg-${backgroundColor} text-${textColor} border-1.5 border-solid border-${backgroundColor} flex items-center gap-1`} 
        onClick={handleClick}
        >
          {buttonContent} 
          {shop && <span className=" text-xl">&gt;&gt;&gt;</span> }
    </button>
  )
}

export default ShopButton