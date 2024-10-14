import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Form from '../../components/Form'
import PaginationAdmin from '../../components/paginationAdmin'

const AddBrand = () => {

  const [brands, setBrands] = useState([])
  const [categories, setCategories ] = useState({})

  const getBrands = async () => {
    await axios.get('http://localhost:3500/brands')
    .then((response)=>{
      setBrands(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    getBrands()
  }, [])

   useEffect(()=>{
    brands.forEach(async(brand) => {
      await axios.get(`http://localhost:3500/categories/${brand.parentCategory}`)
      .then((response)=>{
        setCategories(prevCategories => {
          return{
            ...prevCategories,
            [brand.parentCategory]: response.data
          }
        })
      })
      .catch((error)=>{
        console.log(error)
      })
    })
   }, [brands])


  return (
    <div className=' item1 w-full py-10 px-5'>
      <Form
        title='brand'
      />
      <div className=' py-6'>
        <h1 className=' text-2xl font-light tracking-wide mb-3'>All Brands</h1>
        {Object.keys(brands).length > 0 ? <PaginationAdmin
          itemsPerPage={6}
          items={brands}
          categories={categories}
          isProducts={false}
          isCoupon={false}
        />
        :
        (
          <div>Loading...</div>
        )
      }
      </div>
     
    </div>
  )
}

export default AddBrand