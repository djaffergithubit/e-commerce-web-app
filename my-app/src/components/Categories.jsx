import React from 'react'
import ShopButton from './ShopButton'
import image1 from "../assets/c1.jpg"
import image2 from "../assets/c2.jpg"
import image3 from "../assets/c3.jpg"

const Categories = () => {
  return (
    <div className=' bg-slate-200 py-10'>
        <div className=' md:container px-[20px]'>
            <h1 className='text-2xl font-light tracking-wider mb-4'>Categories</h1>
            <div className=' grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 place-items-center'>
                <div className=' bg-white px-4 py-2 shadow-2xl flex flex-col justify-center items-center max-w-[290px] w-full'>
                    <h1 className=' text-2xl font-light tracking-wider mb-4'>Gadgets</h1>
                    <img className=' w-full h-[265px] mb-2' src={image1} alt="" />
                    <ShopButton
                        buttonContent='Shop Now'
                        backgroundColor='[#f0f0f0]'
                        textColor='black'
                        shop={true}
                    />
                </div>
                <div className=' bg-white px-4 py-2 shadow-2xl flex flex-col justify-center items-center max-w-[290px] w-full'>
                    <h1 className=' text-2xl font-light tracking-wider mb-4'>Womens Fashion</h1>
                    <img className=' w-full h-[265px] mb-2' src={image2} alt="" />
                    <ShopButton
                        buttonContent='Shop Now'
                        backgroundColor='[#f0f0f0]'
                        textColor='black'
                        shop={true}
                    />
                </div>
                <div className=' bg-white px-4 py-2 shadow-2xl flex flex-col justify-center items-center max-w-[290px] w-full'>
                    <h1 className=' text-2xl font-light tracking-wider mb-4'>Sport Sneakers</h1>
                    <img className=' w-full h-[265px] mb-2' src={image3} alt="" />
                    <ShopButton
                        buttonContent='Shop Now'
                        backgroundColor='[#f0f0f0]'
                        textColor='black'
                        shop={true}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Categories