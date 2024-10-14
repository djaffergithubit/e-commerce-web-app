import React from 'react'

const OffersItem = ({ cls, title, description}) => {
  return (
    <div key={title} className=' flex gap-4 border-[1px] border-solid border-gray-500 p-2.5'>
        <div>
            <i className={cls}></i>
        </div>
          <div>
            <h4 className=' text-lg mb-2 font-light tracking-wide text-black '>{title}</h4>
            <p className=' text-[12px] font-light'>{description}</p>
          </div>
      </div>
  )
}

export default OffersItem