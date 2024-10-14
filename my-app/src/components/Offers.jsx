import React from 'react'
import OffersItem from './offersItem'
import { items } from '../data/offers'

const Offers = () => {

  return (
    <div className=' grid justify-center items-center grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mb-4'>
       {items.map((item)=>(
        <OffersItem
            key={item.title}
            cls={item.class}
            title={item.title}
            description={item.description}
        />
       ))}
    </div>


  )
}

export default Offers