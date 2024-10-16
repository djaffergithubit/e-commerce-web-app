import React, { useEffect, useState } from 'react'

const CheckoutForm = ({ shipping, makePayment }) => {

    const [billingForm, setBillingForm] = useState({
        recipientName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phone: ''
    })

    const [shippingForm, setShippingForm] = useState({
        recipientName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phone: ''
    })

    const [countries, setCountries] = useState([])

    useEffect(()=> {
        const fetchCountries = async () => {
            try {
              const response = await fetch('https://restcountries.com/v3.1/all');
              const data = await response.json();
              const countryNames = data.map(country => country.name.common);
              setCountries(countryNames.sort());
            } catch (error) {
              console.error('Error fetching countries:', error);
            }
          };
      
          fetchCountries();
    }, [])

    const handleShippingChange = (e)=>{
        const { name, value } = e.target
        setShippingForm(prevShippingForm => {
            return {
                ...prevShippingForm,
                [name]: value
            }
        })
    }

    const handleBillingChange = (e)=>{
        const { name, value } = e.target
        setBillingForm(prevBillingForm => {
            return {
                ...prevBillingForm,
                [name]: value
            }
        })
    }

    // const isFormValid = (form) => {
    //     for (const key in form) {
    //         if (!form[key]) {
    //             return false;
    //         }
    //     }
    //     return true; 
    // };

    // const handleError = () => {
    //     console.log('Please fill in all fields')
    // }

  return (
    <div className=' bg-white rounded-md shadow-lg w-full p-[10px]'>
        <h1 className=' text-[#333333] text-[25px] font-light mb-[10px]'>{shipping ? 'Shipping' : 'Billing'} Address</h1>
        <form action="" onSubmit={makePayment}>
            <div className=' flex flex-col'>
                <label htmlFor="recipientName" className=' text-sm text-[#000000] font-medium'>Recipient Name</label>
                <input 
                    type="text" 
                    className=' px-[10px] py-[8px] my-[10px] border-[1px] border-solid border-[#333333] outline-none text-base placeholder:text-slate-500' 
                    placeholder='Recipient Name' 
                    onChange={shipping ? handleShippingChange : handleBillingChange}
                    value={shipping ? shippingForm.recipientName : billingForm.recipientName}
                    name='recipientName'
                    required= {shipping ? false : true}
                    />
            </div>
            <div className=' flex flex-col'>
                <label htmlFor="Address Line1" className=' text-sm text-[#000000] font-medium'>Address Line1</label>
                <input 
                    type="text" 
                    className=' px-[10px] py-[8px] my-[10px] border-[1px] border-solid border-[#333333] outline-none text-base placeholder:text-slate-500' 
                    placeholder='Address Line1' 
                    onChange={shipping ? handleShippingChange : handleBillingChange}
                    value={shipping ? shippingForm.addressLine1 : billingForm.addressLine1}
                    name='addressLine1'
                    required= {shipping ? false : true}
                    />
            </div>
            <div className=' flex flex-col'>
                <label htmlFor="Address Line2" className=' text-sm text-[#000000] font-medium'>Address Line2</label>
                <input 
                    type="text" 
                    className=' px-[10px] py-[8px] my-[10px] border-[1px] border-solid border-[#333333] outline-none text-base placeholder:text-slate-500' 
                    placeholder='Address Line2' 
                    onChange={shipping ? handleShippingChange : handleBillingChange}
                    value={shipping ? shippingForm.addressLine2 : billingForm.addressLine2}
                    name='addressLine2'
                    required= {shipping ? false : true}
                    />
            </div>
            <div className=' flex flex-col'>
                <label htmlFor="City" className=' text-sm text-[#000000] font-medium'>City</label>
                <input 
                    type="text" 
                    className=' px-[10px] py-[8px] my-[10px] border-[1px] border-solid border-[#333333] outline-none text-base placeholder:text-slate-
                    500' placeholder='City' 
                    onChange={shipping ? handleShippingChange : handleBillingChange}
                    value={shipping ? shippingForm.city : billingForm.city}
                    name='city'
                    required= {shipping ? false : true}
                    />
            </div>
            <div className=' flex flex-col'>
                <label htmlFor="State" className=' text-sm text-[#000000] font-medium'>State</label>
                <input 
                    type="text" 
                    className=' px-[10px] py-[8px] my-[10px] border-[1px] border-solid border-[#333333] outline-none text-base placeholder:text-slate-500' 
                    placeholder='State' 
                    onChange={shipping ? handleShippingChange : handleBillingChange}
                    value={shipping ? shippingForm.state : billingForm.state}
                    name='state'
                    required= {shipping ? false : true}
                    />
            </div>
            <div className=' flex flex-col'>
                <label htmlFor="Postal Code" className=' text-sm text-[#000000] font-medium'>Postal Code</label>
                <input 
                    type="text" 
                    className=' px-[10px] py-[8px] my-[10px] border-[1px] border-solid border-[#333333] outline-none text-base placeholder:text-slate-500' 
                    placeholder='Postal Code' 
                    onChange={shipping ? handleShippingChange : handleBillingChange}
                    value={shipping ? shippingForm.postalCode : billingForm.postalCode}
                    name='postalCode'
                    required= {shipping ? false : true}
                    />
            </div>
            <select name="country" id="" className='px-[10px] py-[8px] my-[10px] border-[1px] border-solid border-[#333333] outline-none text-base w-full' onChange={shipping ? handleShippingChange : handleBillingChange} value={shipping ? shippingForm.country : billingForm.country} required= {shipping ? false : true}>
                {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                )) }
            </select> 
            <div className=' flex flex-col'>
                <label htmlFor="Phone" className=' text-sm text-[#000000] font-medium'>Phone</label>
                <input 
                    type="text" 
                    className=' px-[10px] py-[8px] my-[10px] border-[1px] border-solid border-[#333333] outline-none text-base placeholder:text-slate-500' 
                    placeholder='Phone' 
                    onChange={shipping ? handleShippingChange : handleBillingChange}
                    value={shipping ? shippingForm.phone : billingForm.phone}
                    name='phone'
                    required= {shipping ? false : true}
                    />
            </div>
            {!shipping && <button
            type='submit' 
            className='px-2 py-1 text-base bg-[#007bff] text-white border-1.5 border-solid border-[#007bff] flex items-center gap-1'>
            Proceed to Checkout
    </button>}
        </form>
    </div>
  )
}

export default CheckoutForm