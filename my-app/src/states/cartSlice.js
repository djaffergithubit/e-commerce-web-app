import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
    initialState,
    name: 'cart',
    reducers: {
        AddToCart: (state, action)=>{

            const newItem = {
                user: action.payload.userId,
                product: action.payload.newProduct,
                quantity: 1,
                total: action.payload.newProduct.productPrice,
                couponAdded: false
            }

            const currentState = [...state]
            const itemExist = currentState.find(item => item.user === newItem.user && item.product._id === newItem.product._id)

            if (itemExist) {
                    itemExist.quantity += 1
                    itemExist.total = itemExist.product.productPrice * itemExist.quantity
                    localStorage.setItem('cart', JSON.stringify(state))
                    return state
                }else{
                    const newState = [newItem, ...state]
                    localStorage.setItem('cart', JSON.stringify(newState))
                    return newState
                }
        },

        setCouponAdded: (state, action)=>{
            const {user, value} = action.payload
            const currentState = [...state]
            const currentCart = currentState.filter(cart => cart.user === user)

            currentCart.map(cart => cart.couponAdded = value)
            localStorage.setItem('cart', JSON.stringify(state))
            return state
        },

        incrementCartQuantity: (state, action)=>{
            const { productId, userId } = action.payload
            const currentState = [...state]
            const currentCart = currentState.find(cart => cart.product._id === productId && cart.user === userId)

            if (currentCart) {
                currentCart.quantity += 1
                currentCart.total = currentCart.product.productPrice * currentCart.quantity
                localStorage.setItem('cart', JSON.stringify(state))
                return state
            }else{
                console.log('Item not found')
            }
        },

        decrementCartQuantity: (state, action)=>{
            const { productId, userId } = action.payload
            const currentState = [...state]
            const currentCart = currentState.find(cart => cart.product._id === productId && cart.user === userId)

            if (currentCart) {
                currentCart.quantity -= 1
                currentCart.total = currentCart.product.productPrice * currentCart.quantity
                localStorage.setItem('cart', JSON.stringify(state))
                return state
            }else{
                console.log('Item not found')
            }
        },

        setCartTotal: (state, action) => {
            const { value, productId } = action.payload
            const currentState = [...state]
            const currentCart = currentState.find(cart => cart.product._id === productId)
            
            currentCart.total = value
            localStorage.setItem('cart', JSON.stringify(state))
            return state
        },

        
        removeCart: (state, action)=>{
            const { productId, userId } = action.payload
            const currentState = [...state]
            const itemToRemove = currentState.find(item => item.product._id === productId && item.user === userId)

            if (itemToRemove.quantity > 1) {
                itemToRemove.quantity -= 1
                itemToRemove.total = itemToRemove.product.productPrice * itemToRemove.quantity
                localStorage.setItem('cart', JSON.stringify(state))
                return state
            }else{
                const newState = currentState.filter(item => item !== itemToRemove)
                localStorage.setItem('cart', JSON.stringify(newState))
                return newState
            }

            
        },

        clearCart: (state, action)=>{
            const {id} = action.payload
            const currentState = [...state]
            const newState = currentState.filter(cart => cart.user !== id)

            localStorage.setItem('cart', JSON.stringify(newState))
            return newState
        }
    }
})

export const cartValue = state => state.cart
export const { AddToCart, incrementCartQuantity, decrementCartQuantity, setCartTotal, setCouponAdded, removeCart, clearCart } = cartSlice.actions
export default cartSlice.reducer


// explain .reduce method 
// The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.

