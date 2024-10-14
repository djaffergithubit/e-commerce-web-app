import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductButton from './ProductButton'
import axios from 'axios'
import { useEffect } from 'react'
import { FaStar } from 'react-icons/fa'

const SingleProduct = ({ product, bool }) => {

  const [rating, setRating] = useState(null)
  const [productReviews, setProductReviews] = useState([])
  const Navigate = useNavigate()

  const getProductReviews = async () => {
    await axios.get(`http://localhost:3500/reviews/${product._id}`)
    .then((response)=>{
      setProductReviews(response.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getProductReviews()
  }, [])

  useEffect(()=>{
    if(productReviews.length > 0){
      let indexMax = 0
      let reviewRatingSum = 0
      productReviews.map((review, index)=>{
        reviewRatingSum = reviewRatingSum + review.reviewRating 
        if (index > indexMax) {
          indexMax = index
        }
      })

      setRating(reviewRatingSum / (indexMax + 1))
    }
  }, [productReviews])

  return (
    <div key={product.product_id} className={` shadow-xl ${bool && 'border-x-2 border-solid border-gray-300'} max-w-[240px] w-full h-full mr-2`} >
        <div className=" text-center h-full">
            <img 
                className=' cursor-pointer w-full h-[227px]' 
                src={`http://localhost:3500/uploads/${product.productImages[0].split('\\').pop()}`} 
                alt="" 
                loading="lazy" 
                onClick={()=>Navigate(`/product-details/${product._id}`)}
            />
            <div className={`bg-white pt-2  ${!bool && 'h-[109px] flex flex-col justify-end border-t-[1px] border-solid border-slate-300'} `}>
                <div 
                  className=' flex justify-center'
                >
                    {
                      (!bool && product.productRegularPrice > 0) && <span className=" text-sm text-black font-medium mr-2 line-through">${product.productRegularPrice}</span>
                    }
                    <span className=" text-sm text-[#ff4500] font-medium">${product.productPrice}</span>
                </div>
                {(Object.keys(productReviews).length > 0 && !bool) && 
                  <div className=' flex justify-center text-[12px]'>
                    <div className=' flex justify-center gap-2 mr-1'>
                      {([...Array(5)].map((star, i) => {
                          return (
                                  <FaStar
                                      className=' cursor-pointer'
                                      color={i < rating ? "#ffc107" : "#e4e5e9"}
                                      size={18}
                                      />
                          )
                      }))}
                      
                    </div>
                    ({productReviews.length})
                  </div>
                }
                {/* mb-1 text-[20px] font-medium text-[#333333] */}
                <h1 className=' text-[20px] font-normal text-[#333333] border-b-[1px] border-solid border-gray-400'> 
                  {
                    product.productName.length <= 16 ? 
                        product.productName 
                      : 
                        `${product.productName.slice(0, 16)}...`
                  }
                </h1>
                {
                    bool && 
                      <p className=" mb-2 text-sm text-gray-500 font-light tracking-wide ">
                        {product.description.length <= 16 ? 
                              product.description 
                          :
                            ` ${product.description.slice(0, 16)}...`}
                      </p>
                    //   <p  dangerouslySetInnerHTML={{ __html: product.description.length <= 16 ? 
                    //     product.description 
                    // :
                    //   ` ${product.description.slice(0, 16)}...`}} />
                      
                  }
                <ProductButton
                  product={product}
                />
            </div>
            
        </div>
    </div>
  )
}

export default SingleProduct