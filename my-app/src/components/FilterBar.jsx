import React from 'react'
import gridIcon from "../assets/grid.svg"
import searchIcon from "../assets/search.svg"
import filterIcon from "../assets/filter.svg"
import { useDispatch, useSelector } from 'react-redux'
import { showElementValue } from '../states/showElementSlice'
import { setShowSidebar, showSidebarValue } from '../states/showSidebarSlice'

const FilterBar = ({ handleSort, sortOption }) => {

    const showElement = useSelector(showElementValue)
    const showSidebar = useSelector(showSidebarValue)
    const dispatch = useDispatch()

    const handleChange = (e)=>{
        handleSort(e.target.value)
    }

  return (
    <div className=' responsive-filter flex items-center justify-between gap-1'>
        <div className={`${showElement && 'flex justify-between items-center w-full'}`}>
            <div className=' flex items-center'>
                <img className=' w-[24px] mr-2 cursor-pointer' src={gridIcon} alt="" />
                <i className="fa-solid fa-rectangle-list mr-2 text-blue-700 text-[24px] cursor-pointer"></i>
                <p className=' text-base font-light'><span className=' font-bold'>13</span> Products found</p>
            </div>
            {showElement && <div className=' flex items-center cursor-pointer' onClick={()=>{dispatch(setShowSidebar())}}>
            <img className=' w-5' src={filterIcon} alt="" />
            <h3 className=' text-[15px] font-semibold'>{showSidebar ? 'Hide' : 'Show'} Filter</h3>
            </div>}
        </div>
        <div className=' grid grid-cols-4 justify-center items-center my-2.5 max-w-[220px] w-full border-[1px] border-solid border-black'>
            <button className='py-2 border-r-white flex justify-center items-center col-span-1'><img className=' w-5' src={searchIcon} alt="" /></button>
            <input className=' outline-none pr-1  py-2  placeholder:text-gray-500 text-md col-span-3'
                style={{ appearance: 'none' }} 
                type="search" 
                placeholder='Search products'
                />
        </div>
        <div className=' font-medium text-[14px]'>
            Sort by: <select className=' outline-none' onChange={handleChange} value={sortOption.sortBy} name="" id="">
                <option value="Latest">Latest</option>
                <option value="Lowest Price">Lowest Price</option>
                <option value="Highest Price">Highest Price</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
        </div>
    </div>

  )
}

export default FilterBar