import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('activeFilterButton')) || 'button0'

const activeButtonSlice = createSlice({
    initialState,
    name: 'activeFilterButton',
    reducers: {
        setActiveButton: (state, action)=>{
            const { value } = action.payload
            state = value
            localStorage.setItem('activeFilterButton', JSON.stringify(state))
            return state
        }
    }
})

export const activeButtonValue = state => state.activeFilterButton
export const { setActiveButton } = activeButtonSlice.actions
export default activeButtonSlice.reducer