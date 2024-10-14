import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Form from '../../components/Form'
import PaginationAdmin from '../../components/paginationAdmin'

const AddCategory = () => {

  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    await axios.get('http://localhost:3500/categories')
    .then((response)=>{
      setCategories(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    getCategories()
  }, [categories])

  return (
    <div className=' item1 w-full py-10 px-5'>
      <Form
        title='Category'
      />
      <div className=' py-6'>
        <h1 className=' text-2xl font-light tracking-wide mb-3'>All Categories</h1>
        {Object.keys(categories).length > 0 ? <PaginationAdmin
          itemsPerPage={6}
          items={categories}
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

export default AddCategory