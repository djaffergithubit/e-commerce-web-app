import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Form from '../../components/Form'
import PaginationAdmin from '../../components/paginationAdmin'
import { useSelector } from 'react-redux'
import { selectAuthToken } from '../../states/tokenSlice'

const AddCoupon = () => {

  const [coupons, setCoupons] = useState([])
  const token = useSelector(selectAuthToken)

  const getCoupons = async () => {
    await axios.get('http://localhost:3500/coupons', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response)=>{
      setCoupons(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    getCoupons()
  }, [])
  
  return (
    <div className=' px-5'>
        <div className=' py-6'>
            <h1 className=' text-2xl font-light tracking-wide mb-3'>All Coupons</h1>
            {Object.keys(coupons).length > 0 ? <PaginationAdmin
              itemsPerPage={6}
              items={coupons}
              isProducts={false}
              isCoupon={true}
            />
            :
            (
              <div>Loading...</div>
            )
          }
          <div className=' pt-6'>
            <Form
                title='coupon'
              />
          </div>
      </div>
    </div>
  )
}

export default AddCoupon