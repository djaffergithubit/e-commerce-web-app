import React from 'react'

const ProductsToPurshace = ({ currentUserCarts }) => {

  return (
    <div >{currentUserCarts && currentUserCarts.map(cart => (
         <div className='p-[10px] mb-[5px] border-[1px] border-solid border-blue-600 rounded-lg shadow-xl'>
            <h1 className=' text-[20px] text-[#333333] mb-[10px] font-semibold'>{cart.product.productName}</h1>
            <p className=' text-[15px] text-gray-500 font-light'>Quantity: {cart.quantity}</p>
            <p className=' text-[15px] text-gray-500 font-light'>Unit price: {cart.product.productPrice}</p>
            <p className=' text-[15px] text-gray-500 font-light'>set price: {cart.product.productPrice * cart.quantity}</p>
         </div>
    ))}</div>
  )
}

export default ProductsToPurshace