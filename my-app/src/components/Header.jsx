import React, { useEffect, useState } from 'react'
import shoppingImage from "../assets/shopping-cart (1).svg"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setNull } from '../states/tokenSlice'
import { selectIsAuth, setAuth } from '../states/isAuth'
import { selectIsAdmin } from '../states/isAdminSlice'
import { cartValue } from '../states/cartSlice'
import { selectCurrentUser } from '../states/currentUserSlice'
import userIcon from "../assets/user.png"
import HeaderMenu from './HeaderMenu'

const Header = () => {

    const [activeButton, setActiveButton] = useState('')
    const [mediumWindow, setMediumWindow] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const [showHeader, setShowHeader] = useState(false)
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const isAuth = useSelector(selectIsAuth)
    const isAdmin = useSelector(selectIsAdmin)
    const currentUser = useSelector(selectCurrentUser)
    const carts = useSelector(cartValue)

    const [numberOfElements, setNumberOfElements] = useState(0)

    useEffect(()=>{
        let somme = 0
        let filteredCarts = carts.filter(cart => cart.user === currentUser._id)
        filteredCarts.map(cart => somme += cart.quantity)
        setNumberOfElements(somme)
    }, [carts, currentUser])

    const handleClick = (button) => {
        setActiveButton(button)
        setShowMenu(false)
    }


    const handleLogout = () => {
        axios.get('http://localhost:3500/users/logout')
        .then((response)=>{
            console.log(response.data)
            dispatch(setNull())
        })
        .catch((error)=>{console.log(error)})
    }

    window.addEventListener('scroll', ()=>{
        if (window.scrollY >= 85) {
            setShowHeader(true)
        }
        else{
            setShowHeader(false)
        }
    })

    window.addEventListener('resize', ()=>{
        if (window.innerWidth > 744) {
            setMediumWindow(false)
        }else{
            setMediumWindow(true)
        }
    }
    )

    useEffect(()=>{
        if (window.innerWidth > 744) {
            setMediumWindow(false)
        }else{
            setMediumWindow(true)
        }
    
    }, [])

  return (
    <div className={` bg-[#0a1930] py-4 text-white h-[80px] md:flex flex-col justify-between items-center text-[14px] ${showHeader && 'sticky top-0 z-[5000]'} w-full`}>
        <div className='w-full md:px-4 lg:container'>
            <div className='flex justify-between items-center'>
                <div className=' cursor-pointer flex justify-between items-center' >
                    <h2 className=' text-3xl font-medium tracking-wide' onClick={()=>Navigate('/')}>Shop<span className=' text-[#ff4500]'>Ito</span>.</h2>
                </div>

                <div className={`${mediumWindow ? 'hidden' : 'flex'}`}>
                    <h5 className={` text-white tracking-wider font-medium cursor-pointer hover:text-[#ff4500] pr-2`} onClick={()=>{handleClick('button1'); Navigate('/shop')}}>Shop</h5>
                    {(isAdmin && isAuth) && <h5 className={` text-white tracking-wider font-medium cursor-pointer hover:text-[#ff4500]`} onClick={()=>{handleClick('button6'); Navigate('/admin/products')}}>|<span className=' pl-2'>Admin</span></h5>}
                </div>

                <ul className='flex items-center gap-2'>
                    {isAuth  ? (
                        <>
                            <li
                                className={`${mediumWindow && 'hidden'} cursor-pointer text-[#ff4500] font-medium flex items-center`}
                            >
                                <img className=' mr-1' src={userIcon} alt="" />
                                <Link to='#'>Hi, {currentUser.Name}</Link>
                            </li>
                            <li
                                className={`${mediumWindow && 'hidden'} text-white cursor-pointer hover:text-[#ff4500]`}
                                onClick={()=>{
                                    handleClick('button2');
                                    dispatch(setAuth({ value: false }))
                                    handleLogout()
                                }}
                            >
                                <Link to='/login'>Logout</Link>
                            </li>

                            <li
                                className={`${mediumWindow && 'hidden'} text-white cursor-pointer hover:text-[#ff4500]`}
                                onClick={()=>handleClick('button5')}
                                >
                                    <Link to='/order-history'>orders</Link>
                            </li>
                            <li
                        className=' flex items-center cursor-pointer hover:text-[#ff4500] relative py-3 pr-3'
                        onClick={()=>{Navigate('/cart')}}
                    >
                        Cart
                        <img src={shoppingImage} alt="" />
                        <span className=' absolute top-0 md:right-0 left-14 text-lg font-medium text-white'>{numberOfElements}</span>
                    </li>

                        </>
                    )
                    :
                    (<>
                        <li className={` text-white cursor-pointer hover:text-[#ff4500] ${mediumWindow && 'hidden'}`} onClick={()=>handleClick('button3')}><Link to='/login'>Login</Link></li>
                        <li className={`text-white cursor-pointer hover:text-[#ff4500] ${mediumWindow && 'hidden'}`} onClick={()=>handleClick('button4')}><Link to='/Register'>Register</Link></li>
                    </>
                    )}

                    <li className="flex md:hidden justify-end items-center">
                        {/* SVG icon for menu */}
                        <svg onClick={() => setShowMenu(true)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </li>
                </ul>

            </div>

        </div>
            {showMenu && mediumWindow && 
                <HeaderMenu
                    handleClick={handleClick}
                    isAdmin={isAdmin}
                    isAuth={isAuth}
                    currentUser={currentUser}
                    handleLogout={handleLogout}
                    numberOfElements={numberOfElements}
                    setShowMenu={setShowMenu}
                />
            }
    </div>
  )
}

export default Header