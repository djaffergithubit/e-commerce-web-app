import React, { useState } from 'react'
import registerImage from "../assets/register-image.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {

    const [newUser, setNewUser] = useState({
        Name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null
    })

    const handleChange = (e) => {
        const { name, value, type } = e.target
        setNewUser(prevUser => {
            return{
                ...prevUser,
                [name]: type === 'file' ? e.target.files[0] : value
            }
        })
    }

    const Navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('Name', newUser.Name)
        formData.append('email', newUser.email)
        formData.append('password', newUser.password)
        formData.append('confirmPassword', newUser.confirmPassword)
        formData.append('profileImage', newUser.profileImage)

        axios.post('http://localhost:3500/users/register', formData)
        .then((response)=>{
            console.log(response.data)
            Navigate('/login')
        })
        .catch((err)=>console.log(err))
    }

  return (
        <div className=' flex justify-center items-center py-14'>
        <div className=' w-[350px] p-5 border-[1px] border-solid shadow-2xl'>
            <form action="" className=' flex flex-col gap-y-3' method="post" enctype="multipart/form-data" onSubmit={handleSubmit}>
                <h1 className=' text-3xl text-[#ff4500] font-medium tracking-wider mb-4 text-center'>Register</h1>
                <input 
                    className=' px-3 py-2 border-[1px] border-solid border-black outline-none text-base '
                    type="text" 
                    name='Name'
                    placeholder='Name'
                    onChange={handleChange}
                    value={newUser.Name}
                    />
                <input 
                    className=' px-3 py-2 border-[1px] border-solid border-black outline-none text-base  '
                    type="email" 
                    name='email'
                    placeholder='Email'
                    onChange={handleChange}
                    value={newUser.email}
                    />
                <input 
                    className=' px-3 py-2 border-[1px] border-solid border-black outline-none text-base  '
                    type="password" 
                    name='password'
                    placeholder='Password'
                    onChange={handleChange}
                    value={newUser.password}
                    />
                <input 
                    className=' px-3 py-2 border-[1px] border-solid border-black outline-none text-base  '
                    type="password" 
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    onChange={handleChange}
                    value={newUser.confirmPassword}
                    />

                    <input 
                        className=' px-3 py-2 border-[1px] border-solid border-black outline-none text-base  '
                        type="file" 
                        name='profileImage'
                        onChange={handleChange}
                    />

                    <div>
                        <button className=' w-full text-white tracking-wider bg-blue-500 px-3 py-2' type='submit'>Register</button>
                        <p className=' text-base tracking-wider font-light text-center pt-2 text-[#333333]'>Already an account?<span className=' text-[#0a1930] cursor-pointer font-medium'><Link to='/login'>Login</Link></span></p>
                    </div>
            </form>
        </div>
        <div>
            <img className=' w-[400px] h-[315px]' src={registerImage} alt="" />
        </div>
    </div>
  )
}

export default Register