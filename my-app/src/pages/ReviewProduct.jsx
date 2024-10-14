import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RatingStar from '../components/RatingStar'
import trashIcon from "../assets/trash-2.svg"
import editIcon from "../assets/edit.svg"
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../states/currentUserSlice'
import { convertDateFormatWithoutTime } from '../data/convertSateFormatWithoutTime'
import { FaStar } from 'react-icons/fa'
import { selectAuthToken } from '../states/tokenSlice'
import { addMessage } from '../states/messagesSlice'
import { nanoid } from '@reduxjs/toolkit'

const ReviewProduct = () => {

    const [rating, setRating] = useState(null)
    const [currentProduct, setCurrentProduct] = useState({})
    const [userReviews, setUserReviews] = useState([])
    const [userReviewInProduct, setUserReviewInProduct] = useState([])
    const [toUpdate, setToUpdate] = useState(false)
    const [formReview, setFormReview] = useState({
        review: ''
    })
    const { productId } = useParams()
    const currentUser = useSelector(selectCurrentUser)
    const token = useSelector(selectAuthToken)
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const handleFormChange = (e) => {
        const {name, value} = e.target
        setFormReview(prevForm => {
            return {
                ...prevForm,
                [name]: value
            }
        })
    }
    const getProductToReview = async () => {
        await axios.get(`http://localhost:3500/products/product-details/${productId}`)
        .then((response) => {
            setCurrentProduct(response.data)
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const getUserReviews = async() => {
        await axios.get(`http://localhost:3500/reviews/user-reviews/reviews`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setUserReviews(response.data)
            console.log('user reviews are', response.data);
        })
        .catch((error) => {
          console.log(error);  
        })
    }

    const getUserReviewInProduct = async() => {
        try {
            const response = await userReviews.find(review => review.productReview === productId)
            setUserReviewInProduct(response)
            console.log('user review in product', response);
        } catch (error) {
            console.log('there is no review yet');
        }
    }

    const handleAddReview = async () => {
        await axios.post(`http://localhost:3500/reviews/add-review`, {reviewRating: rating, reviewFeedBack:formReview.review, productReview: productId },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        .then((response) => {
            console.log(response.data);
            dispatch(addMessage({id: nanoid(), message: 'Review Added Successfully', type: 'Success'}))
        })
        .catch((error) => {
            console.log(error);
        });

        Navigate(`/product-details/${productId}`)
    }

    const handleUpdateReview = async() => {
        await axios.put(`http://localhost:3500/reviews/update-review/${userReviewInProduct._id}`, {reviewRating: rating, reviewFeedBack: formReview.review})
        .then((response) => {
            console.log(response.data);
            dispatch(addMessage({id: nanoid(), message: 'Review Updated Successfully', type: 'Success'}))
        })
        .catch((error) => {
            console.log(error);
        })

        Navigate(`/order-details/${userReviewInProduct._id}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!toUpdate) {
            handleAddReview()
            setToUpdate(false)
        }

        handleUpdateReview()
    }

    const handleDeleteReview = async() => {
        await axios.delete(`http://localhost:3500/reviews/delete-review/${userReviewInProduct._id}`)
        .then((response)=> {
            console.log(response.data);
            dispatch(addMessage({id: nanoid(), message: 'Review Deleted Successfully', type: 'Success'}))
        })
        .catch((error) => {
            console.log(error);
        })

        Navigate('/order-history')
    }

    useEffect(() => {
        getProductToReview()
        getUserReviews()
    }, [productId])

    useEffect(()=>{
        getUserReviewInProduct()
    }, [userReviews])

  return (
    <div className=' py-10 lg:container'>
        <div>
            <h1 className=' text-3xl font-medium tracking-wide mb-2'>Review Products</h1>
            <h3 className=' text-[15px] text-[#333333] font-semibold'>Product Name: <span className=' font-extralight'>{currentProduct.productName}</span></h3>
            {currentProduct.productImages && <img 
                className=' w-[100px]'
                src={`http://localhost:3500/uploads/${currentProduct.productImages[0]?.split('\\').pop()}`}
                loading='lazy'
                alt="" 
            />}
        </div>
        {(!userReviewInProduct || toUpdate) ? (<form action="" onSubmit={handleSubmit}>
            <div>
                <label className='text-base text-[#333333] font-medium' htmlFor="rating">Rating</label>
                <RatingStar
                    rating={rating}
                    setRating={setRating}
                />
            </div>
            <br />
            <div className=' flex flex-col'>
                <label className=' text-base text-[#333333] font-medium' htmlFor="review">Review</label>
                <textarea className=' outline-none border-[1px] border-solid border-[#333333] px-4 py-2 max-w-[500px] w-full' name="review" id="" rows="7" onChange={handleFormChange} value={formReview.review}></textarea>
            </div>
            <br />
            <div className=' flex gap-1'>
                <button 
                    className={`px-2 py-1 text-base bg-[#007bff] text-white border-1.5 border-solid border-[#007bff] flex items-center gap-1`} 
                    type='submit'
                >
                    {toUpdate ? 'Update Review' : 'Submit Review'}
                </button>

                {toUpdate && <button 
                    className={`px-2 py-1 text-base bg-[#f0f0f0] text-black border-1.5 border-solid border-[#f0f0f0] flex items-center gap-1`} 
                    type='button'
                    onClick={()=>setToUpdate(false)}
                >
                    cancel
                </button>}
                
            </div>
        </form>
        )
        : 
        (
        <section className=' p-2 rounded-lg shadow-slate-200 shadow-xl'>
            <h3 className=' text-2xl font-light'>Product Reviews</h3>
            <br />
            <div className=' flex justify-between gap-2'>
                <div>
                <div className=' flex gap-2'>
        {([...Array(5)].map((star, i) => {
            return (
                    <FaStar
                        className=' cursor-pointer'
                        color={i < userReviewInProduct.reviewRating ? "#ffc107" : "#e4e5e9"}
                        size={18}
                        />
            )
        }))}
        </div>
                    <p>{userReviewInProduct.reviewFeedBack}</p>
                    <div className=' flex flex-col'>
                        <strong className=' text-sm'>{convertDateFormatWithoutTime(userReviewInProduct.updatedAt)}</strong>
                        <strong className=' text-sm'>by: {currentUser.Name}</strong>
                    </div>
                </div>
                <div className=' flex'>
                    <img className=' mr-1 cursor-pointer' src={editIcon} alt="" onClick={()=>setToUpdate(true)}/>
                    <img className=' cursor-pointer' src={trashIcon} alt="" onClick={handleDeleteReview} />
                </div>
            </div>
        </section>)}
    </div>
  )
}

export default ReviewProduct