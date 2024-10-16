import React, { useEffect, useState } from 'react'
import FilterBar from './FilterBar'
import PaginatedItems from './PaginatedItems'
import { useDispatch } from 'react-redux'
import { setActiveButton } from '../states/activeButtonSlice'
import { setCurrentBrand } from '../states/currentBrandSlice'

const Products = () => {

  const [items, setItems] = useState([])
  const [searchProduct, setSearchProduct] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setActiveButton({ value: 'All' }))
    dispatch(setCurrentBrand({ value: 'All' }))
  }, [])

  return (
    <div className=' products col-span-6 grow px-1 md:order-2c order-1'>
      <FilterBar
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
        numberOfProducts={items.length}
      />
      <PaginatedItems
        itemsPerPage={9}
        searchProduct={searchProduct}
        items={items}
        setItems={setItems}
      />
    </div>
  )
}

export default Products