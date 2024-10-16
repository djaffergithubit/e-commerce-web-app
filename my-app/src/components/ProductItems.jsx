import React from 'react'
import SingleProduct from './SingleProduct'

const ProductItems = ({ currentItems }) => {
  return (
    <div className='grid lg:grid-cols-3 sm:grid-cols-2 justify-center items-center gap-y-2 gap-4 px-2 pt-2 border-t-2 border-solid bg-[#fffdf7] border-[#ccc]'>
        {currentItems.length > 0 ? (currentItems.map(product =>(
            <SingleProduct
              key={product._id}
              product={product}
              bool={false}
            />
          ))
        )
        :
          (
            <div className=' text-base font-medium text-gray-900'>No Products found</div>
          )
        }
      </div>
  )
}

export default ProductItems