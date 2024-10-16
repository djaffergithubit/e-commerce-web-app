import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import ButtonLink from '../components/ButtonLink'
import SingleCart from '../components/SingleCart'
import Head from '../components/Head'
import UpdateStatus from '../components/UpdateStatus'

const OrderDetails = () => {

    const currentPath = useLocation().pathname
    const isUnderAdminPath = currentPath.includes('/admin')
    const [order, setOrder] = useState({})
    const [orderProducts, setOrderProducts] = useState([])
    const [overflow, setOverflow] = useState(false)
    const { id } = useParams()

    const getOrder = async () =>{
        await axios.get(`http://localhost:3500/orders/order/${id}`)
        .then((response)=>{
            setOrder(response.data)
            console.log('order', response.data)    
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const getOrderProducts = async () =>{
        await axios.get(`http://localhost:3500/orders/order-products/${id}`)
        .then((response)=>{
            setOrderProducts(response.data)
            console.log('order products', response.data)    
        })
        .catch((error)=>{
            console.log(error)
        })
    }

   useEffect(()=>{
       getOrder()
       getOrderProducts()
   }, [id])

   useEffect(()=>{
        if (window.innerWidth > 997) {
            setOverflow(false)
        }else{
            setOverflow(true)
        }
    }, [])


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
   <div className=' lg:container py-10 '>
       <div className=''>
           <h1 className=' text-3xl font-medium tracking-wide mb-2'>Product Details</h1>
           <ButtonLink
               linkContent='Back To Orders'
               path={isUnderAdminPath ? '/admin/orders' : '/order-history'}
           />
       </div>
       <br/>
       <div>
           <p className=' text-[15px] text-[#333333] font-bold'>Ship to:<span className='  text-[#0a1730] font-normal'>ljdkhsdjkf</span></p>
           <p className=' text-[15px] text-[#333333] font-bold'>Order ID:<span className='  text-[#0a1730] font-normal'>{order._id}</span></p>
           <p className=' text-[15px] text-[#333333] font-bold'>Order Amount:<span className='  text-[#0a1730] font-normal'>{order.orderAmount}</span></p>
           <p className=' text-[15px] text-[#333333] font-bold'>Order Coupon:<span className='  text-[#0a1730] font-normal'>skhkjashdk</span></p>
           <p className=' text-[15px] text-[#333333] font-bold'>Payment Method:<span className='  text-[#0a1730] font-normal'>Stripe</span></p>
           <p className=' text-[15px] text-[#333333] font-bold'>Order Status:<span className='  text-[#0a1730] font-normal'>{order.orderStatus}</span></p>
           <p className=' text-[15px] text-[#333333] font-bold'>Shipping Address</p>
           <p className='  text-[#0a1730] font-normal'>Address:<span className='  text-[#0a1730] font-normal'>sljlaskdj</span></p>
           <p className='  text-[#0a1730] font-normal'>State:<span className='  text-[#0a1730] font-normal'>askljakshdk</span></p>
           <p className='  text-[#0a1730] font-normal'>Country:<span className='  text-[#0a1730] font-normal'>lakjajkd</span></p>
       </div>
       <br />
       <div className={`${overflow && 'w-full max-w-[975px] overflow-x-scroll xl:block'} pb-2`}>
           <Head
               forOrderDetails={true} 
           />
           <div>
               {
                   orderProducts.map((product, index) => (
                       <SingleCart
                           key={index}
                           index={index}
                           item={product.product}
                           quantity={product.quantity}
                       />
                   ))
               }
           </div>
        
       </div>
       <br />
       {isUnderAdminPath && <UpdateStatus
                                orderId={id}
                            />
        }

   </div>
  )
}

export default OrderDetails