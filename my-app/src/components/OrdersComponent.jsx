import React from 'react'
import Table from './Table'
import PaginationAdmin from './paginationAdmin'

const OrdersComponent = ({ data }) => {
  return (
    <div>
        <PaginationAdmin
            items={data}
            itemsPerPage={10}
            isOrder={true}
        />
    </div>
  )
}

export default OrdersComponent