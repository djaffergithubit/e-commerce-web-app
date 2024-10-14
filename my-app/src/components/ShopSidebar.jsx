import React, { useEffect, useState } from 'react'
import { showElementValue } from '../states/showElementSlice'
import { useDispatch, useSelector } from 'react-redux'
import { showSidebarValue } from '../states/showSidebarSlice'
import FilterButton from './FilterButton'
import axios from 'axios'
import { currentBrandValue, setCurrentBrand } from '../states/currentBrandSlice'

const ShopSidebar = () => {

    const showElement = useSelector(showElementValue)
    const showSideBar = useSelector(showSidebarValue)
    const [brands, setBrands] = useState([])
    const currentBrand = useSelector(currentBrandValue)

    const dispatch = useDispatch()

    const handleChange = (e)=>{
        dispatch(setCurrentBrand({ value: e.target.value }))
    }

    useEffect(()=>{
        axios.get('http://localhost:3500/brands')
        .then((response)=>{
            setBrands(response.data)
        })
        .catch((error)=>{
            console.log(error)
        }
        )  
    }, [])

    useEffect(()=>{
        console.log(currentBrand)
    }, [currentBrand])


  return (
     <div className={` ${(showElement && !showSideBar) ? 'hidden' : (showElement && showSideBar) ? 'fixed left-0 bg-white' : '' } mb-2 pt-6 px-3 pb-4 border-[1px] border-solid border-[#333333] max-w-[192px] w-full md:order-1 order-2`}>
        <div>
            <div>
                <h1 className=' mb-1 text-xl font-medium text-[#333333]'>Categories</h1>
                <div>
                    <FilterButton />
                </div>
            </div>
            <div className=' mb-2'>
                <h1 className=' mb-2 text-xl font-medium text-[#333333]'>Brand</h1>
                <select className=' max-w-[140px] w-full px-2 py-1 rounded outline-none border-[1px] border-solid border-[#333333]' name="currentBrand" onChange={handleChange} value={currentBrand} id="">
                    <option key={0} value='All'>All</option>
                    {brands.map((brand, index)=>(
                        <option key={index+1} value={brand.brandName}>{brand.brandName}</option>
                    ))}

                </select>
            </div>
        </div>

        <div>
            <h1 className=' mb-2 text-xl font-medium text-[#333333]'>Price</h1>
            <input className=' w-full' type="range" />
        </div>

        <button className=' px-2 py-1 text-white bg-[#ff4500] rounded'>Clear Filter</button>
    </div>
  )
}

export default ShopSidebar