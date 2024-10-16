import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SlideBar = ( props ) => {

    const Navigate = useNavigate()
    const [activeButton, setActiveButton] = useState('button2')

    const handleClick = (button)=>{
        setActiveButton(button)
        props.setIconClicked(false)
    }
    useEffect(()=>{
        window.addEventListener('resize', ()=>{
            if (window.innerWidth > 1080) {
                props.setShowSidebar(true)
            }else{
                props.setShowSidebar(false)
            }
        })
    }, [window.innerWidth])

    useEffect(()=>{
        if (window.innerWidth > 1080) {
            props.setShowSidebar(true)
        }else{
            props.setShowSidebar(false)
        }
    }, [])

  return (
    <div className={`w-full ${(props.showSidebar ) ? 'sticky max-w-[250px] top-10' : (!props.showSidebar && props.iconClicked) ? 'fixed top-0 h-full z-[7000]': 'hidden'} flex`}>
        <div className=' max-w-[330px] w-full bg-white'>
        <div>
            <div className=' flex flex-col justify-center items-center h-[170px] bg-blue-400 text-white relative'>
                <img className=' absolute top-0' src="" alt="" />
                <i class="fa-solid fa-circle-user text-4xl"></i>
                <h1 className=' text-xl font-medium tracking-wide'>Admin</h1>
            </div>
        </div>
        <ul> 
            <li className={` cursor-pointer border-b-2 border-r-2 border-solid border-gray-200 text-md font-normal ${activeButton === 'button2' && 'border-r-[#ff4500] border-r-4'}`} onClick={()=>{
                handleClick('button2');
                Navigate('/admin/products')
            }}>
                <button className=' w-full flex justify-start px-5 py-2'>All Products</button>
            </li>
            <li className={` cursor-pointer border-b-2 border-r-2 border-solid border-gray-200 text-md font-normal ${activeButton === 'button3' && 'border-r-[#ff4500] border-r-4'}`} onClick={()=>{
                handleClick('button3');
                Navigate('/admin/add-product')
            }}>
                <button className=' w-full flex justify-start px-5 py-2'>Add Product</button>
            </li>
            <li className={` cursor-pointer border-b-2 border-r-2 border-solid border-gray-200 text-md font-normal ${activeButton === 'button4' && 'border-r-[#ff4500] border-r-4'}`} onClick={()=>{
                handleClick('button4');
                Navigate('/admin/orders')
            }}>
                <button className=' w-full flex justify-start px-5 py-2'>Orders</button>
            </li>
            <li className={` cursor-pointer border-b-2 border-r-2 border-solid border-gray-200 text-md font-normal ${activeButton === 'button5' && 'border-r-[#ff4500] border-r-4'}`} onClick={()=>{
                handleClick('button5');
                Navigate('/admin/coupon')
            }}>
                <button className=' w-full flex justify-start px-5 py-2'>Coupons</button>
            </li>
            <li className={` cursor-pointer border-b-2 border-r-2 border-solid border-gray-200 text-md font-normal ${activeButton === 'button6' && 'border-r-[#ff4500] border-r-4'}`} onClick={()=>{
                handleClick('button6');
                Navigate('/admin/categories')
            }}>
                <button className=' w-full flex justify-start px-5 py-2'>Categories</button>
            </li>
            <li className={` cursor-pointer border-b-2 border-r-2 border-solid border-gray-200 text-md font-normal ${activeButton === 'button7' && 'border-r-[#ff4500] border-r-4'}`} onClick={()=>{
                handleClick('button7');
                Navigate('/admin/brands')
            }}>
                <button className=' w-full flex justify-start px-5 py-2'>Brands</button>
            </li>
        </ul>
    </div>
    {(!props.showSidebar && props.iconClicked) && <div onClick={()=>props.setIconClicked(false)} className=' bg-black opacity-30 w-full'></div>}
    </div>
  )
}

export default SlideBar