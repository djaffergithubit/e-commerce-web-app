import React from 'react'
import ProductsToPurshace from './ProductsToPurshace'

const CheckoutSummary = ({ currentUserCarts, total }) => {
  return (
    <div className=' p-4 border-[1px] border-solid rounded-md bg-white shadow-lg w-full'>
        <h1 className=' text-[#333333] text-[25px] font-light mb-[10px]'>Checkout Summary</h1>
        <h4 className=' text-[15px] text-[#333333] font-semibold'>Cart item(s): 2</h4>
        <div className=' flex items-end justify-between'>
            <h2 className='text-[20px] text-[#333333] font-normal'>Subtotal</h2>
            <h1 className='text-[25px] text-[#ff4500] font-light'>${total}.00</h1>
        </div>
        <ProductsToPurshace
            currentUserCarts={currentUserCarts}
        />
    </div>
  )
}

export default CheckoutSummary