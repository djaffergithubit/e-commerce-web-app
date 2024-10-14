import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('authToken')) || ''

const tokenSlice = createSlice({
    initialState,
    name: 'authToken',
    reducers: {
        setToken: (state, action) => {
            const { value } = action.payload
            state = value
            localStorage.setItem('authToken', JSON.stringify(state))
            return state
        },

        setNull: (state)=>{
            localStorage.removeItem('authToken')
            return state
        }
    }
})

export const selectAuthToken = state => state.authToken
export const { setToken, setNull } = tokenSlice.actions
export default tokenSlice.reducer