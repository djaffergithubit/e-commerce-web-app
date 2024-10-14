import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Offers from '../components/Offers'
import ProductsCarousel from '../components/ProductsCarousel'
import Categories from '../components/Categories'
import axios from 'axios'

const Home = () => {

  const [products, setProducts] = useState([])
  const [latestProducts, setLatestProducts] = useState([])
  const [phoneProducts, setPhoneProducts] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3500/products')
    .then((response)=>{
        setProducts(response.data)
    })
    .catch((error)=>{
        console.log(error)
    })

  }, [])

  useEffect(()=>{
    products.forEach((product)=>{
      axios.get(`http://localhost:3500/categories/${product.productCategory}`)
      .then((response)=>{
        if (response.data === 'Phone') {
          setPhoneProducts(prevPhoneProducts => [...prevPhoneProducts, product])      
        }
      })
    })

    let productsSortedByTime = products.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt)
    })
    
    setLatestProducts(productsSortedByTime.slice(0,4))

  }, [products])

  return (
    <div>
        <Hero/>
        <div className=' container px-[20px] py-10'>
          <Offers/>
          <ProductsCarousel
            title='Latest Products'
            data={latestProducts}
          />
        </div>
        <Categories/>
        <div className=' container px-[20px] py-10'>
          <ProductsCarousel
            title='Mobile Phones'
            data={phoneProducts}
          />
        </div>
    </div>
  )
}

export default Home