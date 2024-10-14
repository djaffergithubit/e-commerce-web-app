import React, { useState } from 'react'

const Category = ({ categoryName, categoryIndex }) => {

    const [activeButton, setActiveButton] = useState('button0')

    const handleClick = (button)=>{ 
        setActiveButton(button)
    }

  return (
    <li className=' py-1'>
        <button className={`border-b-[1px] border-solid border-[#333333] max-w-[140px] w-full text-start ${activeButton === `button${categoryIndex + 1}` && ' pl-2 border-l-4 border-l-[#ff4500]'}`}
            onClick={()=>{handleClick(`button${categoryIndex + 1}`)}}
        >
            <span className=' text-sm'>&gt;</span> {categoryName}
        </button>
    </li>
  )
}

export default Category