import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { activeButtonValue, setActiveButton } from '../states/activeButtonSlice'

const FilterButton = () => {

    const [categories, setCategories] = useState([])
    const dispatch = useDispatch()
    const activeButton = useSelector(activeButtonValue)

    useEffect(()=>{
        axios.get('http://localhost:3500/categories')
        .then((response)=>{
            setCategories(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [])


    const handleClick = (button)=>{ 
        dispatch(setActiveButton({ value: button }))
    }

  return (
        <div>
            <ul>
                <li className=' pb-1'>
                    <button className={`border-b-[1px] border-solid border-[#333333] max-w-[140px] w-full text-start ${activeButton === `All` && ' pl-2 border-l-4 border-l-[#ff4500]'}`}
                        onClick={()=>{handleClick(`All`)}}
                    >
                        <span className=' text-[15px]'>&gt;</span> All
                    </button>
                </li>
            {categories.map((category, index) => (
                
                <li className=' pb-1' key={index}>
                    <button className={`border-b-[1px] border-solid border-[#333333] max-w-[140px] w-full text-start ${activeButton === category.categoryName && ' pl-2 border-l-4 border-l-[#ff4500]'}`}
                        onClick={()=>{handleClick(category.categoryName)}}
                    >
                        <span className=' text-[15px]'>&gt;</span> {category.categoryName}
                    </button>
                </li>
            )) }
            </ul>
        </div>
  )
}

export default FilterButton