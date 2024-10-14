import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('currentUser')) || {}

const currentUserSlice = createSlice({
    initialState,
    name: 'currentUser',
    reducers: {
        setCurrentUser: (state, action) => {
            const { User } = action.payload
            state = User
            localStorage.setItem('currentUser', JSON.stringify(state))
            return state
        }
    }       
})

export const selectCurrentUser = state => state.currentUser
export const { setCurrentUser } = currentUserSlice.actions
export default currentUserSlice.reducer