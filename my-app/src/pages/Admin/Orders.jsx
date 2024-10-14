import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrdersComponent from '../../components/ordersComponent'
import { useSelector } from 'react-redux'
import { selectAuthToken } from '../../states/tokenSlice'

const Orders = () => {

  const [orders, setOrders] = useState([])
  const token = useSelector(selectAuthToken)

  const getAllOrders = async () => {
    await axios.get('http://localhost:3500/orders', {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .then((response)=>{
      setOrders(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    getAllOrders()
  }, [orders])

  return (
    <div className='item1 w-full py-10 px-5'>
      <h1 className=' text-2xl font-light tracking-wide mb-3'>All Orders</h1>
      {Object.keys(orders).length > 0 ? <OrdersComponent
        data={orders}
      />
      :(
        <div>Loading...</div>
      )
    }
    </div>
  )
}

export default Orders