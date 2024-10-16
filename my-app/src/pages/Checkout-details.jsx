import React, { useEffect, useState } from 'react'
import CheckoutForm from '../components/CheckoutForm'
import CheckoutSummary from '../components/CheckoutSummary'
import { loadStripe } from '@stripe/stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../states/currentUserSlice'
import { cartValue } from '../states/cartSlice'
import axios from 'axios'
import { selectAuthToken } from '../states/tokenSlice'
import { addMessage } from '../states/messagesSlice'
import { nanoid } from '@reduxjs/toolkit'

const CheckoutDetails = () => {

    const currentUser = useSelector(selectCurrentUser)
    const carts = useSelector(cartValue)
    const [total, setTotal] = useState(0)
    const currentUserCarts = carts.filter(cart => cart.user === currentUser._id)
    const token = useSelector(selectAuthToken)
    const dispatch = useDispatch()

    useEffect(()=>{
        let somme = 0
        currentUserCarts.map(cart => {
            somme += cart.total
        })
        setTotal(somme)
    }, [currentUserCarts])

    const makePayment = async(e) =>{
      e.preventDefault()
      const stripe = await loadStripe("pk_test_51OmKpWDSijvIwbhLgkOIAlP0EukW4J5YBSiTZ3fhkz9QhNo0RgRYjXsIT9YyPOat8O0r1oDgkwdhK72ppAzkXQCM00OZ0Jzxfc")
      try {
          const response = await axios.post('http://localhost:3500/payment/checkout-session', {products: currentUserCarts}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
          });
          const session_Id = response.data.id;
          await stripe.redirectToCheckout({
              sessionId: session_Id
          });

      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : 'Une erreur s\'est produite';
          dispatch(addMessage({ id: nanoid(), message: errorMessage, type:'Error' }));
      }
  }
  

  return (
    <div className=' block items-start lg:container md:flex'>
        <div className=' flex flex-col gap-3 w-full'>
            <CheckoutForm
                shipping={true}
            />
            <CheckoutForm
                shipping={false}
                makePayment={makePayment}
            />
        </div>
            <CheckoutSummary
                currentUserCarts={currentUserCarts}
                total={total}
            />
    </div>
  )
}

export default CheckoutDetails