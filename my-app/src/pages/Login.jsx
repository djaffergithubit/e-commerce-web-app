import React, { useState } from 'react'
import LoginImage from "../assets/login-image.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from "react-redux"
import { setToken } from '../states/tokenSlice'
import { setIsAdmin } from '../states/isAdminSlice'
import { setAuth } from '../states/isAuth'
import { setCurrentUser } from '../states/currentUserSlice'
import { addMessage } from '../states/messagesSlice'
import { nanoid } from '@reduxjs/toolkit'

const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e)=>{
        const {name, value} = e.target
        setUser(prevUser => {
            return{
                ...prevUser,
                [name]: value
            }
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        const formData = new FormData()
        formData.append('email', user.email)
        formData.append('password', user.password)

        axios.post(`http://localhost:3500/users/login`, formData)
        .then((response)=>{
            console.log(response);
            dispatch(setToken({ value: response.data.access_token }));
            dispatch(setAuth({ value: true }));
            dispatch(setCurrentUser({ User: response.data.user }));
            dispatch(addMessage({ id: nanoid(), message: response.data.message, type: 'Success' }))

            if (response.data.user.role === 'admin') {
                dispatch(setIsAdmin({ value: true }))
            }else{
                dispatch(setIsAdmin({ value: false }))
            }

            Navigate('/')
        })
        .catch((err)=>{
            console.log(err);
            // const errorMessage = err.response ? err.response.data.message : 'Une erreur s\'est produite';
            // dispatch(addMessage({ id: nanoid(), message: errorMessage, type:'Error' }));
        }
        )
    }

  return (
        <div className=' relative'>
            <div className=' flex justify-center items-center py-14'>
            <div className=''>
            <img className=' w-[400px] h-[315px]' src={LoginImage} alt="" />
        </div>
        <div className=' w-[350px] p-5 border-[1px] border-solid shadow-2xl'>
            <form action="" className=' flex flex-col gap-y-3' onSubmit={handleSubmit}>
                <h1 className=' text-3xl text-[#ff4500] font-medium tracking-wider mb-4 text-center'>Login</h1>
                <input 
                    className=' px-3 py-2 border-[1px] border-solid border-black outline-none text-base  '
                    type="email" 
                    name='email'
                    placeholder='Email'
                    onChange={handleChange}
                    value={user.email}
                    />
                <input 
                    className=' px-3 py-2 border-[1px] border-solid border-black outline-none text-base  '
                    type="password" 
                    name='password'
                    placeholder='Password'
                    onChange={handleChange}
                    value={user.password}
                    />

                    <div>
                        <button className=' w-full text-white tracking-wider bg-blue-500 px-3 py-2' type='submit'>Login</button>
                        <p className=' text-base tracking-wider font-light text-center pt-2 text-[#333333]'>Already an account?<span className=' text-[#0a1930] cursor-pointer font-medium'><Link to='/register'>Register</Link></span></p>
                    </div>
            </form>
        </div>
        
    </div>
        </div>
  )
}

export default Login