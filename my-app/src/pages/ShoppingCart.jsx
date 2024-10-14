import React, { useEffect, useState } from 'react'
import ShopButton from '../components/ShopButton'
import SingleCart from '../components/SingleCart'
import ButtonLink from '../components/ButtonLink'
import { useSelector } from 'react-redux'
import { cartValue } from '../states/cartSlice'
import { selectCurrentUser } from '../states/currentUserSlice'
import PaymentCheckout from '../components/PaymentCheckout'
import Head from '../components/Head'

const ShoppingCart = () => {

  const [overflow, setOverflow] = useState(false)
  const currentUser = useSelector(selectCurrentUser)
  const carts = useSelector(cartValue)
  const currentUserCarts = carts.filter(cart => cart.user === currentUser._id)
 
  useEffect(()=>{console.log('carts', currentUserCarts)}, [currentUserCarts])

  useEffect(()=>{
    if (window.innerWidth > 997) {
      setOverflow(false)
    }else{
      setOverflow(true)
    }
  }
  , [])

  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      if (window.innerWidth > 997) {
        setOverflow(false)
      }else{
        setOverflow(true)
      }
    })
  }, [window.innerWidth])

  return (
    <div className=' lg:container py-10'>
        <h1 className=' text-3xl text-[#333333] font-medium py-3'>Shopping Cart</h1>
        {currentUserCarts.length > 0 ? (<div>
          <div className={`${overflow ? 'w-full max-w-[975px] overflow-x-scroll xl:block' : ''} pb-2`}>
            <Head
            />
            <section>
              {currentUserCarts.map((item, index)=>(
                <SingleCart
                  key={index}
                  index={index}
                  item={item.product} 
                />
              ))}
            </section>
          </div>
          <div className=' sm:flex block justify-between items-start py-4'>
            <ShopButton
              buttonContent='Clear Cart'
              backgroundColor='[#ff4500]'
              textColor='white'
              clear={true}
              path='/shop'
            />
            <br />
            <div>
              <ButtonLink
                linkContent='Continue Shopping'
                path='/shop'
              />
              <PaymentCheckout/>
            </div>
          </div>
        </div>)
        :
        (<div>
          <p className=' pb-3 font-light'>Your cart is currently empty.</p>
          <ButtonLink
            linkContent='Continue Shopping' 
            path='/shop'
          />
        </div>)
        }
    </div>
  )
}

export default ShoppingCart