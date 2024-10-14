import React, { useEffect } from 'react'
import ShopButton from '../components/ShopButton'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../states/currentUserSlice'
import { clearCart } from '../states/cartSlice'
import { addMessage } from '../states/messagesSlice'

const Success = () => {

    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(clearCart({ id: currentUser._id }));
        dispatch(addMessage({ id: 'nanoid', message: 'Your purchase was successful', type: 'Success' }))
    }, [])

  return (
    <div className=' container py-8 px-4'>
        <h1 className=' text-3xl text-[#333333] font-medium mb-[10px]'>Checkout Successful</h1>
        <p className=' text-[15px] text-[#333333] font-light mb-2'>Thank you for your purchase</p>
        <ShopButton
            buttonContent='View Order Status'
            backgroundColor='[#007bff]'
            textColor='black'
            path='/order-history'
        />
    </div>
  )  
}

export default Success