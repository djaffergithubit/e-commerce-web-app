import React, { useState } from 'react'
import FilterBar from './FilterBar'
import PaginatedItems from './PaginatedItems'

const Products = () => {

  const [sortOption, setSortOption] = useState({
    sortBy: ''
  })

  return (
    <div className=' products col-span-6 grow px-1 md:order-2c order-1'>
      <FilterBar 
        handleSort={setSortOption}
        sortOption={sortOption}

      />
      <PaginatedItems
        itemsPerPage={9}
        sortOption={sortOption}
      />
    </div>
  )
}

export default Products