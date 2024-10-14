import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartValue, setCartTotal, setCouponAdded } from '../states/cartSlice'
import { useNavigate } from 'react-router-dom'
import { selectCurrentUser } from '../states/currentUserSlice'
import axios from 'axios'

const PaymentCheckout = () => {

    const [addCoupon, setAddCoupon] = useState(false)
    const [total, setTotal] = useState(0)
    const [items , setItems] = useState(0)
    const [coupon, setCoupon] = useState('')
    const [couponVerification, setCouponVerification] = useState(false)
    const [disableCouponButton, setDisableCouponButton] = useState(false)
    const [responseCoupon, setResponseCoupon] = useState({})
    const carts = useSelector(cartValue)
    const currentUser = useSelector(selectCurrentUser)
    const currentCarts = carts.filter(cart => cart.user === currentUser._id)
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        let somme = 0
        let numberOfItems = 0
        currentCarts.map(cart => {
            somme = somme + cart.total
            numberOfItems = numberOfItems + cart.quantity
        })

        setTotal(somme)
        setItems(numberOfItems)
    }, [currentCarts])


    const handleSubmit = async(e) => {
        e.preventDefault()

        await axios.get(`http://localhost:3500/coupons/${coupon}`)
        .then((response)=>{
            setResponseCoupon(response.data.coupon)
            setCouponVerification(true)
        })
        .catch((error)=>{
            console.log(error)
            setCouponVerification(false)
        })

    }

    useEffect(()=>{
        if (couponVerification) {
            let somme = 0
            currentCarts.map(cart => {
                if (cart.couponAdded) {
                    console.log('Coupon already added');
                    setDisableCouponButton(true)
                }
                dispatch(setCartTotal({value: cart.total - (cart.total * responseCoupon.discount / 100), productId: cart.product._id}))
                somme += cart.total
                setDisableCouponButton(false)
            })

            setTotal(somme)
            setDisableCouponButton(true)
            dispatch(setCouponAdded({user: currentUser._id, value: true}))
            console.log('verified');
        }else{
            console.log('not verified');
        }
    }, [couponVerification, responseCoupon])

  return (
    <div className=' sm:w-[430px] w-full p-4 border-[1px] border-solid rounded-md bg-white shadow-lg'>
        <h4 className=' text-[15px] text-[#333333] font-semibold'>Cart item(s): {items}</h4>
        <div className=' sm:flex block items-end justify-between'>
            <h2 className='text-[20px] text-[#333333] font-normal'>Subtotal</h2>
            <h1 className='text-[25px] text-[#ff4500] font-light'>${total}.00</h1>
        </div>
        <div className=' sm:flex block items-center justify-between'>
            <p className='text-[15px] text-[#333333] font-light'>Have Coupon?</p>
            <button
                className='text-[15px] text-[#007bff] font-semibold'
                onClick={()=>setAddCoupon(!addCoupon)}
                >
                    Add Coupon
            </button>
        </div>
        {addCoupon && <form action="" className=' flex justify-between gap-2 my-3' onSubmit={handleSubmit}>
            <input
                className='w-full px-2 py-1 border-[1px] border-solid border-[#333333] outline-none '
                type="text"
                placeholder='Coupon Name'
                name='coupon'
                onChange={(e)=>setCoupon(e.target.value)}
                value={coupon}
                />
            <button 
                className=' text-[15px] text-white px-3 py-2 bg-[#007bff]' 
                type='submit'
                disabled={disableCouponButton ? true : false}
                >Verify</button>
        </form>}
        <button
            className=' px-4 py-1 bg-[#007bff] text-white w-full mt-2'
            onClick={()=>Navigate('/checkout-details')}
            >Checkout</button>
    </div>
  )
}

export default PaymentCheckout