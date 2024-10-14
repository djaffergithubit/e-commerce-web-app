import axios from 'axios'
import React, { useEffect, useState } from 'react'
import searchIcon from "../../assets/search.svg"
import PaginationAdmin from '../../components/paginationAdmin'

const AllProducts = () => {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState({})
  const [searchForm, setSearchForm] = useState('')

  const getAllProducts = async () => {
    await axios.get('http://localhost:3500/products')
    .then((response)=>{
      setProducts(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const getProductCategory = () => {
    products.forEach(async(product)=>{
    await axios.get(`http://localhost:3500/categories/${product.productCategory}`)
    .then((response)=>{
      setCategories((prevCategories)=>{
        return{
          ...prevCategories,
          [product.productCategory]: response.data
        }
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  })}

  // const getFilteredProducts = () => {

    // setProducts(products.filter((product)=>{
    //   return product.productName.toLowerCase().includes(searchForm.toLowerCase())
    // }
    // ))

    // await axios.get('http://localhost:3500/products')
    // .then((response)=>{
    //   setProducts(response.data.filter((product)=>{
    //     return product.productName.toLowerCase().includes(searchForm.toLowerCase())
    //   }))
    // })
    // .catch((error)=>{
    //   console.log(error)
    // })
  // }

  useEffect(()=>{
    getAllProducts()
  }, [])

  useEffect(()=>{
    getProductCategory()
  }, [products])

  // useEffect(()=>{
  //   getFilteredProducts()
  // }, [searchForm, products])

  return (
    <div className='item1 px-4 py-3'>
      <div className=' md:flex justify-between items-center'>
          <div className=' mb-2'>
            <h1 className=' text-2xl font-light tracking-wide'>All Products</h1>
            <h5 className=' font-bold'>- {products.length} products found</h5>
          </div>
          <div className=' flex items-center'>
            <div className=' border-y-2 border-l-2 border-solid border-gray-400 py-1.5 px-2'>
              <img className=' w-[20px]' src={searchIcon} alt="" />
            </div>
            <input
                className=' p-1 text-base outline-none border-y-2 border-r-2 border-solid border-gray-400'
                type="search"
                placeholder='search product'
                onChange={(event)=>{
                  setSearchForm(event.target.value)
                }}
                value={searchForm}
            />
          </div>
      </div>
      <br />
      {Object.keys(products).length > 0 ?<PaginationAdmin
        itemsPerPage={6}
        items={products}
        categories={categories}
        isProducts={true}
        isCoupon={false}
      />
      :
      (
        <div>Loading...</div>
      )
    }

    </div>
  )
}

export default AllProducts