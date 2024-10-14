import React, { useEffect, useState } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import { Navigate, useLocation, useRoutes } from "react-router-dom"
import AddProduct from './pages/Admin/AddProduct'
import AllProducts from './pages/Admin/AllProducts'
import Orders from './pages/Admin/Orders'
import AddBrand from './pages/Admin/AddBrand'
import AddCategory from './pages/Admin/AddCategory'
import Home from './pages/Home'
import SlideBar from './components/slideBar'
import { useSelector } from 'react-redux'
import { selectIsAuth } from './states/isAuth'
import AddCoupon from './pages/Admin/AddCoupon'
import { selectIsAdmin } from './states/isAdminSlice'
import Shop from './pages/Admin/Shop'
import ProductDetails from './pages/ProductDetails'
import ShoppingCart from './pages/ShoppingCart'
// import chevronRightIcon from '../src/assets/chevrons-right (1).svg'
import CheckoutDetails from './pages/Checkout-details'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import MyOrders from './pages/MyOrders'
import OrderDetails from './pages/OrderDetails'
import OrderDetailsAdmin from './pages/Admin/OrderDetailsAdmin'
import ReviewProduct from './pages/ReviewProduct'
import { allMessages } from './states/messagesSlice'
import Messages from './components/Messages'

const App = () => {

  const isAuth = useSelector(selectIsAuth)
  const isAdmin = useSelector(selectIsAdmin)
  const currentPath = useLocation().pathname
  const isUnderAdminPath = currentPath.includes('/admin')
  const [showSidebar, setShowSidebar] = useState(true)
  const [iconClicked, setIconClicked] = useState(false)
  const messages = useSelector(allMessages)

  useEffect(()=>{
    console.log('messages', messages);
  }, [messages])

  return (
    <div className=' h-full '>
      {messages.length > 0 && <div className='fixed top-2 z-[5000]'>
        {messages.map((message, index) => (
          <Messages
            key={message.id}
            messageId={message.id}
            index={index}
            message={message.message}
            type={message.type}
          />
        ))}
      </div>}
      <div className=' flex '>
        {
          (isAuth && isAdmin && isUnderAdminPath) && 
            <SlideBar
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              iconClicked={iconClicked}
              setIconClicked={setIconClicked}
            />
        }
      <div className=' w-full'>
        {(isAuth && isAdmin && isUnderAdminPath && !showSidebar && ! iconClicked) && <div className=' flex items-center px-4 pt-3 w-44 cursor-pointer' onClick={()=>setIconClicked(true)}>
          <i className="fa-solid fa-chart-bar text-[#ff4500]" ></i>
          <h1 className=' text-2xl font-medium ml-2 text-[#3b83f6]'>Slidebar</h1>
        </div>}
        {useRoutes([
          {path: '/', element: isAuth ? <Home/> : <Navigate to='/login'></Navigate>},
          {path: '/login', element: !isAuth ? <Login/> : <Navigate to='/'></Navigate>},
          {path: '/shop', element: <Shop/>},
          {path: '/cart', element: isAuth ? <ShoppingCart/> : <Navigate to='/login'></Navigate>},
          {path: '/product-details/:id', element: <ProductDetails/>},
          {path: '/checkout-details', element: <CheckoutDetails/>},
          {path: '/order-history', element: <MyOrders/>},
          {path: '/order-details/:id', element: <OrderDetails/>},
          {path: '/review-product/:productId', element: <ReviewProduct/>},
          {path: '/success', element: <Success/>},
          {path: '/Cancel', element: <Cancel/>},
          {path: '/register', element:!isAuth ? <Register/> : <Navigate to='/'></Navigate>},
          {path: '/admin/add-product', element: (isAuth && isAdmin) ? <AddProduct/> : <Navigate to='/login'></Navigate>},
          {path: '/admin/products', element: (isAuth && isAdmin) ? <AllProducts/> : <Navigate to='/login'></Navigate>},
          {path: '/admin/orders', element: (isAuth && isAdmin) ? <Orders/> : <Navigate to='/login'></Navigate>},
          {path: '/admin/order-details/:id', element: (isAuth && isAdmin) ? <OrderDetailsAdmin/> : <Navigate to='/login'></Navigate>},
          {path: '/admin/coupon', element: (isAuth && isAdmin) ? <AddCoupon/> : <Navigate to='/login'></Navigate>},
          {path: '/admin/categories', element: (isAuth && isAdmin) ? <AddCategory/> : <Navigate to='/login'></Navigate>},
          {path: '/admin/brands', element: (isAuth && isAdmin) ? <AddBrand/> : <Navigate to='/login'></Navigate>},
        ])}
      </div>
      </div>
      
    </div>
  )
}

export default App