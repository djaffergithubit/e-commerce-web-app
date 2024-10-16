import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ButtonLink from '../components/ButtonLink'
import ProductButton from '../components/ProductButton'

const ProductDetails = () => {

    const [currentProduct, setCurrentProduct] = useState({})
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [category, setCategory] = useState()
    const [brand, setBrand] = useState()
    const {id} = useParams()

    const getCurrentProduct = async () => {
        await axios.get(`http://localhost:3500/products/product-details/${id}`)
        .then((response) => {
            setCurrentProduct(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const getCategory = async (category) => {
        await axios.get(`http://localhost:3500/categories/${category}`)
        .then((response) => {
            setCategory(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const getBrand = async (brand) => {
        await axios.get(`http://localhost:3500/brands/brand-name/${brand}`)
        .then((response) => {
            setBrand(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getCurrentProduct()
    }, [id]);
    
    useEffect(() => {
        if (currentProduct.productCategory) {
            getCategory(currentProduct.productCategory)
        }
    }, [currentProduct.productCategory]);

    useEffect(() => {
        if (currentProduct.productBrand) {
            getBrand(currentProduct.productBrand)
        }
    }, [currentProduct.productBrand]);
    

    useEffect(()=>{
        console.log(category)
    }, [])

    const handleImageChange = (activeIndex)=>{
        setActiveImageIndex(activeIndex)
    }

    setTimeout(()=>{
        if (activeImageIndex < currentProduct.productImages.length-1) {
            setActiveImageIndex(activeImageIndex + 1)
        }else{
            setActiveImageIndex(0)
        }
    }, 4000)
 
  return (
    <div className=' lg:container py-10 px-4'>
        <div className=''>
            <h1 className=' text-3xl font-medium tracking-wide mb-2'>Product Details</h1>
            <ButtonLink
                linkContent='Back To Products'
                path='/shop'
            />
        </div>
        <section className='pt-6'>
            {Object.keys(currentProduct).length > 0 ? (
                        
        <div className='md:flex items-start'>
            <div className=' info-item md:mr-4 '>
                    <img className=' w-full object-cover h-[350px] border-[1px] border-gray-400 border-solid rounded' src={`http://localhost:3500/uploads/${currentProduct?.productImages[activeImageIndex].split("\\").pop()}`} alt="" />
                <div className=' flex'>
                    {currentProduct.productImages.map((image, index)=>(
                        <img 
                            key={index} 
                            className={`w-[60px] mt-2 mr-3 cursor-pointer border-[1px] border-solid ${activeImageIndex === index ? ' border-[#ff4500]' : 'border-gray-400'}`} src={`http://localhost:3500/uploads/${image.split("\\").pop()}`} 
                            alt="" 
                            onClick={()=>handleImageChange(index)}
                            />
                    ))}
                </div>
            </div>
            
            <div className=' info-item md:pt-0 pt-4 '>
                <div className='border-b-[1px] border-solid border-gray-400'>
                    <h1 className=' text-2xl font-light text-[#333333] mb-2.5'>{currentProduct.productName}</h1>
                </div>
                <ul>
                    <li className=' mb-3 border-b-[1px] border-solid border-gray-400 pb-2 text-[#333333] font-bold flex justify-between items-center'>Price:<span className=' text-[#ff4500] font-semibold tracking-wide pt-2'>${currentProduct.productPrice}</span></li>
                    <li className=' mb-3 border-b-[1px] border-solid border-gray-400 pb-2 text-[#333333] font-bold flex justify-between items-center'>SKU:<span className=' font-light'>{currentProduct.SKU}</span></li>
                    <li className=' mb-3 border-b-[1px] border-solid border-gray-400 pb-2 text-[#333333] font-bold flex justify-between items-center'>Category:<span className=' font-light'>{category}</span></li>
                    <li className=' mb-3 border-b-[1px] border-solid border-gray-400 pb-2 text-[#333333] font-bold flex justify-between items-center'>Brand:<span className=' font-light'>{brand}</span></li>
                    <li className=' mb-3 border-b-[1px] border-solid border-gray-400 pb-2 text-[#333333] font-bold flex justify-between items-center'>Color:<span className=' font-light'>{currentProduct.productColor}</span></li>
                    <li className=' mb-3 border-b-[1px] border-solid border-gray-400 pb-2 text-[#333333] font-bold flex justify-between items-center'>Quantity In Stock:<span className=' font-light'>{currentProduct.quantity}</span></li>
                    <li className=' mb-3 border-b-[1px] border-solid border-gray-400 pb-2 text-[#333333] font-bold flex justify-between items-center'>Sold:<span className=' font-light'>{currentProduct.sold}</span></li>
                </ul>
                <div className=' mt-[0.5rem] grid sm:grid-cols-2 grid-cols-1 gap-2 h-full'>
                    <ProductButton
                        product={currentProduct}
                    />
                    <button className=' px-3 py-1 text-white bg-[#ff4500] rounded tracking-wider w-full'>Add To Wishlist</button>
                </div>
                <div className=' pt-6'>
                <div className=''>
                    <h1 className=' font-semibold mb-2'>Product Description</h1>
                    <div dangerouslySetInnerHTML={{ __html: currentProduct.description }} />
                </div>

            </div>
                
            </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
        </section>
    </div>
  )
}

export default ProductDetails

