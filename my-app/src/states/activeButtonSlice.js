import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('activeButton')) || 'button0'

const activeButtonSlice = createSlice({
    initialState,
    name: 'activeButton',
    reducers: {
        setActiveButton: (state, action)=>{
            const { value } = action.payload
            state = value
            localStorage.setItem('activeButton', JSON.stringify(state))
            return state
        }
    }
})

export const activeButtonValue = state => state.activeButton
export const { setActiveButton } = activeButtonSlice.actions
export default activeButtonSlice.reducer