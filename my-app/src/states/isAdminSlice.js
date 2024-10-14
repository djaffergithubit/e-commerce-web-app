import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('isAdmin')) || false

const isAdminSlice = createSlice({
    initialState,
    name: 'isAdmin',
    reducers: {
        setIsAdmin: (state, action)=>{
            const {value} = action.payload
            state = value
            localStorage.setItem('isAdmin', JSON.stringify(state))
            return state
        }
    }
})

export const selectIsAdmin = state => state.isAdmin
export const { setIsAdmin } = isAdminSlice.actions
export default isAdminSlice.reducer