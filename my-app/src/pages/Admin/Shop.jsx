import React from 'react'
import ShopSidebar from '../../components/shopSidebar'
import Products from '../../components/Products'
import { useDispatch, useSelector } from 'react-redux'
import { setShowElement } from '../../states/showElementSlice'
import { cartValue } from '../../states/cartSlice'
import { useEffect } from 'react'

const Shop = () => {

  const dispatch = useDispatch()
  window.addEventListener('resize', ()=>{
        if (window.innerWidth <= 745) {
            dispatch(setShowElement({ value: true }))
        }else{
            dispatch(setShowElement({value: false}))
        }
    })

    const value = useSelector(cartValue)

    useEffect(()=>{
      console.log('currentValue', value)
    }, [value])

  return (
    <div className=' md:flex items-start max-w-[976px] w-full mx-auto py-10 px-5'>
          <ShopSidebar
          />
          <Products
          />
    </div>
  )
}

export default Shop