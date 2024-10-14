import React, { useEffect, useState } from 'react'
import OrdersComponent from '../components/ordersComponent'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ButtonLink from '../components/ButtonLink'
import { selectAuthToken } from '../states/tokenSlice'

const MyOrders = () => {

    const [myOrders, setMyOrders] = useState([])
    const token = useSelector(selectAuthToken)

    const fetchMyOrders = async () => {
        await axios.get(`http://localhost:3500/orders/my-orders`, 
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        )
        .then((response)=>{
            setMyOrders(response.data)
        }
        )
        .catch((error)=>{
            console.log(error)
        }
        )
    }

    useEffect(()=>{
        fetchMyOrders()
    }, [])

  return (
    <div className='  py-10 lg:container'>
        <h1 className=' text-[#333333] text-3xl font-medium mb-[10px]'>Your Order History</h1>
        {myOrders.length > 0 ? (
            <>
                <p className=' text-[15px] text-[#333333] font-light'>Open an order to leave a <strong className=' font-medium'>Product Review</strong></p>
                <br />
                {Object.keys(myOrders).length > 0 ?<OrdersComponent
                    data={myOrders}
                />
                :
                (
                    <div>Loading...</div>
                )
            }
            </>
        )
        :
        (<div>
            <p className=' pb-3 font-light'>Your orders is currently empty.</p>
            <ButtonLink
              linkContent='Continue Shopping' 
              path='/shop'
            />
          </div>
        )  
        }
    </div>
  )
}

export default MyOrders