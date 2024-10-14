import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthToken } from '../states/tokenSlice'
import { useNavigate } from 'react-router-dom'
import { addMessage } from '../states/messagesSlice'
import { nanoid } from '@reduxjs/toolkit'

const Form = ({title}) => {

    const [categories, setCategories] = useState([])
    const [newBrand, setNewBrand] = useState({
        brandName: '',
        parentCategory: ''
    })
    const [newCategory, setNewCategory] = useState({
        categoryName: ''
    })
    const [newCoupon, setNewCoupon] = useState({
        couponName: '',
        discount: null,
        expiryDate: ''
    })
    const token = useSelector(selectAuthToken)
    const dispatch = useDispatch()
    const Navigate = useNavigate()

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
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        if (title === 'brand') {
            setNewBrand(prevBrand => {
                return{
                    ...prevBrand,
                    [name]: value
                }
            })
        }else if(title === 'Category'){
            setNewCategory(prevCategory => {
                return{
                    ...prevCategory,
                    [name]: value
                }
            })
        }else{
            setNewCoupon(prevCoupon => {
                return{
                    ...prevCoupon,
                    [name]: value
                }
            })
        }
    }

    const object = title === 'brand' ? newBrand : title === 'Category' ? newCategory : newCoupon

    const postNewElement = async () => {
      
      if ( (title === 'brand' && (newBrand.brandName === '' || newBrand.parentCategory === ''))
        || ( title === 'Category' && newCategory.categoryName === '')
        || ( title === 'coupon' && (newCoupon.couponName === '' || newCoupon.discount === null || newCoupon.expiryDate === ''))
       ) {
        dispatch(addMessage({id: nanoid(), message: 'Please fill in all fields', type: 'Error'}))
      }else{
        await axios.post(`http://localhost:3500/${title === 'brand' ? 'brands' : title === 'Category' ? 'categories' : 'coupons'}/create`, object, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          dispatch(addMessage({id: nanoid(), message: response.data.message, type: 'Success'}))
          Navigate('/admin/products')
        })
        .catch((error)=>{
          const errorMessage = error.response ? error.response.data.message : 'Une erreur s\'est produite';
          dispatch(addMessage({ id: nanoid(), message: errorMessage, type:'Error' }));
        });
      }

      
    };
    
  
  const handleSubmit = (e) => {

    e.preventDefault();
    postNewElement()
  };
  
  return (
    <div>
      <h1 className=' text-xl font-normal text-gray-500 mb-2 tracking-wider'>Create {title}</h1>
      <p className=' text-gray-400'>Use the form to <span className=' font-bold text-black'>Create a {title}</span></p>
      <form action="" className=' max-w-lg w-full shadow-2xl px-3 py-8' onSubmit={handleSubmit}>
        <div className=' flex flex-col gap-1 mb-2'>
          <label htmlFor={title === 'brand' ? 'brandName' : title === 'Category' ? 'categoryName': 'couponName'} className=' text-base'>{title} name</label>
          <input 
            className=' w-full px-2 py-1 outline-none border-2 border-solid border-gray-400'
            type="text" 
            name={title === 'brand' ? 'brandName' : title === 'Category' ? 'categoryName' : 'couponName'}
            placeholder={`${title} name`}
            onChange={handleChange}
            value={title === 'brand' ? newBrand.brandName : title === 'Category' ? newCategory.categoryName : newCoupon.couponName}
            />
        </div>

        {title === 'brand' && <div className=' flex flex-col gap-1 mb-2'>
          <label htmlFor='parentCategory' className=' text-base'>Category name</label>
          <select name="parentCategory" id="" onChange={handleChange} value={newBrand.parentCategory}  className=' w-full px-2 py-1 outline-none border-2 border-solid border-gray-400'>
            {categories.map((category=>(
                <option value={category._id}>{category.categoryName}</option>
            )))
            }
          </select>
        </div>}

        {title === 'coupon' && <div className=' flex flex-col gap-1'>
            <div className='mb-2'>
                <label htmlFor='discount' className=' text-base'>Discount (%)</label>
                <input 
                    className=' w-full px-2 py-1 outline-none border-2 border-solid border-gray-400'
                    type="number" 
                    name='discount'
                    placeholder='Discount (%)'
                    onChange={handleChange}
                    value={newCoupon.discount}
                    />
            </div>
            <div className=' mb-2'>
                <label htmlFor='expiryDate' className=' text-base '>Expiry Date</label>
                <input 
                    className=' w-full px-2 py-1 outline-none border-2 border-solid border-gray-400'
                    type="date" 
                    name='expiryDate'
                    placeholder='Expiry date'
                    onChange={handleChange}
                    value={newCoupon.expiryDate}
                    />
            </div>
        </div>
        }
        <button type='submit' className=' bg-blue-600 px-3 py-1 text-white mt-3 text-lg font-medium'>Save {title}</button>
      </form>
    </div>
  )
}

export default Form