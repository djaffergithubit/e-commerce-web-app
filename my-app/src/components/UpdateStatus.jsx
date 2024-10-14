import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthToken } from '../states/tokenSlice'
import { useNavigate } from 'react-router-dom'
import { addMessage } from '../states/messagesSlice'
import { nanoid } from '@reduxjs/toolkit'

const UpdateStatus = ({ orderId }) => {

    const [status, setStatus] = useState('')
    const token = useSelector(selectAuthToken)
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const handleSubmit = () => {
        axios.put(`http://localhost:3500/orders/updateStatus/${orderId}`, {orderStatus: status}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)
            dispatch(addMessage({id: nanoid(), message: 'Status Updated Successfully', type: 'Success'}))
            Navigate('/admin/orders')
        })
        .catch((error) => {
            console.log(error)
        })
    }

  return (
        <div className=' w-[500px] px-3 py-2 border-[2.5px] border-solid border-[#007bff] rounded-lg'>
            <h3 className=' text-lg text-[#333333] font-medium mb-2'>Update Status</h3>
            <select name="status" id="" className=' w-full text-[15px] font-medium px-3 py-1 border-[1px] border-solid border-[#333333] outline-none' onChange={(e)=> setStatus(e.target.value)} value={status}>
                <option value="-- Choose One --">-- Choose One --</option>
                <option value="Order Placed...">Order Placed...</option>
                <option value="Processing...">Processing...</option>
                <option value="Shipped...">Shipped...</option>
                <option value="Delivered...">Delivered...</option>
            </select>
            <button className=' bg-[#007bff] text-white px-2 py-1 mt-2 rounded-md ' onClick={handleSubmit}>Update Status</button>
       </div>
  )
}

export default UpdateStatus