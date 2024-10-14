import React, { useEffect, useState } from 'react'
import Counter from './Counter'
import { useDispatch, useSelector } from 'react-redux'
import { cartValue, removeCart } from '../states/cartSlice'
import { useNavigate } from 'react-router-dom'
import { selectCurrentUser } from '../states/currentUserSlice'
import ShopButton from './ShopButton'
import { addMessage } from '../states/messagesSlice'
import { nanoid } from '@reduxjs/toolkit'

const SingleCart = ({index, item, quantity}) => {

    const [counterValue, setCounterValue] = useState(1)
    const carts = useSelector(cartValue)
    const currentUser = useSelector(selectCurrentUser)
    const currentCart = carts.find(cart => cart.product._id === item._id && cart.user === currentUser._id)

    const dispatch = useDispatch()
    const Navigate = useNavigate()

    useEffect(()=>{
        if (currentCart && currentCart.quantity) {
            setCounterValue(currentCart.quantity)
        }
    }, [currentCart])


  return (
    <div className={`${index%2 !== 0 && ' bg-slate-200 border-y-[1px] border-solid border-gray-300'} cursor-pointer w-[975px]`} key={index}>
        <ul className=' grid grid-cols-12 '>
            <li className=' col-span-1 px-3 py-2'>{index+1}</li>
            <li className={` px-3 py-2 text-[#333333] font-semibold text-md ${quantity ? 'col-span-5' : 'col-span-6'}`}>
                <div >
                    {item.productName}
                    <div >
                        <img 
                            className=' w-[100px] h-[100px] cursor-pointer' 
                            src={`http://localhost:3500/uploads/${item.productImages[0].split('\\').pop()}`} 
                            alt="" 
                            onClick={()=>Navigate(`/product-details/${item._id}`)}
                            />
                    </div>
                </div>
            </li>
            <li className=' col-span-1 px-3 py-2 text-[14px]'>{item.productPrice}</li>
            <li className={` px-3 py-2 ${quantity ? 'col-span-1' : 'col-span-2'}`}>
                {!quantity ? (<Counter
                    item={item}
                    value={counterValue}
                />)
                :
                (
                    <p className=' text-[14px] font-semibold'>{quantity}</p>
                )
            }
            </li>
            <li className=' col-span-1 px-3 py-2 text-[14px]'>{(item.productPrice) * (!quantity ? counterValue : quantity)}</li>
            <li className={` px-3 py-2 cursor-pointer ${quantity ? 'col-span-3' : 'col-span-1'}`} 
                onClick={()=>{
                    dispatch(removeCart({ productId: item._id, userId: currentUser._id }));
                    currentCart.quantity > 1 ? dispatch(addMessage({ id:nanoid(), message: `${item.productName} decreased by one`, type: 'Success' }))
                    : dispatch(addMessage({ id:nanoid(), message: `${item.productName} removed from cart`, type: 'Success' })) 
                    
                }}
            >
                {!quantity ?
                    <i className="fa-solid fa-trash-can text-[#ff4500] text-xl cursor-pointers"></i>
                    :
                    <ShopButton
                        buttonContent='Review Product'
                        backgroundColor='[#007bff]'
                        textColor='white'
                        shop={false}
                        path={`/review-product/${item._id}`}
                    />
                }
            </li>
        </ul>
    </div>
  )
}

export default SingleCart