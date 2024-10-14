import React from 'react'

const HeroItem = ({ image, title, itemId }) => {

  return (
    <div key={itemId} className=' relative min-h-[90vh] h-full'>
        <div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 max-w-xl w-full text-center py-8 px-4 bg-black bg-opacity-40 text-white<'>
            <h1 className=' text-5xl font-medium  text-white'>{title}</h1>
            <div className=' py-2 px-4'>
                <p className=' text-white tracking-wide font-light'>Up to 30% off on all onsale proucts.</p>
            </div>
            <hr className=' max-w-[275px] w-full mx-auto text-white'/>
            <button className=' px-2 py-1 bg-blue-500 mt-3 text-white'>Shop Now</button>
        </div>
        <div className=' absolute top-0 h-full w-full z-0'>
            <img className='  h-full w-full' src={image} alt="" />
        </div>
    </div>
  )
}

export default HeroItem