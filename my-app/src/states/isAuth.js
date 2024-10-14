import { createSlice } from "@reduxjs/toolkit"

const initialState = JSON.parse(localStorage.getItem('isAuth')) || false

const isAuthSlice = createSlice({
    initialState,
    name: 'isAuth',
    reducers: {
        setAuth: (state, action) => {
            const { value } = action.payload
            state = value
            localStorage.setItem('isAuth', JSON.stringify(state))
            return state
        },
        }
})

export const selectIsAuth = state => state.isAuth
export const { setAuth } = isAuthSlice.actions
export default isAuthSlice.reducer