import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import shoppingImage from "../assets/shopping-cart (1).svg"
import userIcon from "../assets/user.png"
import { useDispatch } from 'react-redux';
import { setAuth } from '../states/isAuth';

const HeaderMenu = ( props ) => {

    const Navigate = useNavigate()
    const dispatch = useDispatch()

  return (
    <div className=' fixed top-0 flex z-[9000] bg- w-full h-full'>
        <div className='w-1/2 bg-[#0a1930] h-full px-3'>
                <div className=' cursor-pointer flex justify-between items-center' >
                    <h2 className=' text-3xl font-medium tracking-wide' onClick={()=>Navigate('/')}>Shop<span className=' text-[#ff4500]'>Ito</span>.</h2>
                    <div className=' md:hidden flex' onClick={()=>props.setShowMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x w-16">
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                    </div>
                </div>

                <div className=' flex flex-col gap-2 mb-2'>
                    <h5 className='text-white tracking-wider font-medium cursor-pointer hover:text-[#ff4500] border-y-[0.5px] border-solid border-gray-700 py-2' onClick={()=>{props.handleClick('button1'); Navigate('/shop')}}>Shop</h5>
                    {(props.isAdmin && props.isAuth) && <h5 className={` text-white tracking-wider font-medium cursor-pointer hover:text-[#ff4500] border-y-[0.5px] border-solid border-gray-700 py-2`} onClick={()=>{props.handleClick('button6'); Navigate('/admin/products')}}><span>Admin</span></h5>}
                </div>
                <ul className={`flex flex-col gap-2`}>
                    {props.isAuth  ? (
                        <>
                            <li
                                className={`text-white cursor-pointer hover:text-[#ff4500] border-y-[0.5px] border-solid border-gray-700 py-2`}
                                onClick={()=>{
                                    props.handleClick('button2');
                                    dispatch(setAuth({ value: false }));
                                    props.handleLogout()
                                }}
                            >
                                <Link to='/login'>Logout</Link>
                            </li>

                            <li
                                className='text-white cursor-pointer hover:text-[#ff4500] border-y-[0.5px] border-solid border-gray-700 py-2'
                                onClick={()=>props.handleClick('button5')}
                                >
                                    <Link to='/order-history'>orders</Link>
                            </li>
                            <li
                                className=' flex items-center cursor-pointer hover:text-[#ff4500] relative py-2 pr-3 border-y-[0.5px] border-solid border-gray-700'
                        onClick={()=>{props.setShowMenu(false);Navigate('/cart')}}
                    >
                        Cart
                        <img src={shoppingImage} alt="" />
                        <span className=' absolute top-0 md:right-0 left-14 text-lg font-medium text-white'>{props.numberOfElements}</span>
                    </li>

                        </>
                    )
                    :
                    (<>
                        <li className='py-2 border-y-[0.5px] border-solid border-gray-700 text-white cursor-pointer hover:text-[#ff4500]' onClick={()=>props.handleClick('button3')}><Link to='/login'>Login</Link></li>
                        <li className='py-2 border-y-[0.5px] border-solid border-gray-700 text-white cursor-pointer hover:text-[#ff4500]' onClick={()=>props.handleClick('button4')}><Link to='/Register'>Register</Link></li>
                    </>
                    )}
                </ul>

            </div>
        <div 
            className=' w-1/2 bg-black opacity-60'
            onClick={()=>props.setShowMenu(false)}
            >
        </div>
    </div>
  )
}

export default HeaderMenu