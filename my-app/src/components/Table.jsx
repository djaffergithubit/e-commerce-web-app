import axios from 'axios'
import React  from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { convertDateFormat } from '../data/ConverDateFormat'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthToken } from '../states/tokenSlice'
import { addMessage } from '../states/messagesSlice'
import { nanoid } from '@reduxjs/toolkit'

const Table = ({data, categories, isProducts, isCoupon, isOrder}) => {

  const Navigate = useNavigate()
  const currentPath = useLocation().pathname
  const isUnderAdminPath = currentPath.includes('/admin')
  const token = useSelector(selectAuthToken)
  const dispatch = useDispatch()

  const handleDelete = (item)=>{
    axios.delete(`http://localhost:3500/${item.productName ? 'products/product' : item.categoryName ? 'categories/category' : item.brandName ? 'brands/brand' : 'coupons/coupon'}-delete/${item._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response)=>{
      dispatch(addMessage({id: nanoid(), message: response.data.message, type: 'Success'}))
      Navigate('/admin/products')
    })
    .catch((error)=>{
          const errorMessage = error.response ? error.response.data.message : 'Une erreur s\'est produite';
          dispatch(addMessage({ id: nanoid(), message: errorMessage, type:'Error' }));

    })
  }

 const handleClick = (itemId) => {
  if (isUnderAdminPath) {
    Navigate(`/admin/order-details/${itemId}`)
  }else{
    Navigate(`/order-details/${itemId}`)
  }
 }

  return (
    <div>
        <table
         className=' w-full min-w-[900px] border-collapse table-fixed'>
        <thead className=' border-y-[3px] border-blue-400 px-2'>
          {isCoupon ? 
          ( 
            <>
              <th className=' text-start py-2' >s/n</th>
              <th className=' text-start py-2'>Name</th>
              <th className=' text-start py-2'>Discount (%)</th>
              <th className=' text-start py-2'>Date Created</th>
              <th className=' text-start py-2'>Expiry Date</th>
              <th className=' text-start py-2'>Action</th>
            </>
          )
          :
          isOrder ?
          (
            <>
              <th className=' text-start py-2 w-[50px]' >s/n</th>
              <th className=' text-start py-2'>Date</th>
              <th className=' text-start py-2'>Order ID</th>
              <th className=' py-2 text-center '>Order Amount</th>
              <th className=' py-2 text-start'>Order Status</th>
            </>
          )
          :
          
          (
              <>
                <th className={` text-start py-2 ${isProducts && 'w-[50px]'}`} >s/n</th>
                <th className=' text-start py-2'>Name</th>
                {categories && <th className=' text-start py-2'>Category</th>}
                {isProducts && <><th className=' text-start py-2'>Price</th>
                <th className=' text-start py-2'>Quantity</th>
                <th className=' text-start py-2'>Value</th></>}
                <th className=' text-start py-2'>Action</th>
              </>
            
          )
          }

        </thead>
        <tbody>
          {isCoupon ? 

data.map((item, index)=>(
  <tr className=' border-b-2 border-gray-200 text-gray-500'>
    <td className=' pt-1 pb-2'>{index+1}</td>
    <td className=' pt-1 pb-2'>{item.couponName}</td>
    <td className=' pt-1 pb-2'>{item.discount}% {(new Date(item.expiryDate)) < (new Date(Date.now())) ? 'OFF' : 'ON'}</td>
    <td className=' pt-1 pb-2'>{(new Date(item.createdAt).toISOString().split('T')[0])}</td>
    <td className=' pt-1 pb-2'>{new Date(item.expiryDate).toISOString().split('T')[0]}</td>
    <td className=' pt-1 pb-2 flex items-center'>
      <i className=" cursor-pointer fa-solid fa-trash-can text-red-700 text-xl" onClick={()=>handleDelete(item)}></i>
    </td>
 </tr>
))
          
         
         :
         isOrder ?
         (
          data.map((item, index)=>(
            <tr className=' border-b-2 border-gray-200 text-black cursor-pointer' onClick={()=>handleClick(item._id)}>
              <td className=' py-2 text-sm'>{index+1}</td>
              <td className=' py-2 text-sm'>{convertDateFormat(item.createdAt)}</td>
              <td className=' py-2 text-sm break-all'>{item._id}</td>
              <td className='py-2 text-sm text-center'>${item.orderAmount}</td>
              <td className={`py-2 text-sm text-start font-semibold ${item.orderStatus !== 'Delivered...' ? 'text-[#ff4500]' : 'text-green-500'}`}>{item.orderStatus}</td>
           </tr>
          ))
         )
         :
         
         (data.map((item, index) => (
              
          (<tr className={`border-b-2 border-gray-200 text-gray-500 ${(index % 2 === 0 && !isProducts) && 'bg-gray-200'}`}>
            <td className=' pt-1 pb-2'>{index+1}</td>
            {item.productName && <td className=' pt-1 pb-2'>{(item.productName).length <= 16 ? item.productName : `${(item.productName).slice(0, 16)}...`}</td>}
            {(item.brandName && categories[item.parentCategory]) && <td className=' pt-1 pb-2'>{(item.brandName).length <= 16 ? item.brandName : `${(item.brandName).slice(0, 16)}...`}</td>}
            {item.categoryName && <td className=' pt-1 pb-2'>{(item.categoryName).length <= 16 ? item.categoryName : `${(item.categoryName).slice(0, 16)}...`}</td>}
            {(item.productCategory) && <td className=' pt-1 pb-2'>{categories[item.productCategory]}</td>}
            {(item.parentCategory) && <td className=' pt-1 pb-2'>{categories[item.parentCategory]}</td>}
            {item.productPrice && <td className=' pt-1 pb-2'>${item.productPrice}</td>}
            {item.quantity >=0 && <td className=' pt-1 pb-2'>{item.quantity}</td>}
            {(item.productPrice && (item.quantity >=0) ) && <td className=' pt-1 pb-2'>{ item.quantity > 0 ? (`$${item.productPrice * item.quantity}`) : '0'}</td>}
            <td className=' pt-1 pb-2 flex items-center'>
              {isProducts && <i className=" cursor-pointer fa-regular fa-eye mr-2 text-purple-900 text-xl" onClick={()=>Navigate(`/product-details/${item._id}`)}></i>}
              {isProducts && <i className=" cursor-pointer fa-regular fa-pen-to-square mr-2 text-green-700 text-xl"></i>}
              <i className=" cursor-pointer fa-solid fa-trash-can text-red-700 text-xl" onClick={()=>handleDelete(item)}></i>
            </td>
        </tr>)
        ))) 
          
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table