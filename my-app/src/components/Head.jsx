import React from 'react'

const Head = ({ forOrderDetails }) => {
  return (
        <div className='w-[975px]'>
            <ul className=' grid grid-cols-12 border-y-2 border-solid border-blue-400'>
                <li className=' col-span-1 px-3 py-2 border-x-[1px] border-solid border-gray-100 text-[#333333] font-semibold text-md'>s/n</li>
                <li className={`${forOrderDetails ? 'col-span-5' : 'col-span-6'} px-3 py-2 border-x-[1px] border-solid border-gray-100 text-[#333333] font-semibold text-md`}>Product</li>
                <li className=' col-span-1 px-3 py-2 border-x-[1px] border-solid border-gray-100 text-[#333333] font-semibold text-md'>Price</li>
                <li className={`${forOrderDetails ? 'col-span-1' : 'col-span-2'} px-3 py-2 border-x-[1px] border-solid border-gray-100 text-[#333333] font-semibold text-md`}>Quantity</li>
                <li className=' col-span-1 px-3 py-2 border-x-[1px] border-solid border-gray-100 text-[#333333] font-semibold text-md'>Total</li>
                <li className={`${forOrderDetails ? 'col-span-3' : 'col-span-1'} px-3 py-2 border-x-[1px] border-solid border-gray-100 text-[#333333] font-semibold text-md`}>Action</li>
            </ul>
        </div>
  )
}

export default Head